import React from 'react';
import { useFinance } from '../../context/FinanceContext';
import { LayoutDashboard, UserCircle } from 'lucide-react';

const Navbar = () => {
  const { role, setRole } = useFinance();

  return (
    <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-6 rounded-lg">
      <div className="flex items-center gap-2">
        <LayoutDashboard className="text-indigo-600" />
        <h1 className="text-xl font-bold text-gray-800">FinanceTrack</h1>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <UserCircle size={20} />
          <span>Simulate Role:</span>
          <select 
            className="border border-gray-300 rounded p-1 bg-gray-50 focus:outline-none focus:border-indigo-500"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer (Read Only)</option>
            <option value="admin">Admin (Edit Mode)</option>
          </select>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;