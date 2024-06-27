import React, { useState, useEffect } from 'react';
import './App.css';
import './components/UI/Card.css'
import './components/UI/Expenses.css'
import Button from "./components/expenses/AddExpenses.jsx";
import Filter from "./components/expenses/ExpensesFilter.jsx";
import Diagram from "./components/expenses/ExpensesChartBar.jsx";
import Card from "./components/UI/Card.jsx";
import Loader from "./components/UI/Loader.jsx";
import { addExpense, getExpenses } from "./service/Service.js";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      setLoading(true);
      const expensesData = await getExpenses();
      setExpenses(expensesData);
      setLoading(false);
    };
    fetchExpenses();
  }, []);

  const addItem = async (name, amount, date) => {
    await addExpense(name, amount, date, setExpenses);
  };

  const sortItems = (year) => {
    setSelectedYear(year);
  }

  const filteredExpenses = expenses.filter(expense => {
    return !selectedYear || expense.date.getFullYear().toString() === selectedYear;
  });

  return (
    <div className="App">
      <h2 className='text-format'>My Expenses template</h2>
      <Button handleSubmit={addItem}/>
      {loading ? (
        <Loader />
      ) : (
        <div className="card expenses">
          <Filter sortExpenses={sortItems} expensesList={expenses}/>
          <Diagram expenseItems={filteredExpenses} yearToDisplay={selectedYear}/>
          <Card expenseItems={filteredExpenses}/>
        </div>
      )}
    </div>
  );
}

export default App;
