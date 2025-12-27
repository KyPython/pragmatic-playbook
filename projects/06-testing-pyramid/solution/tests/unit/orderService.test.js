// Unit tests for order service
const { calculateTotal, validateOrder } = require('../../services/orderService');

describe('Order Service Unit Tests', () => {
  describe('calculateTotal', () => {
    test('calculates total for single item', () => {
      const items = [{ price: 10, quantity: 2 }];
      expect(calculateTotal(items)).toBe(20);
    });

    test('calculates total for multiple items', () => {
      const items = [
        { price: 10, quantity: 2 },
        { price: 5, quantity: 3 }
      ];
      expect(calculateTotal(items)).toBe(35);
    });

    test('handles empty items array', () => {
      expect(calculateTotal([])).toBe(0);
    });
  });

  describe('validateOrder', () => {
    test('validates order with userId and items', () => {
      const order = { userId: 1, items: [{ price: 10, quantity: 1 }] };
      expect(validateOrder(order)).toBe(true);
    });

    test('rejects order without userId', () => {
      const order = { items: [{ price: 10, quantity: 1 }] };
      expect(validateOrder(order)).toBe(false);
    });

    test('rejects order without items', () => {
      const order = { userId: 1, items: [] };
      expect(validateOrder(order)).toBe(false);
    });
  });
});

