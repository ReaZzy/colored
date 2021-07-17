import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { UserFindDto } from './dto/user-find.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Users[]> {
    return this.usersService.getAll();
  }

  @Post('/user')
  async getUser(
    @Body() loginOrEmail: UserFindDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.usersService.getUser(loginOrEmail.find);
    if (user) return res.status(HttpStatus.OK).send(user);
    return res.status(HttpStatus.NOT_FOUND).send({
      message: 'User with such email or login doesn`t exists',
    });
  }
}
