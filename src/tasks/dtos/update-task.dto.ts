import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';
import { CreateTaskDto } from '.';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsEnum(TaskStatus)
  @IsOptional()
  status?: TaskStatus;
}
