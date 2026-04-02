import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Wallet, TrendingUp, TrendingDown } from 'lucide-react';

const SummaryCards = () => {
  const { totals } = useFinance();

  const cards = [
    { title: 'Total Balance', amount: totals.balance, icon: Wallet, color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { title: 'Total Income', amount: totals.income, icon: TrendingUp, color: 'text-emerald-600', bg: 'bg-emerald-100' },
    { title: 'Total Expenses', amount: totals.expenses, icon: TrendingDown, color: 'text-rose-600', bg: 'bg-rose-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className={`p-4 rounded-full ${card.bg} ${card.color}`}>
              <Icon size={24} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{card.title}</p>
              <h2 className="text-2xl font-bold text-gray-800">${card.amount.toLocaleString()}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;