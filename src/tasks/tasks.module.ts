import { Module } from '@nestjs/common';
import { TasksService } from './task.service';
import { TasksController } from './tasks.controller';

@Module({})
export class TasksModule {
  controller: [TasksController],
  providers: [TasksService]

}
