const request = require('supertest');
const app = require('./index');

describe('Error Handling Tests', () => {
  test('returns 404 for non-existent user', async () => {
    const res = await request(app).get('/api/users/999');
    expect(res.status).toBe(404);
    expect(res.body.error).toContain('not found');
  });

  test('returns 400 for invalid user ID', async () => {
    const res = await request(app).get('/api/users/invalid');
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('Invalid user ID');
  });

  test('returns 400 for empty order', async () => {
    const res = await request(app).post('/api/orders').send({ items: [] });
    expect(res.status).toBe(400);
    expect(res.body.error).toContain('at least one item');
  });

  test('returns 201 for valid order', async () => {
    const res = await request(app).post('/api/orders').send({
      items: [{ id: 1, quantity: 2 }]
    });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
  });
});

