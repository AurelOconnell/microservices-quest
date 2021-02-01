/* eslint-disable class-methods-use-this */
import { Resolver, Query, Subscription, Root } from 'type-graphql';
import Wilder from '../entity/Wilder';
import Vote from '../entity/Vote';

@Resolver()
export default class WilderResolver {
  @Query(() => [Wilder])
  async wilders(): Promise<Wilder[]> {
    return Wilder.find({
      relations: ['votes', 'votes.skill'],
    });
  }

  @Subscription(() => Vote, {
    topics: 'NEW_VOTE',
  })
  newVote(@Root() vote: Vote): Vote {
    return vote;
  }
}
