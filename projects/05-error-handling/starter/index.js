const express = require('express');
const app = express();
app.use(express.json());

// Generic error handling - swallows errors, no context
app.get('/api/users/:id', (req, res) => {
  try {
    const userId = parseInt(req.query.id);
    const user = getUserById(userId);
    res.json(user);
  } catch (error) {
    // Generic error - no context, no logging, no alerting
    console.log('Error:', error); // Not visible in production!
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.post('/api/orders', (req, res) => {
  try {
    const order = createOrder(req.body);
    res.json(order);
  } catch (error) {
    // Same generic handling - no differentiation
    console.log('Error:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

function getUserById(id) {
  if (!id) {
    throw new Error('User not found'); // Generic error
  }
  return { id, name: 'John Doe' };
}

function createOrder(data) {
  if (!data.items || data.items.length === 0) {
    throw new Error('Invalid order'); // Generic error
  }
  return { id: Math.random(), items: data.items };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

