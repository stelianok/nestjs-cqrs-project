import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectDataSource } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { ContactInfo } from "src/employees/entities/contact-info.entity";
import { Employee } from "src/employees/entities/employee.entity";
import { CreateEmployeeCommand } from "./create-employee.command";
import { EntityEventsDispatcher } from "src/common/events/entity-events-dispatcher";

@CommandHandler(CreateEmployeeCommand)
export class CreateEmployeeHandler implements ICommandHandler<CreateEmployeeCommand, number> {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
    private readonly eventDispatcher: EntityEventsDispatcher
  ) {

  }

  async execute(command: CreateEmployeeCommand): Promise<number> {
    return await this.dataSource.transaction(async (db) => {
      const contactInfo = db.create(ContactInfo, command.contactInfo ?? {})

      const employee = db.create(Employee, {
        ...command,
        contactInfo: contactInfo,
      });

      await db.save(employee);

      await this.eventDispatcher.dispatch(employee);

      return employee.id;
    })
  }
}