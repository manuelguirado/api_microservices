import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { comparePasswords } from './utils/hashpassword';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validatePassword = await comparePasswords(pass, user.password);
    if (!validatePassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Using destructuring to remove password from returned object

    const payload = { sub: user.userId, username: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
