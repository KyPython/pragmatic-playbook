const { calculateCartTotal } = require('./cart');
const { processCheckout } = require('./checkout');
const { applyPromotion } = require('./promotions');
const { validateItems } = require('./utils/validation');
const { applyDiscount } = require('./utils/discount');

describe('DRY Refactor Tests', () => {
  const items = [
    { price: 50, quantity: 2 },
    { price: 30, quantity: 1 }
  ];

  test('calculateCartTotal applies discount for totals > 100', () => {
    const total = calculateCartTotal(items);
    expect(total).toBe(117); // 130 - 10% = 117
  });

  test('processCheckout applies promo code discount', () => {
    const total = processCheckout(items, 'SAVE10');
    expect(total).toBe(117); // 130 - 10% = 117
  });

  test('applyPromotion applies bulk discount', () => {
    const total = applyPromotion(items, 'BULK');
    expect(total).toBe(110.5); // 130 - 15% = 110.5
  });

  test('validateItems throws error for invalid input', () => {
    expect(() => validateItems(null)).toThrow('Items must be an array');
    expect(() => validateItems([])).toThrow('Items array cannot be empty');
    expect(() => validateItems([{ price: -10, quantity: 1 }])).toThrow('Invalid item price');
  });

  test('applyDiscount handles edge cases', () => {
    expect(applyDiscount(100, 10)).toBe(90);
    expect(applyDiscount(100, 0)).toBe(100);
    expect(applyDiscount(100, -10)).toBe(100); // Invalid, returns original
    expect(applyDiscount(100, 150)).toBe(100); // Invalid, returns original
  });
});

