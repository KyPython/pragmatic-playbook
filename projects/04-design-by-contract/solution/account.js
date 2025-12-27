// Design by Contract: Clear preconditions and postconditions

let accounts = {
  'user1': { balance: 1000 },
  'user2': { balance: 500 }
};

/**
 * Withdraw money from account
 * Preconditions:
 *   - accountId must exist
 *   - amount must be positive
 *   - account must have sufficient balance
 * Postconditions:
 *   - Account balance decreased by amount
 *   - Returns new balance
 */
function withdraw(accountId, amount) {
  // Precondition: Account must exist
  if (!accounts[accountId]) {
    throw new Error(`Account ${accountId} does not exist`);
  }
  
  // Precondition: Amount must be positive
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error(`Amount must be a positive number, got: ${amount}`);
  }
  
  // Precondition: Sufficient balance
  if (accounts[accountId].balance < amount) {
    throw new Error(`Insufficient balance. Current: ${accounts[accountId].balance}, Requested: ${amount}`);
  }
  
  // Operation
  accounts[accountId].balance -= amount;
  
  // Postcondition: Balance is non-negative
  if (accounts[accountId].balance < 0) {
    throw new Error('Postcondition violated: Balance cannot be negative');
  }
  
  return accounts[accountId].balance;
}

/**
 * Deposit money to account
 * Preconditions:
 *   - accountId must exist
 *   - amount must be positive
 * Postconditions:
 *   - Account balance increased by amount
 *   - Returns new balance
 */
function deposit(accountId, amount) {
  // Precondition: Account must exist
  if (!accounts[accountId]) {
    throw new Error(`Account ${accountId} does not exist`);
  }
  
  // Precondition: Amount must be positive
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error(`Amount must be a positive number, got: ${amount}`);
  }
  
  // Operation
  accounts[accountId].balance += amount;
  
  return accounts[accountId].balance;
}

/**
 * Transfer money between accounts
 * Preconditions:
 *   - Both accounts must exist
 *   - amount must be positive
 *   - from account must have sufficient balance
 * Postconditions:
 *   - from account balance decreased
 *   - to account balance increased
 */
function transfer(fromId, toId, amount) {
  // Precondition: Both accounts must exist
  if (!accounts[fromId]) {
    throw new Error(`Source account ${fromId} does not exist`);
  }
  if (!accounts[toId]) {
    throw new Error(`Destination account ${toId} does not exist`);
  }
  
  // Precondition: Amount must be positive
  if (typeof amount !== 'number' || amount <= 0) {
    throw new Error(`Amount must be a positive number, got: ${amount}`);
  }
  
  // Precondition: Sufficient balance
  if (accounts[fromId].balance < amount) {
    throw new Error(`Insufficient balance in ${fromId}. Current: ${accounts[fromId].balance}, Requested: ${amount}`);
  }
  
  // Operation
  withdraw(fromId, amount);
  deposit(toId, amount);
  
  return { from: accounts[fromId].balance, to: accounts[toId].balance };
}

module.exports = { withdraw, deposit, transfer, accounts };

