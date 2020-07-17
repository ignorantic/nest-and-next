import { CommonPost } from '../common/interfaces';

export class PostEntity implements CommonPost {
  constructor(post: CommonPost) {
    this.id = post.id;
    this.title = post.title;
    this.text = post.text;
    this.isActive = post.isActive;
  }

  id: number;

  title: string;

  text: string;

  isActive: boolean;
}
