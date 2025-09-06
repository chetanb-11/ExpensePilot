import { useState, useEffect } from 'react';
import './App.css';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import ExpenseCharts from './components/ExpenseCharts';

function App() {
    const [refreshKey, setRefreshKey] = useState(0);
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const handleExpenseAdded = () => {
        setRefreshKey(prev => prev + 1);
    };

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8080/api/expenses')
            .then(res => res.json())
            .then(data => {
                setExpenses(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching expenses:", err);
                setLoading(false);
            });
    }, [refreshKey]);

    return (
        <>
            <header className="app-header">
                <h1>💰 ExpensePilot</h1>
            </header>

            <div className="container">
                <main className="main-content">
                    <div className="card">
                        <AddExpense onExpenseAdded={handleExpenseAdded} />
                        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #e2e8f0' }} />
                        <ExpenseList expenses={expenses} setExpenses={setExpenses} loading={loading} />
                    </div>
                    <div className="card">
                        <ExpenseCharts expenses={expenses} />
                    </div>
                </main>
            </div>
        </>
    );
}

export default App;
