const { withdraw, deposit, transfer, accounts } = require('./account');
const { sellItem, addStock, inventory } = require('./inventory');

console.log('=== Testing Account Functions (Silent Failures) ===');

// This should fail but doesn't - negative balance!
console.log('Withdrawing 2000 from user1 (balance: 1000):');
const balance1 = withdraw('user1', 2000);
console.log('New balance:', balance1); // Should be -1000 (corrupted!)

// This should fail but doesn't - negative amount!
console.log('\nDepositing -500 to user2:');
const balance2 = deposit('user2', -500);
console.log('New balance:', balance2); // Wrong result!

// This should fail but doesn't - invalid accounts!
console.log('\nTransferring from non-existent account:');
try {
  transfer('nonexistent', 'user1', 100);
  console.log('Transfer succeeded (should have failed!)');
} catch (error) {
  console.log('Error:', error.message);
}

console.log('\n=== Testing Inventory Functions (Overselling) ===');

// This should fail but doesn't - overselling!
console.log('Selling 20 items (stock: 10):');
const sale = sellItem('item1', 20);
console.log('Sale result:', sale); // Stock goes negative!

// This should fail but doesn't - negative quantity!
console.log('\nAdding -5 stock:');
const stock = addStock('item2', -5);
console.log('New stock:', stock); // Wrong result!

console.log('\n⚠️  All operations "succeeded" but data is corrupted!');
console.log('⚠️  No validation = Silent failures = Data corruption');

