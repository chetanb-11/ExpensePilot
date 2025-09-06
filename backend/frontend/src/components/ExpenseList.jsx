import './ExpenseList.css';

const ExpenseList = ({ expenses, loading }) => {
    if (loading) return <div className="loading">Loading expenses...</div>;
    if (!expenses || expenses.length === 0) {
        return (
            <div className="empty-state">
                <h3>No Expenses Yet</h3>
                <p>Add an expense using the form above to see it here.</p>
            </div>
        );
    }
    function handleDelete(id) {
        console.log("Deleting expense with id:", id); 
        fetch(`http://localhost:8080/api/expense/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.ok) {
                    if (onExpenseDeleted) {
                        onExpenseDeleted(id);
                    }
                } else {
                    alert('Failed to delete expense.');
                }
            })
            .catch(() => {
                alert('Error deleting expense.');
            });
    }

    return (
        <div className="expense-list-container">
            <h2>Recent Expenses</h2>
            <div className="expense-list">
                {expenses.map((expense) => (
                    <div key={expense.id} className="expense-item">
                        <div className="expense-details">
                            <h3 className="expense-description">{expense.description}</h3>
                            <p className="expense-date">{expense.date}</p>
                        </div>
                        <div className="expense-right">
                            <p className="expense-amount">${expense.amount.toFixed(2)}</p>
                            {expense.category && <span className="expense-category">{expense.category}</span>}
                            <button
                                className="delete-btn"
                                onClick={() => handleDelete(expense.id)}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
