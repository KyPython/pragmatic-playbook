const { calculateCartTotal, validateCart } = require('./cart');
const { processCheckout, validateCheckout } = require('./checkout');
const { applyPromotion, validatePromotion } = require('./promotions');

// Demo showing the duplication problem
const items = [
  { price: 50, quantity: 2 },
  { price: 30, quantity: 1 }
];

console.log('=== Cart Calculation ===');
validateCart(items);
const cartTotal = calculateCartTotal(items);
console.log('Cart total:', cartTotal);

console.log('\n=== Checkout Calculation ===');
validateCheckout(items);
const checkoutTotal = processCheckout(items, 'SAVE10');
console.log('Checkout total:', checkoutTotal);

console.log('\n=== Promotion Calculation ===');
validatePromotion(items);
const promotionTotal = applyPromotion(items, 'BULK');
console.log('Promotion total:', promotionTotal);

console.log('\n⚠️  Notice: Same validation logic in 3 places!');
console.log('⚠️  Notice: Same discount calculation in 3 places!');
console.log('⚠️  Notice: Inconsistent discount percentages!');

