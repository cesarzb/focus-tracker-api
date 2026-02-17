import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiNoContentResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { SessionsService } from './sessions.service';
import { Session } from './entities/session.entity';
import { UpdateSessionDto } from './dtos/update-session.dto';
import { CreateSessionDto } from './dtos/create-session.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Sessions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get a session by ID' })
  @ApiOkResponse({ type: Session })
  @ApiNotFoundResponse({ description: 'No session found with this ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return this.sessionsService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all sessions' })
  @ApiOkResponse({ type: [Session] }) // Essential: Note the array brackets
  findAll(): Promise<Session[]> {
    return this.sessionsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Create a new training session' })
  @ApiCreatedResponse({
    type: Session,
    description: 'Session created successfully',
  })
  create(@Body() createSessionDto: CreateSessionDto): Promise<Session> {
    return this.sessionsService.create(createSessionDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update session details' })
  @ApiOkResponse({ type: Session })
  @ApiNotFoundResponse({ description: 'Session not found' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a session' })
  @ApiNoContentResponse({ description: 'Session deleted successfully' })
  @ApiNotFoundResponse({ description: 'Session not found' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sessionsService.delete(id);
  }
}
