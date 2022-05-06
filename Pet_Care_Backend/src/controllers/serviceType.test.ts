import request from 'supertest';
import app from '../../app';

describe('serviceType tests', () => {
  test('serviceType is gotten successfully', async () => {
    const response = await request(app).get('/serviceTypes/' + 0);
    expect(response.statusCode).toBe(200);
  });

  test('serviceTypes are gotten successfully', async () => {
    const response = await request(app).get('/serviceTypes');
    expect(response.statusCode).toBe(200);
  });
});
