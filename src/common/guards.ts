import { CommonPost } from './interfaces';

export function isCommonPostList(posts: unknown): posts is CommonPost[] {
  if (Array.isArray(posts)) {
    return posts.every((post) => typeof (post as CommonPost).id === 'number');
  }
  return false;
}

export function isID(id: unknown): id is number {
  return id && Number(id) > 0;
}

export function isPage(page: unknown): page is number {
  return page && Number(page) > 0;
}

export function isCommonPost(post: unknown): post is CommonPost {
  if (typeof post === 'object') {
    return typeof (post as CommonPost).id === 'number';
  }
  return false;
}
