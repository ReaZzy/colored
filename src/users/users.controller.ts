import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { UsersDataDto } from './dto/users-data.dto';
import { UserFindDto } from './dto/user-find.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Users[]> {
    return this.usersService.getAll();
  }

  @Post()
  async create(@Body() usersData: UsersDataDto): Promise<Users> {
    return this.usersService.create(usersData);
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
