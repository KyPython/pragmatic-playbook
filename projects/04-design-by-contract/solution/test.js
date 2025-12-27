const { withdraw, deposit, transfer, accounts } = require('./account');
const { sellItem, addStock, inventory } = require('./inventory');

describe('Design by Contract Tests', () => {
  beforeEach(() => {
    // Reset state
    accounts.user1.balance = 1000;
    accounts.user2.balance = 500;
    inventory.item1.stock = 10;
    inventory.item2.stock = 5;
  });

  describe('Account Functions', () => {
    test('withdraw throws error for non-existent account', () => {
      expect(() => withdraw('nonexistent', 100)).toThrow('Account nonexistent does not exist');
    });

    test('withdraw throws error for negative amount', () => {
      expect(() => withdraw('user1', -100)).toThrow('Amount must be a positive number');
    });

    test('withdraw throws error for insufficient balance', () => {
      expect(() => withdraw('user1', 2000)).toThrow('Insufficient balance');
    });

    test('withdraw succeeds with valid inputs', () => {
      const balance = withdraw('user1', 100);
      expect(balance).toBe(900);
    });

    test('deposit throws error for negative amount', () => {
      expect(() => deposit('user1', -100)).toThrow('Amount must be a positive number');
    });

    test('transfer throws error for invalid accounts', () => {
      expect(() => transfer('nonexistent', 'user1', 100)).toThrow('Source account');
      expect(() => transfer('user1', 'nonexistent', 100)).toThrow('Destination account');
    });
  });

  describe('Inventory Functions', () => {
    test('sellItem throws error for non-existent item', () => {
      expect(() => sellItem('nonexistent', 1)).toThrow('Item nonexistent does not exist');
    });

    test('sellItem throws error for insufficient stock', () => {
      expect(() => sellItem('item1', 20)).toThrow('Insufficient stock');
    });

    test('sellItem throws error for negative quantity', () => {
      expect(() => sellItem('item1', -1)).toThrow('Quantity must be a positive integer');
    });

    test('sellItem succeeds with valid inputs', () => {
      const sale = sellItem('item1', 5);
      expect(sale.remainingStock).toBe(5);
      expect(sale.total).toBe(250);
    });
  });
});

