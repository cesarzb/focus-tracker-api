import { Controller, Get, Param } from '@nestjs/common';
import { TasksService } from './tasks.service';
import type { Task } from './interfaces';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Task {
    return this.tasksService.findById(Number(id));
  }
}
