import {
  createParamDecorator,
  Delete,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { Users } from '../users/users.entity';
import { UsersDataDto } from '../users/dto/users-data.dto';
import { UsersService } from '../users/users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import {
  Args,
  Context,
  Field,
  GqlExecutionContext,
  InputType,
  Mutation,
  ObjectType,
  Resolver,
} from '@nestjs/graphql';
export { Request, Response } from 'express';

@ObjectType()
class Login {
  @Field(() => String)
  access_token: string;
  @Field(() => Users)
  user: Users;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Mutation(() => Login)
  async login(
    @Args('find') find: string,
    @Args('password') password: string,
    @CurrentUser() user: Users,
    @Context() ctx: any,
  ) {
    const token = await this.authService.login(user);
    if (!token) {
      return new UnauthorizedException();
    }
    ctx.res.cookie('auth', token.access_token, {
      httpOnly: false,
      maxAge: 86_400_000,
    });
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/logout')
  async logout(@Res() res: Response) {
    res.clearCookie('auth');
    return res.status(HttpStatus.OK).send();
  }

  @Mutation(() => Login)
  async register(
    @Args('userData') usersData: UsersDataDto,
    @Context() ctx: any,
  ): Promise<Login> {
    try {
      const user = await this.usersService.create(usersData);
      const { access_token } = await this.authService.login(
        await this.usersService.create(user),
      );
      ctx.res.cookie('auth', access_token, {
        httpOnly: false,
        maxAge: 86_400_000,
      });
      return { user, access_token };
    } catch (e) {
      throw new HttpException(
        'User already exists',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
