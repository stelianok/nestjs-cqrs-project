import { CreateEmployeeHandler } from "./create-employee/create-employee.handler";
import { UpdateEmployeeHandler } from "./update-employee/update-employee.handler";

export const CommandHandlers = [CreateEmployeeHandler, UpdateEmployeeHandler]