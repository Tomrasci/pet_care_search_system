import request from 'supertest';
import app from '../../app';

describe('Caretaker advertisement tests', () => {
  test('Caretaker advertisements are gotten successfully', async () => {
    const response = await request(app).get('/caretakerAdverts');
    expect(response.statusCode).toBe(200);
  });

  test('Caretaker advertisement is created successfully', async () => {
    const response = await request(app)
      .post('/caretakerAdverts')
      .send({
        name: 'John',
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
        pets: [1, 2],
        services: [1, 2],
        languages: [1, 2],
        monday: ['02:00 - 04:00'],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      });
    expect(response.statusCode).toBe(201);
  });

  test('Caretaker advertisement has wrong body', async () => {
    const response = await request(app)
      .post('/caretakerAdverts')
      .send({
        name: 'John',
        surname: 'Doe',
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
        pets: [1, 2],
        services: [1, 2],
        languages: [1, 2],
        monday: ['02:00 - 04:00'],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      });
    expect(response.statusCode).toBe(400);
  });

  test('Caretaker advertisement is updated successfully', async () => {
    const response = await request(app)
      .put('/caretakerAdverts/' + 57)
      .send({
        name: 'John Editeddd',
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
        monday: ['02:00 - 04:00'],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      });
    expect(response.statusCode).toBe(200);
  });
  test('Caretaker advertisement is not found for update', async () => {
    const response = await request(app)
      .put('/caretakerAdverts/' + 100000000)
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
        monday: ['02:00 - 04:00'],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      });
    expect(response.statusCode).toBe(404);
  });

  test('Caretaker advertisement has wrong body for update', async () => {
    const response = await request(app)
      .put('/caretakerAdverts/' + 57)
      .send({
        name: 'John Edited',
        surname: 'Doe',
        address: 'Eng. street. 1',
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
        monday: ['02:00 - 04:00'],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: []
      });
    expect(response.statusCode).toBe(400);
  });

  test('Caretaker advertisement was not found for delete', async () => {
    const response = await request(app).delete('/caretakerAdverts/' + 10000000);
    expect(response.statusCode).toBe(404);
  });

  test('Caretaker advertisement deleted successfully', async () => {
    const response = await request(app).delete('/caretakerAdverts/' + 64);
    expect(response.statusCode).toBe(200);
  });
  test('User caretaker advertisement is gotten successfully', async () => {
    const response = await request(app).get('/myCaretakerAdvertisement/' + 8);
    expect(response.statusCode).toBe(200);
  });

  test('Caretaker advertisement is gotten successfully', async () => {
    const response = await request(app).get('/caretakerAdverts/' + 55);
    expect(response.statusCode).toBe(200);
  });

  test('Caretaker pets are gotten successfully', async () => {
    const response = await request(app).get('/caretakerPets/' + 55);
    expect(response.statusCode).toBe(200);
  });
  test('Caretaker services are gotten successfully', async () => {
    const response = await request(app).get('/caretakerServices/' + 55);
    expect(response.statusCode).toBe(200);
  });
  test('Caretaker languages are gotten successfully', async () => {
    const response = await request(app).get('/caretakerLanguages/' + 55);
    expect(response.statusCode).toBe(200);
  });
  test('Caretaker availability is gotten successfully', async () => {
    const response = await request(app).get('/caretakerAvailability/' + 55);
    expect(response.statusCode).toBe(200);
  });
});
