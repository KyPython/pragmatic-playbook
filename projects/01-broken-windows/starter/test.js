// Test file that never runs - no test framework setup
// This file exists but is never executed

const { calculatePrice } = require('./utils');

// Manual test
function testCalculatePrice() {
  const items = [
    { price: 10, quantity: 2 },
    { price: 5, quantity: 3 }
  ];
  
  const result = calculatePrice(items);
  console.log('Test result:', result === 35 ? 'PASS' : 'FAIL');
}

testCalculatePrice();

