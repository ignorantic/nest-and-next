import * as Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { capitalize } from '@material-ui/core';
import { Post } from '../../backend/posts/posts.entity';
import { fromRange } from '../../common/helpers';
import { User } from '../../backend/users/users.entity';

define(Post, (faker: typeof Faker) => {
  const post = new Post();
  post.title = capitalize(faker.lorem.words(fromRange(2, 10)));
  post.text = faker.lorem.sentences(fromRange(5, 20));
  post.user = factory(User)() as any;
  return post;
});
