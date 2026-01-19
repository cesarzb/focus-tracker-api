import { IsString, IsDate, IsNotEmpty } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDate()
  startTime: Date;

  @IsDate()
  endTime: Date;
}
