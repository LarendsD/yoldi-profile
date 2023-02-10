import { IsDefined, IsNumberString } from 'class-validator';

export class PaginationQueryDto {
  @IsDefined()
  @IsNumberString()
  page: number;

  @IsDefined()
  @IsNumberString()
  perPage: number;
}
