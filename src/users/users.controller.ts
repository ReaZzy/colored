import {
  Body,
  Controller,
  Get,
  HttpStatus,
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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { Observable, of } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { v4 as uuidv4 } from 'uuid';
import { diskStorage } from 'multer';
import path = require('path');

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAll(): Promise<Users[]> {
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

  @Post('/upload')
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
    await this.usersService.updateAvatar({ id: req.user.id, file });
    return of({ imagePath: file.path });
  }
}
