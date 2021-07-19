import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { Users } from '../users/users.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'find',
    });
  }

  async validate(find: string, password: string): Promise<Users | Error> {
    const user = await this.authService.validate({ find, password });
    if (!user) {
      return new UnauthorizedException();
    }
    return user;
  }
}