import { Post } from '../posts.entity';

export class PostsPaginatedResultDto {
  data: Post[];

  page: number;

  limit: number;

  totalCount: number;
}
