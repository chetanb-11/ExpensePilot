import { useState, useEffect } from 'react';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/expenses');
      if (!response.ok) {
        throw new Error('Failed to fetch expenses');
      }
      const data = await response.json();
      setExpenses(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading expenses...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2>Expense List</h2>
      {expenses.length === 0 ? (
        <p>No expenses found. Add your first expense above!</p>
      ) : (
        <div style={{ display: 'grid', gap: '1rem' }}>
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="expense-card"
              style={{
                padding: '1rem',
                textAlign: 'left',
                background: 'white',
                borderRadius: '8px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                border: '1px solid #e0e0e0'
              }}
            >
              <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>{expense.description}</h3>
              <p style={{ margin: '0.25rem 0' }}><strong>Amount:</strong> ${expense.amount}</p>
              <p style={{ margin: '0.25rem 0' }}><strong>Date:</strong> {expense.date}</p>
              {expense.category && <p style={{ margin: '0.25rem 0' }}><strong>Category:</strong> {expense.category}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
