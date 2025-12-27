const { applyDiscount, getDiscountPercent } = require('./utils/discount');
const { validateItems } = require('./utils/validation');

function applyPromotion(items, promotionType) {
  validateItems(items);
  
  let total = 0;
  for (const item of items) {
    total += item.price * item.quantity;
  }
  
  // Use shared discount function
  const discountPercent = getDiscountPercent(promotionType);
  return applyDiscount(total, discountPercent);
}

module.exports = { applyPromotion, validateItems };

