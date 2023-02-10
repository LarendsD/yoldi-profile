import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { Profile } from '../entities/profile.entity';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { CheckEmail } from './validation/check-email';
import { CheckSlug } from './validation/check-slug';

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfileController],
  providers: [ProfileService, CheckEmail, CheckSlug, AuthService, JwtService],
})
export class ProfileModule {}
