const { applyDiscount, getDiscountPercent } = require('./utils/discount');
const { validateItems } = require('./utils/validation');

function processCheckout(items, promoCode) {
  validateItems(items);
  
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  
  // Use shared discount function
  const discountPercent = getDiscountPercent(promoCode);
  return applyDiscount(total, discountPercent);
}

module.exports = { processCheckout, validateItems };

