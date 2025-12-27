const { applyDiscount, getCartDiscountPercent } = require('./utils/discount');
const { validateItems } = require('./utils/validation');

function calculateCartTotal(items) {
  validateItems(items);
  
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  
  // Use shared discount function
  const discountPercent = getCartDiscountPercent(total);
  return applyDiscount(total, discountPercent);
}

module.exports = { calculateCartTotal, validateItems };

