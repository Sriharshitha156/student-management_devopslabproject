const request = require('supertest');
const app = require('../app');

describe('Student API', () => {
  test('GET /api/students returns a list', async () => {
    const res = await request(app).get('/api/students');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /api/students creates a student', async () => {
    const res = await request(app)
      .post('/api/students')
      .send({ name: 'Ravi', course: 'ECE', year: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({ name: 'Ravi', course: 'ECE', year: 2 });
    expect(res.body.id).toBeDefined();
  });

  test('POST /api/students rejects missing fields', async () => {
    const res = await request(app).post('/api/students').send({ name: 'NoCourse' });
    expect(res.statusCode).toBe(400);
  });

  test('GET /api/students/:id returns 404 for unknown id', async () => {
    const res = await request(app).get('/api/students/9999');
    expect(res.statusCode).toBe(404);
  });

  test('DELETE /api/students/:id removes a student', async () => {
    const created = await request(app).post('/api/students').send({ name: 'Temp', course: 'IT' });
    const del = await request(app).delete(`/api/students/${created.body.id}`);
    expect(del.statusCode).toBe(204);
    const get = await request(app).get(`/api/students/${created.body.id}`);
    expect(get.statusCode).toBe(404);
  });
});
