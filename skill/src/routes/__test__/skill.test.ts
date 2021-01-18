import request from 'supertest';
import app from '../../app';
import SkillModel from '../../models/Skill';

describe('Create a skill', () => {
  it('returns a 201 and the created skill', async () => {
    const skill = { title: 'Microservices' };

    const response = await request(app)
      .post('/api/skills')
      .send(skill)
      .expect(201);
    expect(response.body.result).toMatchObject(skill);
    const skillInDb = await SkillModel.findOne({ title: skill.title });
    expect(skillInDb).toMatchObject(skill);
  });
  it('returns a 400 on a duplicate name', async () => {
    const name = 'test name';

    await request(app).post('/api/skills').send({
      name,
      city: 'New York',
    });
    await request(app)
      .post('/api/skills')
      .send({
        name,
        city: 'Los Angeles',
      })
      .expect(400);
  });
  it('returns a 400 if name is missing', async () => {
    await request(app)
      .post('/api/skills')
      .send({
        city: 'Los Angeles',
      })
      .expect(400);
  });
});
