import request from 'supertest';
import app from '../../app';

describe('Owner advertisement tests', () => {
  test('Owner advertisements are gotten successfully', async () => {
    const response = await request(app).get('/ownerAdverts');
    expect(response.statusCode).toBe(200);
  });

  test('Owner advertisement is gotten successfully', async () => {
    const response = await request(app).get('/ownerAdverts/' + 6);
    expect(response.statusCode).toBe(200);
  });

  test('User owner advertisement is gotten successfully', async () => {
    const response = await request(app).get('/myOwnerAdvert/' + 7);
    expect(response.statusCode).toBe(200);
  });

  test('Owner pets are gotten successfully', async () => {
    const response = await request(app).get('/ownerPets/' + 6);
    expect(response.statusCode).toBe(200);
  });
  test('Owner services are gotten successfully', async () => {
    const response = await request(app).get('/ownerServices/' + 6);
    expect(response.statusCode).toBe(200);
  });
  test('Owner languages are gotten successfully', async () => {
    const response = await request(app).get('/ownerLanguages/' + 6);
    expect(response.statusCode).toBe(200);
  });

  test('Owner advertisement is created successfully', async () => {
    const response = await request(app)
      .post('/ownerAdverts')
      .send({
        name: 'Johnnn',
        surname: 'Doe',
        address: 'Eng. street. 1',
        phone: '8571818',
        title: 'Hello I am here for your pet',
        description: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
        extra_information: 'None',
        startDate: '2022-05-09',
        endDate: '2022-05-25',
        city: 'Kaunas',
        hour_price: 10,
        user_id: 7,
        time_intervals: ['00:00 - 02:00', '04:00 - 06:00'],
        pets: [1],
        services: [1],
        languages: [1]
      });
    expect(response.statusCode).toBe(201);
  });

  test('Owner advertisement has wrong body to create', async () => {
    const response = await request(app)
      .post('/ownerAdverts')
      .send({
        name: 'John',
        surname: 'Doe EDITED',
        title: 'Hello I am here for your pet',
        description: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
        extra_information: 'None',
        startDate: '2022-05-09',
        endDate: '2022-05-25',
        city: 'Kaunas',
        time_intervals: ['00:00 - 02:00', '04:00 - 06:00'],
        hour_price: 10,
        user_id: 7,
        pets: [1],
        services: [1],
        languages: [1]
      });
    expect(response.statusCode).toBe(400);
  });

  test('Owner advertisement is updated successfully', async () => {
    const response = await request(app)
      .put('/ownerAdverts/' + 9)
      .send({
        name: 'John Edited again',
        surname: 'Doe',
        address: 'Eng. street. 1',
        phone: '8571818',
        age: 20,
        activity: 'Student',
        experience: '5 years dog owner',
        title: 'Hello I am here for your pet',
        description: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
        extra_information: 'None',
        startDate: '2022-05-09',
        endDate: '2022-05-25',
        city: 'Kaunas',
        hour_price: 10,
        user_id: 8,
        time_intervals: ['00:00 - 02:00', '04:00 - 06:00'],
        pets: [1],
        services: [1],
        languages: [1]
      });
    expect(response.statusCode).toBe(200);
  });
  test('Owner advertisement is not found for update', async () => {
    const response = await request(app)
      .put('/ownerAdverts/' + 100000000)
      .send({
        name: 'John Edited',
        surname: 'Doe',
        address: 'Eng. street. 1',
        phone: '8571818',
        age: 20,
        activity: 'Student',
        experience: '5 years dog owner',
        title: 'Hello I am here for your pet',
        description: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
        extra_information: 'None',
        startDate: '2022-05-09',
        endDate: '2022-05-25',
        city: 'Kaunas',
        hour_price: 10,
        user_id: 8,
        pets: [1],
        services: [1],
        languages: [1],
        time_intervals: ['00:00 - 02:00', '04:00 - 06:00']
      });
    expect(response.statusCode).toBe(404);
  });

  test('Owner advertisement has wrong body for update', async () => {
    const response = await request(app)
      .put('/ownerAdverts/' + 9)
      .send({
        name: 'John Editeddddddddddd',
        surname: 'Doe',
        address: 'Eng. street. 1',
        activity: 'Student',
        experience: '5 years dog owner',
        title: 'Hello I am here for your pet',
        description: 'HelloHelloHelloHelloHelloHelloHelloHelloHelloHelloHello',
        extra_information: 'None',
        startDate: '2022-05-09',
        endDate: '2022-05-25',
        user_id: 8,
        pets: [1],
        services: [1],
        languages: [1],
        time_intervals: ['00:00 - 02:00', '04:00 - 06:00']
      });
    expect(response.statusCode).toBe(400);
  });

  test('Owner advertisement was not found for delete', async () => {
    const response = await request(app).delete('/ownerAdverts/' + 10000000);
    expect(response.statusCode).toBe(404);
  });

  test('Owner advertisement deleted successfully', async () => {
    const response = await request(app).delete('/ownerAdverts/' + 16);
    expect(response.statusCode).toBe(200);
  });
});
