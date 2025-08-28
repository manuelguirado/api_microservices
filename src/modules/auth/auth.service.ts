import { Injectable, UnauthorizedException } from '@nestjs/common';

interface UserProfile {
  id: string;
  email: string;
}

interface User {
  id: string;
  email: string;
}

@Injectable() 
export class AuthService {
    async validateOAuthUser(profile: UserProfile): Promise<User> { 
        // Implement your user validation logic here
        return { id: profile.id, email: profile.email };
  }
}
