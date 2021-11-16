import {
  Get,
  HttpStatus,
  Param,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { UsersService } from './users.service';
import { Users } from './users.entity';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Args, Context, Query, Resolver } from '@nestjs/graphql';
import path = require('path');
import { GqgAuthGuard } from 'src/guards/gql-auth.guard';

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

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/profileimages',
        filename: (req, file, cb) => {
          const filename =
            path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
          const extension = path.parse(file.originalname).ext;
          cb(null, `${filename}${extension}`);
        },
      }),
    }),
  )
  async uploadAvatar(
    @UploadedFile() file: Express.Multer.File,
    @Req() req: Request,
  ): Promise<Observable<any>> {
    const avatar = `http://${process.env.HOST}:${process.env.PORT}/users/profile-image/${file.filename}`;
    await this.usersService.updateAvatar({ id: req.user.id, file: avatar });
    return of({
      imagePath: avatar,
    });
  }

  @Get('profile-image/:imagename')
  async findProfileImage(
    @Param('imagename') imageName: string,
    @Res() res: Response,
  ): Promise<void> {
    return res.sendFile(
      join(process.cwd(), `uploads/profileimages/${imageName}`),
    );
  }
}
