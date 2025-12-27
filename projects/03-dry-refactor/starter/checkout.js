// Same discount calculation duplicated here
function processCheckout(items, promoCode) {
  let total = 0;
  
  for (const item of items) {
    total += item.price * item.quantity;
  }
  
  // Duplicated discount logic (slightly different - uses promo code)
  if (promoCode === 'SAVE10') {
    const discountPercent = 10;
    if (discountPercent < 0 || discountPercent > 100) {
      return total;
    }
    const discountAmount = total * (discountPercent / 100);
    total = total - discountAmount;
  }
  
  return total;
}

// Duplicated validation (same as cart.js)
function validateCheckout(items) {
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

module.exports = { processCheckout, validateCheckout };

