import { Employee } from "src/employees/entities/employee.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  zoomUrl: string;

  @ManyToMany(() => Employee)
  @JoinTable()
  attendees: Employee[];
}