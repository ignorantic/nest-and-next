import * as Faker from 'faker';
import { define } from 'typeorm-seeding';
import { User } from '../../backend/users/users.entity';

define(User, (faker: typeof Faker) => {
  const user = new User();
  user.firstName = faker.name.firstName();
  user.lastName = faker.name.lastName();
  user.email = faker.internet.email();
  return user;
});
