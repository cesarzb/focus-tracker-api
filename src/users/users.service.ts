import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(`User with id ${id} not found.`);

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.usersRepository.save(user);
  }
}
