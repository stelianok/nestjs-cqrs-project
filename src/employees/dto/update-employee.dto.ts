import { PartialType } from '@nestjs/mapped-types';
import { CreateEmployeeDto } from '../commands/create-employee/create-employee.dto';

export class UpdateEmployeeDto extends PartialType(CreateEmployeeDto) { }
