import request from 'supertest';
import app from '../../app';

describe('Reservation tests', () => {
  test('Reservations are gotten successfully', async () => {
    const response = await request(app).get('/reservations');
    expect(response.statusCode).toBe(200);
  });

  test('Owner reservations are gotten successfully', async () => {
    const response = await request(app).get('/ownerReservations/' + 7);
    expect(response.statusCode).toBe(200);
  });

  test('Advertisement reservations are gotten successfully', async () => {
    const response = await request(app).get('/advertisementReservations/' + 55);
    expect(response.statusCode).toBe(200);
  });

  test('Reservation is created successfully', async () => {
    const response = await request(app).post('/reservations').send({
      advertisement_id: 55,
      date: '2022-05-14',
      description: 'Reserving',
      status: 'pending',
      time_intervals: '06:00-08:00',
      user_id: '7'
    });
    expect(response.statusCode).toBe(201);
  });
  test('Advertisement reservation is cancelled  successfully', async () => {
    const response = await request(app).post('/reservations/cancel/' + 31);
    expect(response.statusCode).toBe(200);
  });

  test('Advertisement reservation cant be found and cancelled', async () => {
    const response = await request(app).post('/reservations/cancel/' + 1000);
    expect(response.statusCode).toBe(404);
  });

  test('Advertisement reservation is confirmed  successfully', async () => {
    const response = await request(app).post('/reservations/confirm/' + 31);
    expect(response.statusCode).toBe(200);
  });

  test('Advertisement reservation cant be found and confirmed', async () => {
    const response = await request(app).post('/reservations/confirm/' + 1000);
    expect(response.statusCode).toBe(404);
  });

  test('Advertisement confirmed reservations are gotten successfully', async () => {
    const response = await request(app).get('/reservations/confirmed/' + 55);
    expect(response.statusCode).toBe(200);
  });

  test('Advertisement confirmed reservations cant be found', async () => {
    const response = await request(app).post('/reservations/confirmed/' + 1000);
    expect(response.statusCode).toBe(404);
  });
});
