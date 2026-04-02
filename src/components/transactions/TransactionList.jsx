import React, { useState } from 'react';
import { useFinance } from '../../context/FinanceContext';
import { Search, Trash2 } from 'lucide-react';

const TransactionList = () => {
  const { transactions, role, deleteTransaction, addTransaction } = useFinance();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Quick form state for admin
  const [newTx, setNewTx] = useState({ date: '', amount: '', category: '', type: 'expense' });

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newTx.amount || !newTx.category || !newTx.date) return;
    addTransaction({ ...newTx, amount: Number(newTx.amount) });
    setNewTx({ date: '', amount: '', category: '', type: 'expense' }); // reset
  };

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            <input 
              type="text" 
              placeholder="Search category..." 
              className="w-full pl-9 pr-3 py-2 border rounded-lg focus:outline-none focus:border-indigo-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="border rounded-lg px-3 py-2 focus:outline-none focus:border-indigo-500"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      {/* Admin Add Transaction Form (Only visible if role === 'admin') */}
      {role === 'admin' && (
        <form onSubmit={handleAdd} className="mb-6 flex gap-2 flex-wrap items-end bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="flex-1 min-w-[120px]">
             <label className="block text-xs text-gray-500 mb-1">Date</label>
             <input type="date" required className="w-full border rounded p-2" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} />
          </div>
          <div className="flex-1 min-w-[120px]">
             <label className="block text-xs text-gray-500 mb-1">Amount</label>
             <input type="number" required placeholder="Amount" className="w-full border rounded p-2" value={newTx.amount} onChange={e => setNewTx({...newTx, amount: e.target.value})} />
          </div>
          <div className="flex-1 min-w-[120px]">
             <label className="block text-xs text-gray-500 mb-1">Category</label>
             <input type="text" required placeholder="e.g. Rent" className="w-full border rounded p-2" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} />
          </div>
          <div className="flex-1 min-w-[120px]">
             <label className="block text-xs text-gray-500 mb-1">Type</label>
             <select className="w-full border rounded p-2" value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value})}>
               <option value="expense">Expense</option>
               <option value="income">Income</option>
             </select>
          </div>
          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 transition">Add</button>
        </form>
      )}

      {/* Transactions Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b text-sm text-gray-500">
              <th className="py-3 font-medium">Date</th>
              <th className="py-3 font-medium">Category</th>
              <th className="py-3 font-medium">Type</th>
              <th className="py-3 font-medium text-right">Amount</th>
              {role === 'admin' && <th className="py-3 font-medium text-center">Action</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id} className="border-b last:border-0 hover:bg-gray-50">
                  <td className="py-3 text-sm text-gray-600">{tx.date}</td>
                  <td className="py-3 font-medium text-gray-800">{tx.category}</td>
                  <td className="py-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${tx.type === 'income' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`py-3 text-right font-medium ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {tx.type === 'income' ? '+' : '-'}${tx.amount}
                  </td>
                  {role === 'admin' && (
                    <td className="py-3 text-center">
                      <button onClick={() => deleteTransaction(tx.id)} className="text-gray-400 hover:text-rose-500 transition">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={role === 'admin' ? 5 : 4} className="py-8 text-center text-gray-500">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionList;