// DRY principle: Single source of truth for discount calculation

/**
 * Calculate discount amount from price and percentage
 * @param {number} price - Original price
 * @param {number} discountPercent - Discount percentage (0-100)
 * @returns {number} - Final price after discount
 */
function calculateDiscount(price, discountPercent) {
  if (discountPercent < 0 || discountPercent > 100) {
    return price;
  }
  const discountAmount = price * (discountPercent / 100);
  return price - discountAmount;
}

/**
 * Apply promo code and return discounted price
 * @param {number} price - Original price
 * @param {string} promoCode - Promo code string
 * @returns {number} - Final price after promo
 */
function applyPromoCode(price, promoCode) {
  const promoDiscounts = {
    'SAVE10': 10,
    'SAVE20': 20,
    'SAVE50': 50
  };
  
  const discountPercent = promoDiscounts[promoCode] || 0;
  return calculateDiscount(price, discountPercent); // Reuse single function
}

/**
 * Get final price with discount
 * @param {number} price - Original price
 * @param {number} discountPercent - Discount percentage
 * @returns {number} - Final price
 */
function getFinalPrice(price, discountPercent) {
  return calculateDiscount(price, discountPercent); // Reuse single function
}

/**
 * Calculate total price from items array
 * @param {Array} items - Array of {price, quantity} objects
 * @returns {number} - Total price
 */
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

