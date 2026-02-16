import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from '../entities/session.entity';
import { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';

@Injectable()
export class SessionOwnerGuard implements CanActivate {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<RequestWithUser>();

    const sessionId = Number(request.params.id);
    const userId = request.user.userId;

    const session = await this.sessionsRepository.findOne({
      where: { id: sessionId, user: { id: userId } },
    });

    return !!session;
  }
}
