// E2E tests - Test complete user flows
const request = require('supertest');
const { app, storage } = require('../../index');

describe('E2E User Flow Tests', () => {
  beforeEach(() => {
    storage.users = [];
    storage.orders = [];
  });

  test('Complete user registration and order flow', async () => {
    // Step 1: Create user
    const userRes = await request(app)
      .post('/api/users')
      .send({ name: 'John Doe', email: 'john@example.com' });
    
    expect(userRes.status).toBe(201);
    const userId = userRes.body.id;

    // Step 2: Create order for user
    const orderRes = await request(app)
      .post('/api/orders')
      .send({
        userId,
        items: [
          { price: 10, quantity: 2 },
          { price: 5, quantity: 3 }
        ]
      });
    
    expect(orderRes.status).toBe(201);
    expect(orderRes.body.userId).toBe(userId);
    expect(orderRes.body.total).toBe(35);

    // Step 3: Verify user can be retrieved
    const getUserRes = await request(app).get(`/api/users/${userId}`);
    expect(getUserRes.status).toBe(200);
    expect(getUserRes.body.name).toBe('John Doe');
  });
});

