import { CommonPost } from '../common/interfaces';

export class PostEntity {
  constructor(post: CommonPost) {
    this.id = Number(post.id);
    this.title = String(post.title);
    this.text = String(post.text);
    this.user = post.user;
    this.isActive = Boolean(post.isActive);
  }

  id: number;

  title: string;

  text: string;

  user: object;

  isActive: boolean;
}
