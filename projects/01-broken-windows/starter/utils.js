// Duplicated discount calculation logic in 3 places

// First instance
function calculateDiscount(price, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    return price;
  }
  const discountAmount = price * (discountPercent / 100);
  return price - discountAmount;
}

// Second instance - same logic duplicated
function applyPromoCode(price, promoCode) {
  let discountPercent = 0;
  if (promoCode === 'SAVE10') {
    discountPercent = 10;
  } else if (promoCode === 'SAVE20') {
    discountPercent = 20;
  }
  
  if (discountPercent < 0 || discountPercent > 100) {
    return price;
  }
  const discountAmount = price * (discountPercent / 100);
  return price - discountAmount;
}

// Third instance - same logic again
function getFinalPrice(price, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    return price;
  }
  const discountAmount = price * (discountPercent / 100);
  return price - discountAmount;
}

function calculatePrice(items) {
  if (!items || items.length === 0) {
    return 0;
  }
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
}

module.exports = {
  calculateDiscount,
  applyPromoCode,
  getFinalPrice,
  calculatePrice
};

