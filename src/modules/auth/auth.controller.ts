import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() body: { email: string; password: string }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return await this.AuthService.signIn(body.email, body.password);
  }
}
