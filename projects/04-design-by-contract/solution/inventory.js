// Design by Contract: Clear preconditions for inventory operations

let inventory = {
  'item1': { stock: 10, price: 50 },
  'item2': { stock: 5, price: 100 }
};

/**
 * Sell item from inventory
 * Preconditions:
 *   - itemId must exist
 *   - quantity must be positive integer
 *   - sufficient stock available
 * Postconditions:
 *   - Stock decreased by quantity
 *   - Returns sale details
 */
function sellItem(itemId, quantity) {
  // Precondition: Item must exist
  if (!inventory[itemId]) {
    throw new Error(`Item ${itemId} does not exist`);
  }
  
  // Precondition: Quantity must be positive integer
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error(`Quantity must be a positive integer, got: ${quantity}`);
  }
  
  // Precondition: Sufficient stock
  if (inventory[itemId].stock < quantity) {
    throw new Error(`Insufficient stock. Available: ${inventory[itemId].stock}, Requested: ${quantity}`);
  }
  
  // Operation
  inventory[itemId].stock -= quantity;
  
  // Postcondition: Stock cannot be negative
  if (inventory[itemId].stock < 0) {
    throw new Error('Postcondition violated: Stock cannot be negative');
  }
  
  return {
    itemId,
    quantity,
    remainingStock: inventory[itemId].stock,
    total: inventory[itemId].price * quantity
  };
}

/**
 * Add stock to inventory
 * Preconditions:
 *   - itemId must exist
 *   - quantity must be positive integer
 * Postconditions:
 *   - Stock increased by quantity
 *   - Returns new stock level
 */
function addStock(itemId, quantity) {
  // Precondition: Item must exist
  if (!inventory[itemId]) {
    throw new Error(`Item ${itemId} does not exist`);
  }
  
  // Precondition: Quantity must be positive integer
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error(`Quantity must be a positive integer, got: ${quantity}`);
  }
  
  // Operation
  inventory[itemId].stock += quantity;
  
  return inventory[itemId].stock;
}

module.exports = { sellItem, addStock, inventory };

