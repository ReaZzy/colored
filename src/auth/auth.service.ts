import { Injectable } from '@nestjs/common';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { compare } from 'bcryptjs';
import { UserValidateDto } from '../users/dto/user-validate.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validate({
    find,
    password,
  }: UserValidateDto): Promise<Users | undefined> {
    const user = await this.usersService.getUser(find);
    if (user && (await compare(password, user.password))) {
      const { password, ...userData } = user;
      return userData as Users;
    }
  }

  async login(user: Users): Promise<{ access_token: string }> {
    const candidate = await this.usersService.getUser(user.email);
    const payload = { id: candidate.id, login: candidate.login };
    if (!candidate) return null;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}