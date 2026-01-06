import request from 'supertest';
import app from '../app';
import mongoose from 'mongoose';

describe('Geo API', () => {
  afterAll(async () => {
    await mongoose.disconnect();
  });

  test('GET /geo/city/Caracas should return 200', async () => {
    const res = await request(app).get('/geo/city/Caracas');
    expect(res.status).toBe(200);
  });

  test('GET /geo/population/VE should return 200', async () => {
    const res = await request(app).get('/geo/population/VE');
    expect(res.status).toBe(200);
  });

  test('POST /geo/report should create a report and return 201', async () => {
    const res = await request(app)
      .post('/geo/report')
      .send({ location: 'Test', description: 'Test' })
      .set('Accept', 'application/json');
    expect(res.status).toBe(201);
  });
});