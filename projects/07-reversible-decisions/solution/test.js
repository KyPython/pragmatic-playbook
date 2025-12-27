const { isEnabled, updateFlag } = require('./featureFlags');

describe('Feature Flags', () => {
  beforeEach(() => {
    // Reset flags
    process.env.FEATURE_DISCOUNT = 'false';
    process.env.FEATURE_NEW_CHECKOUT = 'false';
  });

  test('feature flag defaults to disabled', () => {
    expect(isEnabled('enableDiscount')).toBe(false);
  });

  test('can enable feature flag', () => {
    updateFlag('enableDiscount', true);
    expect(isEnabled('enableDiscount')).toBe(true);
  });

  test('can disable feature flag', () => {
    updateFlag('enableDiscount', true);
    updateFlag('enableDiscount', false);
    expect(isEnabled('enableDiscount')).toBe(false);
  });
});

