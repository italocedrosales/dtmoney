import { createContext, useEffect, useState, ReactNode, useContext } from 'react';

import { api } from '../services/api';

interface Trasanction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Trasanction, 'id' | 'createdAt'>;

interface TrasanctionsProviderProps {
  children: ReactNode;
}

interface TrasanctionsContextData {
  transactions: Trasanction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TrasanctionsContextData>(
  {} as TrasanctionsContextData
);

export function TransactionsProvider({ children }: TrasanctionsProviderProps) {
  const [transactions, setTransactions] = useState<Trasanction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => setTransactions(response.data.transactions));
  }, []);

  async function createTransaction(transactionInput: TransactionInput) {
      const response = await api.post('/transactions', {
        ...transactionInput,
        createdAt: new Date(),
      });

      const { transaction } = response.data;

      setTransactions([
        ...transactions, 
        transaction
      ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}