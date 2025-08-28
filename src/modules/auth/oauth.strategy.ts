import { Injectable } from '@nestjs/common';
import {PassportStrategy} from "@nestjs/passport"
import  {Strategy} from "passport-oauth2"
import {AuthService} from "./auth.service"
@Injectable()
export class OAuthStrategy extends PassportStrategy(Strategy, 'oauth'){
    constructor(private readonly authService: AuthService){
        super({
            authorizationURL: 'https://example.com/oauth/authorize',
            tokenURL: 'https://example.com/oauth/token',
            clientID: 'your-client-id',
            clientSecret: 'your-client-secret',
            callbackURL: 'https://your-callback-url.com/auth/callback',
        })
}
async validate(accessToken:string, refreshToken: string, profile:any) : Promise<any>{
    const user = await this.authService.validateOAuthUser(profile);
    return user;
} 
}
