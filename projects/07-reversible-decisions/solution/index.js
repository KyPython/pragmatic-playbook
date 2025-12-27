const express = require('express');
const { isEnabled } = require('./featureFlags');
const app = express();
app.use(express.json());

app.get('/api/products', (req, res) => {
  const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ];
  
  // Feature flag - can be toggled without redeploying
  if (isEnabled('enableDiscount')) {
    return res.json(products.map(p => ({
      ...p,
      discountedPrice: p.price * 0.9
    })));
  }
  
  res.json(products);
});

app.get('/api/checkout', (req, res) => {
  // Feature flag for new checkout flow
  if (isEnabled('enableNewCheckout')) {
    return res.json({ 
      flow: 'new',
      message: 'Using new checkout flow'
    });
  }
  
  res.json({ 
    flow: 'old',
    message: 'Using old checkout flow'
  });
});

// Admin endpoint to toggle feature flags (in production, use proper auth)
app.post('/api/admin/flags/:flagName', (req, res) => {
  const { flagName } = req.params;
  const { enabled } = req.body;
  
  const { updateFlag } = require('./featureFlags');
  updateFlag(flagName, enabled);
  
  res.json({ flagName, enabled, message: 'Flag updated - no redeploy needed!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('✅ Feature flags enabled - reversible deployments');
});

module.exports = app;

