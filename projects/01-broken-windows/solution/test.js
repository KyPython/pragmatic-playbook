const { calculatePrice, calculateDiscount, applyPromoCode } = require('./utils');

describe('Price Calculations', () => {
  test('calculatePrice returns correct total', () => {
    const items = [
      { price: 10, quantity: 2 },
      { price: 5, quantity: 3 }
    ];
    expect(calculatePrice(items)).toBe(35);
  });

  test('calculatePrice returns 0 for empty array', () => {
    expect(calculatePrice([])).toBe(0);
  });

  test('calculatePrice returns 0 for null/undefined', () => {
    expect(calculatePrice(null)).toBe(0);
    expect(calculatePrice(undefined)).toBe(0);
  });
});

describe('Discount Calculations', () => {
  test('calculateDiscount applies 10% discount correctly', () => {
    expect(calculateDiscount(100, 10)).toBe(90);
  });

  test('calculateDiscount handles 0% discount', () => {
    expect(calculateDiscount(100, 0)).toBe(100);
  });

  test('calculateDiscount handles invalid percentages', () => {
    expect(calculateDiscount(100, -10)).toBe(100);
    expect(calculateDiscount(100, 150)).toBe(100);
  });
});

describe('Promo Code Application', () => {
    test('applyPromoCode applies SAVE10 correctly', () => {
      expect(applyPromoCode(100, 'SAVE10')).toBe(90);
    });

    test('applyPromoCode applies SAVE20 correctly', () => {
      expect(applyPromoCode(100, 'SAVE20')).toBe(80);
    });

    test('applyPromoCode returns original price for invalid code', () => {
      expect(applyPromoCode(100, 'INVALID')).toBe(100);
    });
});

