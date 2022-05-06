import request from 'supertest';
import app from '../../app';

describe('petType tests', () => {
  test('petType is gotten successfully', async () => {
    const response = await request(app).get('/petTypes/' + 0);
    expect(response.statusCode).toBe(200);
  });

  test('petTypes are gotten successfully', async () => {
    const response = await request(app).get('/petTypes');
    expect(response.statusCode).toBe(200);
  });
});
