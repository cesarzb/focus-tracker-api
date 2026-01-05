import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TasksController } from './tasks/tasks.controller';
import { TaskService } from './tasks/task.service';

@Module({
  imports: [TasksModule],
  controllers: [AppController, TasksController],
  providers: [AppService, TaskService],
})
export class AppModule {}
