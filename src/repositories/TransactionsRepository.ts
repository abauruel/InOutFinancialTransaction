import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    // TODO
    const { income, outcome } = this.transactions.reduce(
      (acc, curr) => {
        acc[curr.type] = acc[curr.type] + curr.value || curr.value;
        return acc;
      },
      { income: 0, outcome: 0 },
    );

    const balance = {
      income,
      outcome,
      total: income - outcome,
    };
    return balance;
  }

  public create({ type, title, value }: Omit<Transaction, 'id'>): Transaction {
    // TODO
    const transaction = new Transaction({ type, title, value });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
