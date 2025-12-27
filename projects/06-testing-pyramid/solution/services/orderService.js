function calculateTotal(items) {
  if (!items || items.length === 0) {
    return 0;
  }
  return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function validateOrder(order) {
  if (!order.userId || !order.items || order.items.length === 0) {
    return false;
  }
  return true;
}

module.exports = { calculateTotal, validateOrder };

