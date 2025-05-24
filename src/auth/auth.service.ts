import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(
    name: string,
    email: string,
    password: string
  ): Promise<{ access_token: string, user_id: number }> { 
    const user = await this.usersService.findOneByEmail(email);
    if ((user?.password !== password) || (user?.email !== email)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, name: user.name };

    const access_token = await this.jwtService.signAsync(payload);

    return {
      access_token,
      user_id: user.id,
    };
  }
}
