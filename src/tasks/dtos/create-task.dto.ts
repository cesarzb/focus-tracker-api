import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  goal: string;

  @IsString()
  must: string;

  @IsString()
  @IsOptional()
  nice?: string;
}
