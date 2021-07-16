import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '../users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  providers: [AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
