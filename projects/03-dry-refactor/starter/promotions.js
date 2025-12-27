// Same discount calculation duplicated again
function applyPromotion(items, promotionType) {
  let total = 0;
  
  for (const item of items) {
    total += item.price * item.quantity;
  }
  
  // Duplicated discount logic (different condition)
  if (promotionType === 'BULK') {
    const discountPercent = 15; // Different percentage - inconsistency!
    if (discountPercent < 0 || discountPercent > 100) {
      return total;
    }
    const discountAmount = total * (discountPercent / 100);
    total = total - discountAmount;
  }
  
  return total;
}

// Duplicated validation (same as cart.js and checkout.js)
function validatePromotion(items) {
  if (!items || !Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  for (const item of items) {
    if (!item.price || item.price < 0) {
      throw new Error('Invalid item price');
    }
    if (!item.quantity || item.quantity < 1) {
      throw new Error('Invalid item quantity');
    }
  }
  
  return true;
}

module.exports = { applyPromotion, validatePromotion };

