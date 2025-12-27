// Missing precondition checks - accepts invalid inputs silently

let accounts = {
  'user1': { balance: 1000 },
  'user2': { balance: 500 }
};

function withdraw(accountId, amount) {
  // Missing: Check if account exists
  // Missing: Check if amount is positive
  // Missing: Check if balance is sufficient
  
  const account = accounts[accountId];
  account.balance -= amount; // Can go negative!
  
  return account.balance;
}

function deposit(accountId, amount) {
  // Missing: Check if account exists
  // Missing: Check if amount is positive
  
  const account = accounts[accountId];
  account.balance += amount; // Can accept negative amounts!
  
  return account.balance;
}

function transfer(fromId, toId, amount) {
  // Missing: Check if accounts exist
  // Missing: Check if amount is positive
  // Missing: Check if from account has sufficient balance
  
  withdraw(fromId, amount);
  deposit(toId, amount);
  
  return { from: accounts[fromId].balance, to: accounts[toId].balance };
}

module.exports = { withdraw, deposit, transfer, accounts };

