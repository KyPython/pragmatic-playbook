/**
 * Calculate discount amount from price and percentage
 * Single source of truth for all discount calculations
 * @param {number} price - Original price
 * @param {number} discountPercent - Discount percentage (0-100)
 * @returns {number} - Final price after discount
 */
function applyDiscount(price, discountPercent) {
  // Validate discount percentage
  if (discountPercent < 0 || discountPercent > 100) {
    return price;
  }
  
  const discountAmount = price * (discountPercent / 100);
  return price - discountAmount;
}

/**
 * Get discount percentage based on promo code
 * @param {string} promoCode - Promo code string
 * @returns {number} - Discount percentage
 */
function getDiscountPercent(promoCode) {
  const promoDiscounts = {
    'SAVE10': 10,
    'SAVE20': 20,
    'BULK': 15
  };
  
  return promoDiscounts[promoCode] || 0;
}

/**
 * Calculate discount based on cart total
 * @param {number} total - Cart total
 * @returns {number} - Discount percentage
 */
function getCartDiscountPercent(total) {
  if (total > 100) {
    return 10;
  }
  return 0;
}

module.exports = {
  applyDiscount,
  getDiscountPercent,
  getCartDiscountPercent
};

