import { Controller, Get, Post, Body, Patch, Param, NotFoundException, HttpCode } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { GetEmployeeQuery } from './queries/get-employee/get-employee.query';
import { CreateEmployeeDto } from './commands/create-employee/create-employee.dto';
import { CreateEmployeeCommand } from './commands/create-employee/create-employee.command';
import { UpdateEmployeeDto } from './commands/update-employee/update-employee.dto';
import { UpdateEmployeeCommand } from './commands/update-employee/update-employee.command';
import { AssignManagerCommand } from './commands/assign-manager/assign-manager-command';
import { AssignManagerDto } from './commands/assign-manager/assign-manager.dto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('employees')
export class EmployeesController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,

    @InjectQueue('webhooks')
    private readonly webhooksQueue: Queue
  ) { }

  @Post()
  async create(@Body() dto: CreateEmployeeDto) {
    const command = plainToClass(CreateEmployeeCommand, dto);
    const id = await this.commandBus.execute(command);
    const query = plainToClass(GetEmployeeQuery, { id });

    return this.queryBus.execute(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = plainToClass(GetEmployeeQuery, { id: Number(id) });

    const employee = await this.queryBus.execute(query);

    if (!employee) throw new NotFoundException();

    return employee;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateEmployeeDto) {
    const command = plainToClass(UpdateEmployeeCommand, {
      ...dto,
      id: Number(id),
    });

    const affectedRows = await this.commandBus.execute(command);

    if (!affectedRows) throw new NotFoundException();

    const query = plainToClass(GetEmployeeQuery, { id });

    return this.queryBus.execute(query);
  }

  @Patch(':id/assign-manager')
  async assignManager(@Param('id') id: string, @Body() dto: AssignManagerDto) {
    const command = plainToClass(AssignManagerCommand, {
      ...dto,
      id: Number(id),
    });

    const affectedRows = await this.commandBus.execute(command);

    if (!affectedRows) throw new NotFoundException();

    const query = plainToClass(GetEmployeeQuery, { id });

    return this.queryBus.execute(query);
  }

  @Post('webhooks/payment')
  @HttpCode(204)
  async processPaymentWebhook(@Body() dto: any) {
    await this.webhooksQueue.add('process-payment', dto);
  }

}
