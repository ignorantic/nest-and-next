import { CommonPost, CommonUser } from './interfaces';

export function isCommonPost(post: unknown): post is CommonPost {
  if (typeof post === 'object') {
    return typeof (post as CommonPost).id === 'number'
      && typeof (post as CommonPost).title === 'string';
  }
  return false;
}

export function isCommonUser(user: unknown): user is CommonUser {
  if (typeof user === 'object') {
    return typeof (user as CommonUser).id === 'number'
      && typeof (user as CommonUser).firstName === 'string'
      && typeof (user as CommonUser).lastName === 'string';
  }
  return false;
}

export function isCommonPostList(posts: unknown): posts is CommonPost[] {
  if (Array.isArray(posts)) {
    return posts.every(isCommonPost);
  }
  return false;
}

export function isCommonUserList(posts: unknown): posts is CommonUser[] {
  if (Array.isArray(posts)) {
    return posts.every(isCommonUser);
  }
  return false;
}

export function isID(id: unknown): id is number {
  return id && Number(id) > 0;
}

export function isPage(page: unknown): page is number {
  return page && Number(page) > 0;
}
