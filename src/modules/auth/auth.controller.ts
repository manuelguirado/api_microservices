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
import { UserService } from './user.service';
@Controller('auth')
export class AuthController {
  constructor(
    private AuthService: AuthService,
    private userService: UserService,
  ) {}
  @Get('/')
  getMain() {
    return { message: 'Welcome to the main route!' };
  }
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: { email: string; password: string }) {
    console.log('signin');
    console.log('User:', signInDto.email);
    console.log('adding user');
    const newUser = await this.AuthService.signIn(
      signInDto.email,
      signInDto.password,
    );
    console.log('New User:', newUser);
    this.userService.addUser(signInDto.email, signInDto.password);
    console.log('User' + signInDto.email + ' added successfully');
    return newUser;
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: any }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return req.user;
  }
}
