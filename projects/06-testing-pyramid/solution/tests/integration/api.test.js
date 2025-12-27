// Integration tests - Test API endpoints
const request = require('supertest');
const { app, storage } = require('../../index');

describe('API Integration Tests', () => {
  beforeEach(() => {
    // Reset state before each test
    storage.users = [];
    storage.orders = [];
  });

  describe('Users API', () => {
    test('GET /api/users returns empty array initially', async () => {
      const res = await request(app).get('/api/users');
      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    test('POST /api/users creates new user', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe', email: 'john@example.com' });
      
      expect(res.status).toBe(201);
      expect(res.body.name).toBe('John Doe');
      expect(res.body.email).toBe('john@example.com');
    });

    test('POST /api/users returns 400 for invalid data', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({ name: 'John Doe' }); // Missing email
      
      expect(res.status).toBe(400);
    });
  });

  describe('Orders API', () => {
    test('POST /api/orders creates new order', async () => {
      const res = await request(app)
        .post('/api/orders')
        .send({
          userId: 1,
          items: [{ price: 10, quantity: 2 }]
        });
      
      expect(res.status).toBe(201);
      expect(res.body.userId).toBe(1);
      expect(res.body.total).toBe(20);
    });
  });
});

