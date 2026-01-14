import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateTaskDto, CreateTaskDto } from './dtos';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOneBy({ id });

    if (!task) throw new NotFoundException(`Task with ${id} not found.`);
    return task;
  }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return await this.tasksRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.preload({
      id: id,
      ...updateTaskDto,
    });

    if (!task) {
      throw new NotFoundException(`Task ${id} not found.`);
    }

    return this.tasksRepository.save(task);
  }

  async delete(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Task with ${id} not found.`);
  }
}
