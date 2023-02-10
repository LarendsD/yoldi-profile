import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ProfileModule } from '../profile/profile.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ProfileService } from 'src/profile/profile.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from '../entities/profile.entity';

@Module({
  imports: [
    ProfileModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forFeature([Profile]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, ProfileService],
  exports: [AuthService],
})
export class AuthModule {}
