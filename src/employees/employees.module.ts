import { Module } from '@nestjs/common';
import { EmployeesController } from './employees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { ContactInfo } from './entities/contact-info.entity';
import { CqrsModule } from '@nestjs/cqrs';

@Module({
  imports: [CqrsModule, TypeOrmModule.forFeature([Employee, ContactInfo])],
  controllers: [EmployeesController],
  providers: [],
})
export class EmployeesModule { }
