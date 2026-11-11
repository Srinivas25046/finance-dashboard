# FinanceTrack Dashboard

A modern, responsive, and interactive frontend finance dashboard built to evaluate UI/UX design, component structuring, and state management.

## 🚀 Live Demo
* **Deployment Link:** https://finance-dashboard-phi-lemon.vercel.app/

## 📋 Overview
This project is a React-based web application that allows users to track and visualize their financial activity. It features a clean interface, interactive charts, a transaction management system, and simulated Role-Based Access Control (RBAC).

## ✨ Key Features
* **Dashboard Summary:** Quick-glance cards for Total Balance, Total Income, and Total Expenses.
* **Data Visualization:** Interactive line chart for tracking the balance trend over time.
  * Interactive pie chart for breaking down spending by category.
* **Transaction Management:** View a tabulated list of recent transactions.
  * Search transactions by category.
  * Filter transactions by type (Income/Expense).
* **Role-Based Access Control (RBAC):**
  * **Viewer Mode:** Can browse data and utilize filters/search.
  * **Admin Mode:** Unlocks the ability to add new transactions and delete existing ones.
* **Data Persistence:** Transactions are automatically saved to the browser's `localStorage`, ensuring data remains intact upon page refresh.
* **Responsive Design:** Fully fluid layout that works seamlessly across desktop, tablet, and mobile devices.

## 🛠️ Tech Stack
* **Framework:** React 18 (Bootstrapped with Vite for fast builds)
* **Styling:** Tailwind CSS (For utility-first, responsive design)
* **Charts:** Recharts (For SVG-based, accessible visualizations)
* **Icons:** Lucide React
* **State Management:** React Context API + LocalStorage

## 📁 Project Structure
The application follows a modular and scalable architecture:

```text
src/
├── components/
│   ├── layout/          # Structural components (Navbar)
│   ├── dashboard/       # Dashboard widgets (SummaryCards, Charts)
│   └── transactions/    # Transaction-specific UI (List, Filters, Forms)
├── context/             # Global state management (FinanceContext)
├── data/                # Initial mock data and type definitions
├── App.jsx              # Main layout and Context Provider wrapper
└── main.jsx             # React entry point
