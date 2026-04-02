import React from 'react';
import { FinanceProvider } from './context/FinanceContext';
import Navbar from './components/layout/Navbar';
import SummaryCards from './components/dashboard/SummaryCards';
import Charts from './components/dashboard/Charts';
import TransactionList from './components/transactions/TransactionList';

function App() {
  return (
    <FinanceProvider>
      <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
        <Navbar />
        <main>
          <SummaryCards />
          <Charts />
          <TransactionList />
        </main>
      </div>
    </FinanceProvider>
  );
}

export default App;