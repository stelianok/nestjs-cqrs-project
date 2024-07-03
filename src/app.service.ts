import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Task } from './entities/task.entity';
import { Meeting } from './entities/meeting.entity';
import { Employee } from './employees/entities/employee.entity';
import { ContactInfo } from './employees/entities/contact-info.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectDataSource()
    private readonly dataSource: DataSource,
  ) { }

  async seed() {
    await this.dataSource.transaction(async (db) => {
      const contactInfo = db.create(ContactInfo, {
        email: 'ceo@acme.com',
      })

      await db.save(contactInfo);

      const ceo = db.create(Employee, {
        name: 'Mr. CEO',
        contactInfo: contactInfo,
      });

      await db.save(ceo);

      const manager = db.create(Employee, {
        name: 'Manager',
        manager: ceo,
        contactInfo: db.create(ContactInfo, {})
      });

      await db.save(manager);

      const task1 = db.create(Task, {
        name: 'Hire people',
        assignee: manager
      });

      const task2 = db.create(Task, {
        name: 'Present to CEO',
        assignee: manager,
      })

      await db.save([task1, task2]);

      const meeting = db.create(Meeting, {
        attendees: [ceo, manager],
        zoomUrl: 'https://zoom.us/123',
      });

      meeting.attendees = [ceo, manager];

      await db.save(meeting);
    });
  }
}
