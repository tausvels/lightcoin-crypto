let balance = 500.00;

class Account {
  constructor (userName){
    this.userName = userName;
    this.transactions = [];
  }
  get balance() {
  	let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value; // t.value is returned from get value of withdrawal and deposit.
    }
    return balance;
  }
  addTransactoin (transaction) {
    this.transactions.push(transaction)
  }
   
}
class Transaction {
  constructor (amount, account) {
    this.amount = amount;
    this.account = account;
  }
  commit(){
    if (!this.isAllowed()) return false;
    this.time = new Date;
    this.account.addTransactoin(this); // adds the Transaction object with the transcations prop of the account.
    return true;
  }
}
class Withdrawal extends Transaction{
  
  get value (){
    return -this.amount;
  }
  isAllowed() {
    // note how it has access to this.account b/c of parent
    return (this.account.balance - this.amount >= 0);
  }
}
class Deposit extends Transaction{
  
  get value (){
    return this.amount
  }
  isAllowed() {
    return true;
  }
}

//const myAccount = new Account ("Tausif's Account", 200) 
const myAccount = new Account();

console.log('Starting Account Balance: ', myAccount.balance);

console.log('Attempting to withdraw even $1 should fail...');
const t1 = new Withdrawal(1.00, myAccount);
console.log('Commit result:', t1.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Depositing should succeed...');
const t2 = new Deposit(9.99, myAccount);
console.log('Commit result:', t2.commit());
console.log('Account Balance: ', myAccount.balance);

console.log('Withdrawal for 9.99 should be allowed...');
const t3 = new Withdrawal(9.99, myAccount);
console.log('Commit result:', t3.commit());

console.log('Ending Account Balance: ', myAccount.balance);
console.log("Lookings like I'm broke again");

console.log('Account Transaction History: ', myAccount.transactions);
