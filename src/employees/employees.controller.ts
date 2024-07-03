import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Controller('employees')
export class EmployeesController {
  constructor() { }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return null;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return null;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return null;
  }

}
