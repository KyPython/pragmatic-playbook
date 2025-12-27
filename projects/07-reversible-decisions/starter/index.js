const express = require('express');
const app = express();
app.use(express.json());

// No feature flags - all-or-nothing deployment
app.get('/api/products', (req, res) => {
  // New feature hardcoded - can't disable without redeploy
  const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 }
  ];
  
  // New feature: Add discount (can't rollback without redeploy!)
  const productsWithDiscount = products.map(p => ({
    ...p,
    discountedPrice: p.price * 0.9 // 10% discount
  }));
  
  res.json(productsWithDiscount);
});

// Manual deployment process (simulated)
function deploy() {
  console.log('Step 1: Build application... (30 minutes)');
  console.log('Step 2: Run tests... (15 minutes)');
  console.log('Step 3: Deploy to staging... (20 minutes)');
  console.log('Step 4: Manual testing... (30 minutes)');
  console.log('Step 5: Deploy to production... (15 minutes)');
  console.log('Total: 1.5 hours');
  console.log('⚠️  If something breaks, rollback takes hours!');
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('⚠️  No feature flags - all-or-nothing deployments');
});

module.exports = app;

