import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './interfaces';
import { CreateTaskDto } from './dtos/create-task.dto';
import { v4 as uuidv4 } from 'uuid';

const tasks: Task[] = [
  {
    id: '1',
    title: 'Grocery Shopping',
    optionalDescription: "Buy ingredients for the week's meals.",
    status: 'TODO',
  },
  {
    id: '2',
    title: 'Complete Project Report',
    optionalDescription: 'Finish the report for the client by Friday.',
    status: 'IN_PROGRESS',
  },
  {
    id: '3',
    title: 'Exercise',
    optionalDescription: 'Go for a 30-minute run in the park.',
    status: 'DONE',
  },
  {
    id: '4',
    title: 'Read Book',
    optionalDescription: "Finish reading 'The Great Gatsby'.",
    status: 'TODO',
  },
  {
    id: '5',
    title: 'Clean the House',
    optionalDescription: 'Tidy up living room and kitchen.',
    status: 'IN_PROGRESS',
  },
];

@Injectable()
export class TasksService {
  findById(id: string): Task {
    const task = tasks.find((task) => task.id === id);

    if (!task) {
      throw new NotFoundException(`Task with ${id} not found.`);
    }
    return task;
  }

  findAll(): Task[] {
    return tasks;
  }

  create(createTaskDto: CreateTaskDto): Task {
    const task: Task = {
      id: uuidv4(),
      title: createTaskDto.title,
      optionalDescription: createTaskDto.description || '',
      status: 'TODO',
    };

    tasks.push(task);

    return task;
  }
}
