const express = require('express');
const { authenticate } = require('./auth');
const { calculatePrice, applyPromoCode } = require('./utils');

const app = express();
app.use(express.json());

// Proper error handling with validation
app.get('/api/order', async (req, res) => {
  try {
    // Validate input
    const userId = parseInt(req.query.userId);
    if (isNaN(userId) || userId <= 0) {
      return res.status(400).json({ error: 'Invalid userId' });
    }
    
    const orderData = req.body;
    if (!orderData || !orderData.items) {
      return res.status(400).json({ error: 'Invalid order data' });
    }
    
    // Proper async error handling
    const result = await processOrder(userId, orderData);
    res.json(result);
  } catch (error) {
    console.error('Error processing order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Proper validation before processing
app.post('/api/calculate', (req, res) => {
  try {
    const items = req.body.items;
    
    // Validate input
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Items array is required and cannot be empty' });
    }
    
    const price = calculatePrice(items);
    res.json({ price });
  } catch (error) {
    console.error('Error calculating price:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
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

