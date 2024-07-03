import { Controller, Get, Post, Body, Patch, Param, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { QueryBus } from '@nestjs/cqrs';
import { plainToClass } from 'class-transformer';
import { GetEmployeeQuery } from './queries/get-employee/get-employee.query';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly queryBus: QueryBus) { }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return null;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const query = plainToClass(GetEmployeeQuery, { id: Number(id) });

    const employee = await this.queryBus.execute(query);

    if (!employee) throw new NotFoundException();

    return employee;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return null;
  }

}
