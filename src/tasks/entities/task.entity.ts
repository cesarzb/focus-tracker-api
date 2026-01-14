import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  goal: string;

  @Column()
  must: string;

  @Column()
  nice: string;

  @Column({ default: 'TODO' })
  status: TaskStatus;
}
