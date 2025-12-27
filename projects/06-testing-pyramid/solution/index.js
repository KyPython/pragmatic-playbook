const express = require('express');
const app = express();
app.use(express.json());

// In-memory storage (replace with database in production)
// Export for test access
const storage = {
  users: [],
  orders: []
};

app.get('/api/users', (req, res) => {
  res.json(storage.users);
});

app.post('/api/users', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }
  
  const user = { id: Date.now(), name, email, createdAt: new Date().toISOString() };
  storage.users.push(user);
  res.status(201).json(user);
});

app.get('/api/users/:id', (req, res) => {
  const user = storage.users.find(u => u.id === parseInt(req.params.id));
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
});

app.get('/api/orders', (req, res) => {
  res.json(storage.orders);
});

app.post('/api/orders', (req, res) => {
  const { userId, items } = req.body;
  
  if (!userId || !items || items.length === 0) {
    return res.status(400).json({ error: 'UserId and items are required' });
  }
  
  const order = {
    id: Date.now(),
    userId,
    items,
    total: items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    createdAt: new Date().toISOString()
  };
  storage.orders.push(order);
  res.status(201).json(order);
});

// Export app and storage for testing
module.exports = { app, storage };

// Only start server if not in test environment and run directly
if (process.env.NODE_ENV !== 'test' && require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

