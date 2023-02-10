import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Profile } from './entities/profile.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'yoldi.sqlite',
      entities: [Profile],
      migrations: [],
      synchronize: true,
    }),
    MulterModule.register({
      dest: './files',
    }),
    ProfileModule,
    AuthModule,
  ],
})
export class AppModule {}
