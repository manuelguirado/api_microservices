import { Injectable, UnauthorizedException } from '@nestjs/common';

interface UserProfile {
  id: string;
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private userProfile: UserProfile) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.userProfile.findOne({ email });
    if (user?.password !== pass) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const { password, ...userData } = user;
    return userData;
  }
}
