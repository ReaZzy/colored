import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ProfileService } from './profile.service';

@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  async getMyProfile(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.profileService.getProfile({ user: req.user }));
  }

  @Get(':id')
  async getProfile(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    return res
      .status(HttpStatus.OK)
      .send(await this.profileService.getProfile({ user: req.user, id }));
  }
}
