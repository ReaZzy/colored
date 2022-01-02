import { UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { Users } from '../users/users.entity';
import { GqgAuthGuard } from 'src/guards/gql-auth.guard';
import { CurrentUser } from '../auth/auth.resolver';

@UseGuards(GqgAuthGuard)
@Resolver()
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => Users)
  async getProfile(
    @Args({ name: 'id', type: () => ID, nullable: true }) id: string,
    @CurrentUser() user: Users
  ): Promise<Users> {
    return this.profileService.getProfile({ user, id });
  }
}
