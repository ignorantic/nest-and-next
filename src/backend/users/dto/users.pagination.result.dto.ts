import { User } from '../users.entity';

export class UsersPaginatedResultDto {
  data: User[];

  page: number;

  limit: number;

  totalCount: number;
}
