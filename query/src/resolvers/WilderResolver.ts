import { Resolver, Query } from 'type-graphql';
import Wilder from '../entity/Wilder';

@Resolver()
export default class WilderResolver {
  @Query(() => [Wilder])
  // eslint-disable-next-line class-methods-use-this
  async wilders(): Promise<Wilder[]> {
    return Wilder.find({
      relations: ['votes', 'votes.skill'],
    });
  }
}
