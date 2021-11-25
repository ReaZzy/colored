import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import path = require('path');
import fs = require('fs');
import { GqgAuthGuard } from 'src/guards/gql-auth.guard';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';
import { Response } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CurrentUser } from '../auth/auth.resolver';
import { Avatar } from './dto/user-avatar.dto';

@Controller('users')
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(GqgAuthGuard)
  @Query(() => [Users])
  async getAll(): Promise<Users[]> {
    return this.usersService.getAll();
  }

  @UseGuards(GqgAuthGuard)
  @Query(() => Users, { nullable: true })
  async getUser(
    @Args('find') find: string,
    @Context() ctx: any,
  ): Promise<Users> {
    const user = await this.usersService.getUser(find);
    if (user) return user;
    return ctx.res.status(HttpStatus.NOT_FOUND).send({
      message: 'User with such email or login doesn`t exists',
    });
  }

  @UseGuards(GqgAuthGuard)
  @Mutation(() => Avatar)
  async uploadAvatar(
    @CurrentUser() user: Users,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ) {
    const prevAvatar = await this.usersService.getUser(user.login);
    const fileExt = path.parse(filename).ext;
    const imagePath = `${uuidv4()}${fileExt}`;

    await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/profileimages/${imagePath}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
    const avatar = `users/profile-image/${imagePath}`;
    await this.usersService.updateAvatar({
      id: user.id,
      file: avatar,
    });
    try {
      if (!prevAvatar.avatar.includes('profile-default'))
        fs.unlinkSync(
          `./uploads/profileimages/${prevAvatar.avatar.split('/')[2]}`,
        );
    } catch (e) {
      console.log(e);
    }

    return { avatar };
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile-image/:imageName')
  async getImage(
    @Param('imageName') imageName: string,
    @Res() res: Response,
  ): Promise<void> {
    return res.sendFile(
      join(process.cwd(), `uploads/profileimages/${imageName}`),
    );
  }
}
