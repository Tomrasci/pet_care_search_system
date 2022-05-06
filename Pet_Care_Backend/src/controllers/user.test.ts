import request from 'supertest';
import app from '../../app';

describe('User  tests', () => {
  test('User with username exists', async () => {
    const response = await request(app).post('/register').send({
      username: 'newUser',
      password: 'pass',
      email: 'newUser@gmail.com',
      phone: '85769642',
      address: 'Adress',
      name: 'John',
      surname: 'Doe',
      role: 2,
      city: 'Kaunas'
    });
    expect(response.statusCode).toBe(409);
  });

  test('User with email exists', async () => {
    const response = await request(app).post('/register').send({
      username: 'newUser',
      password: 'pass',
      email: 'new@gmail.com',
      phone: '85769642',
      address: 'Adress',
      name: 'John',
      surname: 'Doe',
      role: 2,
      city: 'Kaunas'
    });
    expect(response.statusCode).toBe(409);
  });

  test('User request body is wrong', async () => {
    const response = await request(app).post('/register').send({
      username: 'newUser',
      email: 'new@gmail.com',
      address: 'Adress',
      name: 'John',
      surname: 'Doe',
      role: 2,
      city: 'Kaunas'
    });
    expect(response.statusCode).toBe(400);
  });
  test('User is registered successfully', async () => {
    const response = await request(app).post('/register').send({
      username: 'testingtesting',
      password: 'pass',
      email: 'anothertestUserForTest@gmail.com',
      phone: '85769642',
      address: 'Adress',
      name: 'John',
      surname: 'Doe',
      role: 2,
      city: 'Kaunas'
    });
    expect(response.statusCode).toBe(201);
  });

  test('User email to login doesnt exist', async () => {
    const response = await request(app).post('/login').send({
      email: 'fewfewfewfewffw@gmail.com',
      password: 'pass'
    });
    expect(response.statusCode).toBe(401);
  });

  test('User password is not correct', async () => {
    const response = await request(app).post('/login').send({
      email: 'new@gmail.com',
      password: 'fasfafasfagawgw'
    });
    expect(response.statusCode).toBe(401);
  });

  test('User logged in successfully', async () => {
    const response = await request(app).post('/login').send({
      email: 'newUser@gmail.com',
      password: 'pass'
    });
    expect(response.statusCode).toBe(200);
  });
});
