import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Validate,
} from 'class-validator';
import { CheckEmail } from '../validation/check-email';
import { CheckSlug } from '../validation/check-slug';

export class UpdateProfileDto {
  @IsOptional()
  @IsString()
  @Length(2, 30)
  username: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @Length(5, 30)
  @Validate(CheckEmail, {
    message: 'This email is already exists!',
  })
  email: string;

  @IsOptional()
  @IsString()
  @Length(8)
  password: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  @Length(3, 20)
  @Validate(CheckSlug, {
    message: 'This slug is already exists!',
  })
  slug: string;
}
