import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guards';

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @Get('/')
  getMain() {
    return { message: 'Welcome to the main route!' };
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: { email: string; password: string }) {
    console.log('signin');
    console.log('User:', signInDto.email);
    return this.AuthService.signIn(signInDto.email, signInDto.password);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: any }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return req.user;
  }
}
