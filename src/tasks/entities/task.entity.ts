import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { TaskStatus } from '../enums/task-status.enum';
import { User } from 'src/users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
