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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { Task } from './entities/task.entity';
import { UpdateTaskDto, CreateTaskDto } from './dtos';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Tasks')
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get(':id')
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
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiCreatedResponse({ type: Task, description: 'Task successfully created.' })
  create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createTaskDto);
  }

  @Patch(':id')
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
  @ApiOperation({ summary: 'Delete a task' })
  @ApiOkResponse({ description: 'Task successfully removed.' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.tasksService.delete(id);
  }
}
