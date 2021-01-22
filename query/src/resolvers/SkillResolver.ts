import { Resolver, Query } from 'type-graphql';
import Skill from '../entity/Skill';

@Resolver()
export default class SkillResolver {
  @Query(() => [Skill])
  // eslint-disable-next-line class-methods-use-this
  async skills(): Promise<Skill[]> {
    return Skill.find();
  }
}
