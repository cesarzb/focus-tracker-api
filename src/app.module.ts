import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsModule } from './sessions/sessions.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TasksModule,
    SessionsModule,
    UsersModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');

        return {
          type: 'postgres',
          url: databaseUrl,
          host: !databaseUrl ? config.get<string>('DB_HOST') : undefined,
          port: !databaseUrl ? config.get<number>('DB_PORT') : undefined,
          username: !databaseUrl
            ? config.get<string>('DB_USERNAME')
            : undefined,
          password: !databaseUrl
            ? config.get<string>('DB_PASSWORD')
            : undefined,
          database: !databaseUrl ? config.get<string>('DB_NAME') : undefined,
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: config.get('NODE_ENV') !== 'production',

          ssl: databaseUrl ? { rejectUnauthorized: false } : false,
        };
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
