/* eslint-disable dot-notation */
/* eslint-disable no-useless-constructor */
import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ProfileService } from '../profile.service';

@ValidatorConstraint({ name: 'slug', async: true })
@Injectable()
export class CheckSlug implements ValidatorConstraintInterface {
  constructor(private profileService: ProfileService) {}

  async validate(text: string, validationArguments: ValidationArguments) {
    const slug = validationArguments.value;
    const exists = await this.profileService.getBySlug(slug);
    return !exists;
  }
}
