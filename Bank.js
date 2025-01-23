// 🏦 Bank and Account System 
// Bank Class: Manages multiple accounts
// Define a new JavaScript class named Bank
class Bank {
    constructor() {
        this.accounts = []; // Stores all accounts in the bank
    }

    // Add methods here:
    // Example: createAccount(name, initialDeposit)
    // Creates a new instance of the Account class

    createAccount(name, initialDeposit) {
        const myAccount = new Account(name, initialDeposit); // Create a new Account object
        this.accounts.push(myAccount); // Add the account to the accounts array
        console.log(`Account created for ${name} with an initial deposit of ${initialDeposit}`);
        return myAccount; // Return the new account
    }
   

}

// Account Class: Represents a single user's account
class Account {
    constructor(name, balance = 0) {
        this.name = name; // Account holder's name
        this.balance = balance; // Initial balance (default is 0)
        this.transactionHistory = []; // Keeps a record of all transactions
    }

    // Add methods here:
    // Example: deposit(amount) 
    // example data to be stored in transactionHistory { transactionType: 'Deposit', amount: 500 }

    // Deposit money into the account
    deposit(amount) { 
        if (amount <= 0) { // ensure deposit amount is greater than 0
            console.log("Deposit amount must be greater than zero.");
            return false; // exit method and signal deposit failed
        }
        this.balance += amount; // Add amount to balance
        this.transactionHistory.push({ transactionType: 'Deposit', amount }); // Record the transaction
        console.log(`Deposited ${amount} into ${this.name}'s account. New Balance: ${this.balance}`);
    }

    // Withdraw money from the account
    withdraw(amount) {
        if (amount <= 0) { // ensure withdrawal amount is greater than 0
            console.log("Withdrawal amount must be greater than zero.");
            return false; // exit method and signal withdraw failed 
        }
        if (amount > this.balance) {
            console.log("Insufficient funds."); // ensure withdrawl does not exceed the available balance
            return false; // exit method and signal withdraw failed
        }
        this.balance -= amount; // Deduct amount from balance
        this.transactionHistory.push({ transactionType: 'Withdrawal', amount }); // Record the transaction
        console.log(`Withdrew ${amount} from ${this.name}'s account. New Balance: ${this.balance}`);
    }

    // Transfer money to another account
    transfer(amount, recipientAccount) {
        if (amount <= 0) { 
            console.log("Transfer amount must be greater than zero."); // Ensures the transfer amount is greater than 0 
            return false; // exit method and signal transfer failed
        }
        if (amount > this.balance) {
            console.log(`Transfer failed: Insufficient funds in ${this.name}'s account.`); // ensures transfer amount does not exceed the sender’s balance
            return false; // exit method and signal transfer failed 
        }

        // Subtract from sender's balance and record transaction
        this.balance -= amount; // Deducts the transfer amount from the sender’s balance 
        this.transactionHistory.push({ transactionType: 'Transfer', amount, to: recipientAccount.name }); //  records the transfer amount in transactionHistory

        // Add to recipient's balance and record transaction
        recipientAccount.balance += amount; // // adds the transfer amount from the sender’s balance 
        recipientAccount.transactionHistory.push({ transactionType: 'Received', amount, from: this.name }); // records the transfer amount in transactionHistory

        return true;
    }

    // Check the current balance of the account
    checkBalance() {
        console.log(`The balance for ${this.name}'s account is ${this.balance}`); // A method to display and return the current account balance.
        return this.balance;
    }

    // Display the transaction history
    displayTransactionHistory() { // method's job is to show all the transactions recorded in the transactionHistory array
        console.log("Transaction History for " + this.name + ":"); // Combines the string "Transaction History for " with the value of this.name. and prints heading
        // Loop through the transactionHistory array
        for (let i = 0; i < this.transactionHistory.length; i++) { // loop iterates through each transaction in the transactionHistory array one by one
            // Get the current transaction
            const transaction = this.transactionHistory[i];
    
            // Start the message with transaction details
            let message = (i + 1) + ". " + transaction.transactionType + ": " + transaction.amount; // Creates a new variable to store the message 
    
            // Add extra details for Transfer and Received transactions
            if (transaction.transactionType === "Transfer") { 
                message += " to " + transaction.to; // // Checks if the current transaction is a "Transfer". If true, it adds " to [recipient]" to the message
            } else if (transaction.transactionType === "Received") {
                message += " from " + transaction.from; // Checks if the current transaction is "Received". If true, it adds " from [sender]" to the message
            }
    
            // Print the message for each transaction
            console.log(message);
        }
    }
}


//<-------------------------------DO NOT WRITE BELOW THIS LINE------------------------------>

// Function to test bank operations
function testBankOperations() {
    const bank = new Bank();

    // Create new accounts
    const johnAccount = bank.createAccount('John Doe', 1000);
    const janeAccount = bank.createAccount('Jane Doe', 500);
    console.log('Accounts created:', johnAccount, janeAccount);

    // Perform some operations on John's account
    johnAccount.deposit(500);
    johnAccount.withdraw(200);

    // Perform a transfer from John to Jane
    johnAccount.transfer(300, janeAccount);

    // Check balances
    const johnFinalBalance = johnAccount.checkBalance();
    const janeFinalBalance = janeAccount.checkBalance();
    console.log('John\'s balance:', johnFinalBalance);
    console.log('Jane\'s balance:', janeFinalBalance);

    // Return balances for testing
    return { 
        johnFinalBalance, 
        janeFinalBalance, 
        johnTransactionHistory: johnAccount.transactionHistory, 
        janeTransactionHistory: janeAccount.transactionHistory 
    };
}

module.exports = testBankOperations;

//<-------------------------------DO NOT WRITE ABOVE THIS LINE------------------------------>


console.log(testBankOperations());
