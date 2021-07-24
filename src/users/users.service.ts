import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UsersDataDto } from './dto/users-data.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async getUser(loginOrEamil: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({
      where: [{ email: loginOrEamil }, { login: loginOrEamil }],
      select: ['id', 'email', 'login', 'password'],
    });
  }

  async create(usersData: UsersDataDto): Promise<Users> {
    const user = await this.usersRepository.create(usersData);
    return this.usersRepository.save(user);
  }
}
