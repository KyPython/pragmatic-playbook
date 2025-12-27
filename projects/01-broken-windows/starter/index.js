const express = require('express');
const { authenticate } = require('./auth');
const { calculatePrice, applyPromoCode } = require('./utils');

const app = express();
app.use(express.json());

// Missing error handling - crashes on invalid input
app.get('/api/order', async (req, res) => {
  // No validation - will crash if userId is missing or invalid
  const userId = parseInt(req.query.userId);
  
  const orderData = req.body;
  
  // No try/catch - unhandled promise rejection
  const result = await processOrder(userId, orderData);
  
  res.json(result);
});

// Missing validation - crashes on empty array
app.post('/api/calculate', (req, res) => {
  const items = req.body.items;
  const price = calculatePrice(items); // No check if items is empty
  res.json({ price });
});

async function processOrder(userId, orderData) {
  // Simulate async operation
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ userId, orderId: Math.random(), status: 'processed' });
    }, 100);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;

