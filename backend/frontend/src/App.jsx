import { useState, useRef } from 'react'
import './App.css'
import ExpenseList from './components/ExpenseList'
import AddExpense from './components/AddExpense'

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const expenseListRef = useRef();

  const handleExpenseAdded = () => {
    // Force refresh of expense list when new expense is added
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <header style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1>💰 ExpensePilot</h1>
        <p>Track and manage your expenses</p>
      </header>

      <main>
        <AddExpense onExpenseAdded={handleExpenseAdded} />
        <hr style={{ margin: '2rem 0', border: 'none', borderTop: '1px solid #eee' }} />
        <ExpenseList key={refreshKey} ref={expenseListRef} />
      </main>
    </div>
  )
}

export default App
