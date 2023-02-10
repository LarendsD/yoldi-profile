import { Profile } from '../../entities/profile.entity';

export interface ProfileList {
  data: Profile[];
  pagination: {
    page: number;
    perPage: number;
    pageCount: number;
  };
}
