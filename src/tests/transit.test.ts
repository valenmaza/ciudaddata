import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Transit API', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('GET /transit/routes/Caracas should return 200', async () => {
    const res = await request(app).get('/transit/routes/Caracas');
    expect(res.status).toBe(200);
  });

  test('GET /transit/eta?stop_id=TEST should return 200', async () => {
    const res = await request(app).get('/transit/eta').query({ stop_id: 'TEST' });
    expect(res.status).toBe(200);
  });

  test('POST /transit/incident should create an incident and return 201', async () => {
    const res = await request(app)
      .post('/transit/incident')
      .send({ location: 'Test', description: 'Test' })
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
  });
});