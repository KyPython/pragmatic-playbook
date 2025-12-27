const { calculateCartTotal } = require('./cart');
const { processCheckout } = require('./checkout');
const { applyPromotion } = require('./promotions');

// Demo showing the DRY solution
const items = [
  { price: 50, quantity: 2 },
  { price: 30, quantity: 1 }
];

console.log('=== Cart Calculation ===');
const cartTotal = calculateCartTotal(items);
console.log('Cart total:', cartTotal);

console.log('\n=== Checkout Calculation ===');
const checkoutTotal = processCheckout(items, 'SAVE10');
console.log('Checkout total:', checkoutTotal);

console.log('\n=== Promotion Calculation ===');
const promotionTotal = applyPromotion(items, 'BULK');
console.log('Promotion total:', promotionTotal);

console.log('\n✅ All calculations use shared discount logic!');
console.log('✅ All validations use shared validation function!');
console.log('✅ Change once, works everywhere!');

