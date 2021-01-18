import request from 'supertest';
import app from '../../app';
import WilderModel from '../../models/Wilder';

describe('Create a wilder', () => {
  it('returns a 201 and the created wilder', async () => {
    const wilder = { name: 'test name', city: 'New York' };

    const response = await request(app)
      .post('/api/wilders')
      .send(wilder)
      .expect(201);
    expect(response.body.result).toMatchObject(wilder);
    const wilderInDb = await WilderModel.findOne({ name: wilder.name });
    expect(wilderInDb).toMatchObject(wilder);
  });
  it('returns a 400 on a duplicate name', async () => {
    const name = 'test name';

    await request(app).post('/api/wilders').send({
      name,
      city: 'New York',
    });
    await request(app)
      .post('/api/wilders')
      .send({
        name,
        city: 'Los Angeles',
      })
      .expect(400);
  });
  it('returns a 400 if name is missing', async () => {
    await request(app)
      .post('/api/wilders')
      .send({
        city: 'Los Angeles',
      })
      .expect(400);
  });
});
