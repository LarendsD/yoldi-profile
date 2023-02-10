import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ProfileService } from '../profile/profile.service';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { Profile } from '../entities/profile.entity';

@Injectable()
export class AuthService {
  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService,
  ) {}

  async validateProfile(email: string, pass: string): Promise<Profile | null> {
    const profile = await this.profileService.findByEmail(email);
    if (profile && bcrypt.compareSync(pass, profile.password)) {
      const { password, ...result } = profile;
      return result;
    }
    return null;
  }

  async login(profile: Profile, response: Response) {
    const payload = { email: profile.email, id: profile.id };
    const access_token = this.jwtService.sign(payload);
    response.cookie('access_token', access_token);
    response.send({ access_token });
  }
}
