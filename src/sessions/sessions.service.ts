import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { CreateSessionDto } from './dtos/create-session.dto';
import { UpdateSessionDto } from './dtos/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
  ) {}

  async findOne(id: number): Promise<Session> {
    const session = await this.sessionsRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!session) throw new NotFoundException(`Session with ${id} not found.`);

    return session;
  }

  async findAll(): Promise<Session[]> {
    return await this.sessionsRepository.find();
  }

  async create(
    userId: number,
    createSessionDto: CreateSessionDto,
  ): Promise<Session> {
    const session = this.sessionsRepository.create({
      ...createSessionDto,
      startTime: new Date(),
      endTime: new Date(),
      user: { id: userId },
    });

    return this.sessionsRepository.save(session);
  }

  async update(
    id: number,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    const session = await this.sessionsRepository.preload({
      id: id,
      ...updateSessionDto,
    });

    if (!session) {
      throw new NotFoundException(`Session ${id} not found.`);
    }

    return this.sessionsRepository.save(session);
  }

  async delete(id: number): Promise<void> {
    const result = await this.sessionsRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Session with ${id} not found.`);
  }
}
