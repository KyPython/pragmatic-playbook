/**
 * Validate items array
 * Single source of truth for all item validation
 * @param {Array} items - Array of items with price and quantity
 * @throws {Error} - If validation fails
 */
function validateItems(items) {
  if (!items || !Array.isArray(items)) {
    throw new Error('Items must be an array');
  }
  
  if (items.length === 0) {
    throw new Error('Items array cannot be empty');
  }
  
  for (const item of items) {
    if (!item.price || typeof item.price !== 'number' || item.price < 0) {
      throw new Error('Invalid item price');
    }
    if (!item.quantity || typeof item.quantity !== 'number' || item.quantity < 1) {
      throw new Error('Invalid item quantity');
    }
  }
  
  return true;
}

module.exports = { validateItems };

