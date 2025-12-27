const express = require('express');
const NotFoundError = require('./errors/NotFoundError');
const ValidationError = require('./errors/ValidationError');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./utils/logger');

const app = express();
app.use(express.json());

// Structured error handling with specific error types
app.get('/api/users/:id', (req, res, next) => {
  try {
    const userId = parseInt(req.params.id);
    
    if (!userId || isNaN(userId)) {
      throw new ValidationError('Invalid user ID', { userId: req.params.id });
    }
    
    const user = getUserById(userId);
    
    if (!user) {
      throw new NotFoundError('User', userId);
    }
    
    res.json(user);
  } catch (error) {
    next(error); // Pass to error handler
  }
});

app.post('/api/orders', (req, res, next) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new ValidationError('Order must contain at least one item', { items });
    }
    
    const order = createOrder(req.body);
    logger.info('Order created', { orderId: order.id });
    res.status(201).json(order);
  } catch (error) {
    next(error); // Pass to error handler
  }
});

function getUserById(id) {
  // Simulate database lookup
  const users = {
    1: { id: 1, name: 'John Doe' },
    2: { id: 2, name: 'Jane Smith' }
  };
  return users[id] || null;
}

function createOrder(data) {
  return {
    id: Math.random().toString(36).substr(2, 9),
    items: data.items,
    createdAt: new Date().toISOString()
  };
}

// Error handling middleware (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Export app for testing
module.exports = app;

// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test' && require.main === module) {
  const server = app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`, { port: PORT });
  });
}

