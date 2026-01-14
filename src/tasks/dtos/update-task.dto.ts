import { IsEnum, IsOptional } from 'class-validator';
import { TaskStatus } from '../enums/task-status.enum';

export class UpdateTaskDto {
  @IsOptional()
  goal: string;

  @IsOptional()
  must: string;

  @IsOptional()
  nice: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
