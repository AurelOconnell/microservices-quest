import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import nats, { Message } from 'node-nats-streaming';
import { buildSchema } from 'type-graphql';
import Wilder from './entity/Wilder';
import Skill from './entity/Skill';
import Vote from './entity/Vote';
import WilderResolver from './resolvers/WilderResolver';
import SkillResolver from './resolvers/SkillResolver';

const stan = nats.connect('wilder-vote', 'query', {
  url: 'http://nats-srv:4222',
});

async function start() {
  // eslint-disable-next-line no-console
  console.log('service query start');

  const connectionORM = await createConnection();
  // eslint-disable-next-line no-console
  console.log('connected to postgres');
  const wilderRepository = connectionORM.getRepository(Wilder);
  const skillRepository = connectionORM.getRepository(Skill);
  const voteRepository = connectionORM.getRepository(Vote);

  stan.on('connect', () => {
    // eslint-disable-next-line no-console
    console.log('stan connect');
    const subToWilderCreated = stan.subscribe('WILDER_CREATED');
    subToWilderCreated.on('message', async (msg: Message) => {
      // eslint-disable-next-line no-console
      console.log(`Received WILDER_CREATED message ${msg.getData()}`);

      const data = msg.getData() as string;
      const wilder = wilderRepository.create(JSON.parse(data));
      const result = await wilderRepository.save(wilder);

      // eslint-disable-next-line no-console
      console.log(`Saved a wilder in db: ${JSON.stringify(result)}`);
    });
    const subToSkillCreated = stan.subscribe('SKILL_CREATED');
    subToSkillCreated.on('message', async (msg: Message) => {
      // eslint-disable-next-line no-console
      console.log(`Received SKILL_CREATED message ${msg.getData()}`);

      const data = msg.getData() as string;
      const skill = skillRepository.create(JSON.parse(data));
      const result = await skillRepository.save(skill);

      // eslint-disable-next-line no-console
      console.log(`Saved a skill in db: ${JSON.stringify(result)}`);
    });
    const subToVoteCreated = stan.subscribe('VOTE_CREATED');
    subToVoteCreated.on('message', async (msg: Message) => {
      // eslint-disable-next-line no-console
      console.log(`Received VOTE_CREATED message ${msg.getData()}`);

      const data = msg.getData() as string;
      const vote = voteRepository.create(JSON.parse(data));
      const result = await voteRepository.save(vote);

      // eslint-disable-next-line no-console
      console.log(`Saved a vote in db: ${JSON.stringify(result)}`);
    });
  });
  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver],
  });
  const server = new ApolloServer({ schema });
  await server.listen(5003);

  // eslint-disable-next-line no-console
  console.log('Query service started on https://localhost/api/query/graphql');
}

start();
