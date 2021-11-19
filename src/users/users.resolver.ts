import { HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { v4 as uuidv4 } from 'uuid';
import { join } from 'path';
import {
  Args,
  Context,
  Mutation,
  Query,
  Resolver,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import path = require('path');
import { GqgAuthGuard } from 'src/guards/gql-auth.guard';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { createWriteStream } from 'fs';

@ObjectType()
class Avatar {
  @Field()
  avatar: string;
}

@UseGuards(GqgAuthGuard)
@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Users])
  async getAll(): Promise<Users[]> {
    return this.usersService.getAll();
  }

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

  @Mutation(() => Avatar)
  async uploadAvatar(
    @Context() ctx: any,
    @Args({ name: 'file', type: () => GraphQLUpload })
    { createReadStream, filename }: FileUpload,
  ) {
    const fileExt = path.parse(filename).ext;
    const imagePath = `${uuidv4()}${fileExt}`;

    await new Promise(async (resolve, reject) =>
      createReadStream()
        .pipe(createWriteStream(`./uploads/profileimages/${imagePath}`))
        .on('finish', () => resolve(true))
        .on('error', () => reject(false)),
    );
    const avatar = `http://${process.env.HOST}:${process.env.PORT}/users/profile-image/${imagePath}`;
    await this.usersService.updateAvatar({
      id: ctx.req.user.id,
      file: avatar,
    });
    return { avatar };
  }

  @Query(() => GraphQLUpload)
  async getProfileImage(
    @Args('imagename') imageName: string,
    @Context() ctx: any,
  ): Promise<void> {
    return ctx.res.sendFile(
      join(process.cwd(), `uploads/profileimages/${imageName}`),
    );
  }
}
