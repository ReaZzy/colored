import {
  Body,
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
import { UserFindDto } from './dto/user-find.dto';
import {} from '../guards/jwt-auth.guard';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import { join } from 'path';
import { Query, Resolver } from '@nestjs/graphql';
import path = require('path');

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [Users])
  async getAll(): Promise<Users[]> {
    console.log(
      await (await this.usersService.getAll()).map((user) => user.posts),
    );
    return this.usersService.getAll();
  }

  @Post('/user')
  async getUser(
    @Body() loginOrEmail: UserFindDto,
    @Res() res: Response,
  ): Promise<Response> {
    const user = await this.usersService.getUser(loginOrEmail.find);
    if (user) return res.status(HttpStatus.OK).send(user);
    return res.status(HttpStatus.NOT_FOUND).send({
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
