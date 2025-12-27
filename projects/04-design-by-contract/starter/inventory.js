// Missing precondition checks - oversells inventory

let inventory = {
  'item1': { stock: 10, price: 50 },
  'item2': { stock: 5, price: 100 }
};

function sellItem(itemId, quantity) {
  // Missing: Check if item exists
  // Missing: Check if quantity is positive
  // Missing: Check if stock is sufficient
  
  const item = inventory[itemId];
  item.stock -= quantity; // Can go negative!
  
  return { itemId, quantity, remainingStock: item.stock, total: item.price * quantity };
}

function addStock(itemId, quantity) {
  // Missing: Check if item exists
  // Missing: Check if quantity is positive
  
  const item = inventory[itemId];
  item.stock += quantity; // Can accept negative quantities!
  
  return item.stock;
}

module.exports = { sellItem, addStock, inventory };

