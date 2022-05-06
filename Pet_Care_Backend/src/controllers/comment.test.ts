import request from 'supertest';
import app from '../../app';

describe('Comment tests', () => {
  test('Comment is gotten successfully', async () => {
    const response = await request(app).get('/comments/' + 17);
    expect(response.statusCode).toBe(200);
  });

  test('Comment is not found', async () => {
    const response = await request(app).get('/comments/' + 10000000000);
    expect(response.statusCode).toBe(404);
  });

  test('Comment list is gotten successfully', async () => {
    const response = await request(app).get('/commentsWithUserInfo/' + 55);
    expect(response.statusCode).toBe(200);
  });

  test('Comment is created successfully', async () => {
    const response = await request(app).post('/comments').send({
      description: 'comment',
      user_id: 7,
      advertisement_id: 55
    });
    expect(response.statusCode).toBe(201);
  });

  test('Comment creation fails', async () => {
    const response = await request(app).post('/comments').send({
      user_id: 7,
      advertisement_id: 55
    });
    expect(response.statusCode).toBe(400);
  });

  test('Comment update fails', async () => {
    const response = await request(app)
      .put('/comments/' + 17)
      .send({
        user_id: 7,
        advertisement_id: 55
      });
    expect(response.statusCode).toBe(400);
  });

  test('Comment update is sucessful', async () => {
    const response = await request(app)
      .put('/comments/' + 17)
      .send({
        description: 'commentEdit',
        user_id: 7,
        advertisement_id: 55
      });
    expect(response.statusCode).toBe(200);
  });

  test('Comment delete is sucessful', async () => {
    const response = await request(app).delete('/comments/' + 37);
    expect(response.statusCode).toBe(200);
  });
});
