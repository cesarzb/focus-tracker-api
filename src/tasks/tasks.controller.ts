import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { UpdateTaskDto, CreateTaskDto } from './dtos';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { TaskOwnerGuard } from './guards/task-owner.guard';

@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
  @UseGuards(TaskOwnerGuard)
  @ApiOperation({ summary: 'Get a specific task by ID' })
  @ApiOkResponse({ type: Task, description: 'The task has been found.' })
  @ApiNotFoundResponse({
    description: 'Task with the given ID does not exist.',
  })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'Retrieve all tasks' })
  @ApiOkResponse({ type: [Task], description: 'List of all tasks.' })
  findAll(@Req() req: RequestWithUser): Promise<Task[]> {
    const userId = req.user.userId;
    return this.tasksService.findAll(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({ type: Task, description: 'Task successfully created.' })
  create(
    @Req() req: RequestWithUser,
    @Body() createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const userId = req.user.userId;

    return this.tasksService.create(userId, createTaskDto);
  }

  @Patch(':id')
  @UseGuards(TaskOwnerGuard)
  @ApiOperation({ summary: 'Update an existing task' })
  @ApiOkResponse({ type: Task, description: 'Task updated.' })
  @ApiNotFoundResponse({ description: 'Task not found.' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ): Promise<Task> {
    return this.tasksService.update(id, updateTaskDto);
  }

  @Delete(':id')
  @UseGuards(TaskOwnerGuard)
  @ApiOperation({ summary: 'Delete a task' })
  @ApiOkResponse({ description: 'Task successfully removed.' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
