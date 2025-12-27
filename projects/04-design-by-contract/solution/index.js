const { withdraw, deposit, transfer, accounts } = require('./account');
const { sellItem, addStock, inventory } = require('./inventory');

console.log('=== Testing Account Functions (With Contracts) ===');

// This should fail - negative balance prevented!
console.log('Attempting to withdraw 2000 from user1 (balance: 1000):');
try {
  const balance1 = withdraw('user1', 2000);
  console.log('New balance:', balance1);
} catch (error) {
  console.log('✅ Contract enforced:', error.message);
}

// This should fail - negative amount prevented!
console.log('\nAttempting to deposit -500 to user2:');
try {
  const balance2 = deposit('user2', -500);
  console.log('New balance:', balance2);
} catch (error) {
  console.log('✅ Contract enforced:', error.message);
}

// This should fail - invalid account prevented!
console.log('\nAttempting to transfer from non-existent account:');
try {
  transfer('nonexistent', 'user1', 100);
  console.log('Transfer succeeded');
} catch (error) {
  console.log('✅ Contract enforced:', error.message);
}

// Valid operation should work
console.log('\nValid withdrawal:');
const balance = withdraw('user1', 100);
console.log('✅ Success. New balance:', balance);

console.log('\n=== Testing Inventory Functions (With Contracts) ===');

// This should fail - overselling prevented!
console.log('Attempting to sell 20 items (stock: 10):');
try {
  const sale = sellItem('item1', 20);
  console.log('Sale result:', sale);
} catch (error) {
  console.log('✅ Contract enforced:', error.message);
}

// This should fail - negative quantity prevented!
console.log('\nAttempting to add -5 stock:');
try {
  const stock = addStock('item2', -5);
  console.log('New stock:', stock);
} catch (error) {
  console.log('✅ Contract enforced:', error.message);
}

// Valid operation should work
console.log('\nValid sale:');
const sale = sellItem('item1', 5);
console.log('✅ Success. Sale:', sale);

console.log('\n✅ All contracts enforced - data integrity protected!');

