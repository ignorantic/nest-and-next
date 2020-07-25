import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { capitalize } from '@material-ui/core';
import { Post } from '../../backend/posts/posts.entity';

define(Post, (faker: typeof Faker) => {
  const post = new Post();
  post.title = capitalize(faker.lorem.words(Math.round(Math.random() * 10) + 2));
  post.text = faker.lorem.sentences(Math.round(Math.random() * 50) + 5);
  return post;
});
