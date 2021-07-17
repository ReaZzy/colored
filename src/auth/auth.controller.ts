import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Users } from '../users/users.entity';
import { UsersDataDto } from '../users/dto/users-data.dto';
import { UsersService } from '../users/users.service';
export { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Req() req: Request) {
    return this.authService.login(req.user as Users);
  }

  @Post('/register')
  async create(@Body() usersData: UsersDataDto): Promise<Users> {
    return this.usersService.create(usersData);
  }
}
