import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@Injectable()
export class TaskOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const taskId = Number(request.params.id);
    const userId = request.user.userId;

    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
    });

    return !!task;
  }
}
