import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Users } from '../users/users.entity';
import { UsersDataDto } from '../users/dto/users-data.dto';
import { UsersService } from '../users/users.service';
export { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request, @Res() res: Response) {
    const token = await this.authService.login(req.user as Users);
    res.cookie('auth', token.access_token, { httpOnly: true });
    return res.status(HttpStatus.OK).send(token);
  }

  @Post('/register')
  async create(@Body() usersData: UsersDataDto): Promise<Users> {
    return this.usersService.create(usersData);
  }
}
