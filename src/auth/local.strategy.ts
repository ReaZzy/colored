import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Users } from '../users/users.entity';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
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
