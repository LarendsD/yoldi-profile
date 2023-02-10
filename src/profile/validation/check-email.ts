/* eslint-disable dot-notation */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProfileService } from '../profile.service';

@ValidatorConstraint({ name: 'email', async: true })
@Injectable()
export class CheckEmail implements ValidatorConstraintInterface {
  constructor(private profileService: ProfileService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const email = validationArguments.value;
    const exists = await this.profileService.findByEmail(email);
    return !exists;
  }
}
