import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  // @Post()
  // create(@Body() createUserDto: CreateUserDto): void {
  // console.log(createUserDto);
  // }
}
