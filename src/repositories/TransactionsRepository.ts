import Transaction from '../models/Transaction';

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

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
    const { income, outcome } = this.transactions.reduce(
      (accumulator, { type, value }) => {
        switch (type) {
          case 'income':
            accumulator.income += value;
            break;
          case 'outcome':
            accumulator.outcome += value;
            break;
          default:
            break;
        }
        return accumulator;
      },
      { income: 0, outcome: 0 },
    );
    return { income, outcome, total: income - outcome };
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);
    return transaction;
  }
}

export default TransactionsRepository;
