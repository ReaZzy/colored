import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { Users } from '../users/users.entity';
import { UserValidateDto } from '../users/dto/user-validate.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authRepository: AuthService) {}

  @Post()
  async validate(
    @Body() validateData: UserValidateDto,
  ): Promise<Users | undefined> {
    return this.authRepository.validate(validateData);
  }
}
