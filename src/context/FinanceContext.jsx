import React, { createContext, useState, useContext, useMemo } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [role, setRole] = useState('viewer'); // 'viewer' or 'admin'

  // Calculate totals
  const totals = useMemo(() => {
    return transactions.reduce(
      (acc, curr) => {
        if (curr.type === 'income') acc.income += curr.amount;
        if (curr.type === 'expense') acc.expenses += curr.amount;
        acc.balance = acc.income - acc.expenses;
        return acc;
      },
      { income: 0, expenses: 0, balance: 0 }
    );
  }, [transactions]);

  // Handle adding a new transaction
  const addTransaction = (newTx) => {
    setTransactions([{ ...newTx, id: Date.now() }, ...transactions]);
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter(tx => tx.id !== id));
  }

  return (
    <FinanceContext.Provider value={{ 
      transactions, 
      role, 
      setRole, 
      totals, 
      addTransaction,
      deleteTransaction
    }}>
      {children}
    </FinanceContext.Provider>
  );
};

export const useFinance = () => useContext(FinanceContext);