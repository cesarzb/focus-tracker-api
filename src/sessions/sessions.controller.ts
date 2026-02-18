import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Request,
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
import type { RequestWithUser } from 'src/auth/interfaces/request-with-user.interface';
import { SessionOwnerGuard } from './guards/session-owner.guard';

@ApiTags('Sessions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Get(':id')
  @UseGuards(SessionOwnerGuard)
  @ApiOperation({ summary: 'Get a session by ID' })
  @ApiOkResponse({ type: Session })
  @ApiNotFoundResponse({ description: 'No session found with this ID' })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<Session> {
    return this.sessionsService.findOne(id);
  }

  @Get()
  @ApiOperation({ summary: 'List all sessions' })
  @ApiOkResponse({ type: [Session] })
  findAll(@Req() req: RequestWithUser): Promise<Session[]> {
    const userId = req.user.userId;
    return this.sessionsService.findAll(userId);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new training session' })
  @ApiCreatedResponse({
    type: Session,
    description: 'Session created successfully',
  })
  create(
    @Request() req: RequestWithUser,
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<Session> {
    const userId = req.user.userId;

    return this.sessionsService.create(userId, createSessionDto);
  }

  @Patch(':id')
  @UseGuards(SessionOwnerGuard)
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
  @UseGuards(SessionOwnerGuard)
  @ApiOperation({ summary: 'Delete a session' })
  @ApiNoContentResponse({ description: 'Session deleted successfully' })
  @ApiNotFoundResponse({ description: 'Session not found' })
  delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.sessionsService.delete(id);
  }
}
