import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { Post } from '../../backend/posts/posts.entity';
import { fromRange } from '../../common/helpers';

export default class CreatePosts implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.getRepository(Post).clear();
    await factory(Post)().createMany(fromRange(20, 100));
  }
}
