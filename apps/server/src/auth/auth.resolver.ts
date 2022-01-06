import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Users } from '../users/users.entity';
import { UsersDataDto } from '../users/dto/users-data.dto';
import { UsersService } from '../users/users.service';
import {
  Args,
  Context,
  GqlExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { LoginDto } from './dto/login.dto';
import { GqgAuthGuard } from 'src/guards/gql-auth.guard';

export { Request, Response } from 'express';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  }
);

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => LoginDto)
  async login(
    @Context('pubSub') pubSub,
    @Args('find') find: string,
    @Args('password') password: string,
    @CurrentUser() user: Users,
    @Context('req') ctx: any
  ) {
    const token = await this.authService.login(user);
    await this.usersService.setOnline(pubSub, user, true);

    if (!token) {
      throw new BadRequestException();
    }
    ctx.res.cookie('auth', token.access_token, {
      httpOnly: true,
      maxAge: 86_400_000,
    });

    return token;
  }

  @UseGuards(GqgAuthGuard)
  @Mutation(() => Boolean)
  async logout(
    @Context('pubSub') pubSub,
    @Context('req') ctx: any,
    @CurrentUser() user: Users
  ) {
    ctx.res.clearCookie('auth');
    await this.usersService.setOnline(pubSub, user, false);
    return true;
  }

  @Mutation(() => LoginDto)
  async register(
    @Context('pubSub') pubSub,
    @Args('userData') usersData: UsersDataDto,
    @Context('req') ctx: any
  ): Promise<LoginDto> {
    try {
      const user = await this.usersService.create(usersData);
      const { access_token } = await this.authService.login(user);
      await this.usersService.setOnline(pubSub, user, true);
      ctx.res.cookie('auth', access_token, {
        httpOnly: true,
        maxAge: 86_400_000,
      });
      return { user, access_token };
    } catch (e) {
      throw new HttpException(
        'User already exists',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
