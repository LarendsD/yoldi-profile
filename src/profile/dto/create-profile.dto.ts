import { IsEmail, IsString, Length, Validate } from 'class-validator';
import { CheckEmail } from '../validation/check-email';

export class CreateProfileDto {
  @IsString()
  @Length(2, 30)
  username: string;

  @IsString()
  @IsEmail()
  @Length(5, 30)
  @Validate(CheckEmail, {
    message: 'This email is already exists!',
  })
  email: string;

  @IsString()
  @Length(8)
  password: string;
}
