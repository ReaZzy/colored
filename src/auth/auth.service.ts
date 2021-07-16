import { Injectable } from '@nestjs/common';
import { Users } from '../users/users.entity';
import { UsersService } from '../users/users.service';
import { UserFindDto } from '../users/dto/user-find.dto';
import { compare } from 'bcryptjs';
import { UserValidateDto } from '../users/dto/user-validate.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async validate({
    find,
    password,
  }: UserValidateDto): Promise<Users | undefined> {
    const user = await this.usersService.getUser(find);
    if (user && (await compare(password, user.password))) {
      return user;
    }
  }
}
