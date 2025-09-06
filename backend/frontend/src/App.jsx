import { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import ExpenseCharts from './components/ExpenseCharts';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [transaction, setTransaction] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expenses, setExpenses] = useState(0);
    const [income, setIncome] = useState(0);
    const handleExpenseAdded = () => {
        setRefreshKey(prev => prev + 1);
    };

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/expenses')
            .then(res => res.json())
            .then(data => {
                setTransaction(data);
                // Calculate totals and store as numbers

                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching expenses:", err);
                setLoading(false);
            });
    }, [refreshKey]);
    const totalAmount = transaction.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const expenseTotal = transaction.filter(exp => exp.type === "Expense").reduce((sum, exp) => sum + exp.amount, 0);
    const incomeTotal = transaction.filter(exp => exp.type === "Income").reduce((sum, exp) => sum + exp.amount, 0);
    return (
        <>
            <header className="app-header">
                <h1>💰 ExpensePilot</h1>
            </header>

            <div className="container">
                <main in className="main-content">
                    <div className="small-card div1">
                        Total Balance: {totalAmount}<>...........</>
                        Total Income: ₹{incomeTotal}
                        <>...........</>
                        Total Spending: ₹{expenseTotal}
                    </div>
                    <div className="card div2">
                        <AddExpense onExpenseAdded={handleExpenseAdded} />
                        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                        <ExpenseList transaction={transaction} setTransaction={setTransaction} loading={loading} />
                    </div>
                    <div className="card div3">
                        <ExpenseCharts transaction={transaction} />
                    </div>
                </main>
            </div>
        </>
    );
}

export default App;
