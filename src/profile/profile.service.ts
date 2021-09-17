import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Users } from '../users/users.entity';
import { Repository } from 'typeorm';
import { ProfileDto } from './dto/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Users)
    private readonly profileRepository: Repository<Users>,
  ) {}

  async getProfile(profile: ProfileDto): Promise<Users> {
    const { id, user } = profile;
    const candidate = id
      ? await this.profileRepository.findOne(id)
      : await this.profileRepository.findOne(user.id);

    return candidate;
  }
}
