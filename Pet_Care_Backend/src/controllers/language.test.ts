import request from 'supertest';
import app from '../../app';

describe('language tests', () => {
  test('language is gotten successfully', async () => {
    const response = await request(app).get('/languages/' + 0);
    expect(response.statusCode).toBe(200);
  });

  test('languages are gotten successfully', async () => {
    const response = await request(app).get('/languages');
    expect(response.statusCode).toBe(200);
  });
});
