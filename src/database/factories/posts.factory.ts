import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { capitalize } from '@material-ui/core';
import { Post } from '../../backend/posts/posts.entity';
import { fromRange } from '../../common/helpers';

define(Post, (faker: typeof Faker) => {
  const post = new Post();
  post.title = capitalize(faker.lorem.words(fromRange(2, 10)));
  post.text = faker.lorem.sentences(fromRange(5, 20));
  return post;
});
