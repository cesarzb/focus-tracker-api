import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos';

@Controller('users')
export class UsersController {
  @Post()
  create(@Body() createUserDto: CreateUserDto): void {
    console.log(createUserDto);
  }
}
