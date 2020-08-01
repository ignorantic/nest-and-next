import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../../backend/users/users.entity';
import { fromRange } from '../../common/helpers';

export default class CreatePosts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.getRepository(User).clear();
    await factory(User)().createMany(fromRange(20, 30));
  }
}
