import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from './users.entity';
import { Repository } from 'typeorm';
import { UsersDataDto } from './dto/users-data.dto';
import { UserAvatarDto } from './dto/user-avatar.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
  ) {}

  async getAll(): Promise<Users[]> {
    return this.usersRepository.find({
      join: {
        alias: 'user',
        leftJoinAndSelect: {
          posts: 'user.posts',
          post_user: 'posts.user',
        },
      },
    });
  }

  async getUser(loginOrEamil: string): Promise<Users | undefined> {
    return this.usersRepository.findOne({
      where: [{ email: loginOrEamil }, { login: loginOrEamil }],
      select: ['id', 'email', 'login', 'password', 'avatar'],
    });
  }

  async create(usersData: UsersDataDto): Promise<Users> {
    const user = await this.usersRepository.create(usersData);
    return this.usersRepository.save(user);
  }

  async updateAvatar(usersData: UserAvatarDto): Promise<Users> {
    const user = await this.usersRepository.findOne(usersData.id);

    return await this.usersRepository.save({
      ...user,
      id: usersData.id,
      avatar: usersData.file,
    } as any);
  }
}
