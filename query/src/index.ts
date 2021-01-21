import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import nats, { Message } from 'node-nats-streaming';
import { buildSchema } from 'type-graphql';
import Wilder from './entity/Wilder';
import Skill from './entity/Skill';
import Vote from './entity/Vote';
import WilderResolver from './resolvers/WilderResolver';

const stan = nats.connect('test-cluster', 'query');

async function start() {
  const connectionORM = await createConnection();
  const wilderRepository = connectionORM.getRepository(Wilder);
  const skillRepository = connectionORM.getRepository(Skill);
  const voteRepository = connectionORM.getRepository(Vote);

  stan.on('connect', () => {
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
  const schema = await buildSchema({ resolvers: [WilderResolver] });
  const server = new ApolloServer({ schema });
  await server.listen(5003);

  // eslint-disable-next-line no-console
  console.log('Query service started on http://localhost:5003/graphql !');
}

start();
