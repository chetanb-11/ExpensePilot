import './ExpenseList.css';

const ExpenseList = ({ transaction, setTransaction, loading }) => {
    if (loading) return <div className="loading">Loading transaction...</div>;
    if (!transaction || transaction.length === 0) {
        return (
            <div className="empty-state">
                <h3>No Transaction Yet</h3>
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
                if (response.status === 200 || response.status === 204) {
                    // Remove the deleted expense from the local state
                    setTransaction((prev) => prev.filter((expense) => expense.id !== id));
                } else {
                    alert('Failed to delete expense.');
                }
            })
            .catch((e) => {
                console.log(e);
                alert('Error deleting expense.');
            });
    }

    return (
        <div className="expense-list-container">
            <h2>Recent Transaction</h2>
            <div className="expense-list">
                {transaction.map((expense) => (
                    <div key={expense.id} className="expense-item">
                        <div className="expense-details">
                            <h3 className="expense-description">{expense.description}</h3>
                            <p className="expense-date">{expense.date}</p>
                        </div>
                        <div className="expense-right">
                            <p className="expense-amount">${expense.amount.toFixed(2)}</p>
                            {expense.category && <span className="expense-category">{expense.category}</span>}
                            {/* <button
                                className="delete-btn"
                                onClick={() => handleDelete(expense.id)}
                            >
                                Delete
                            </button> */}
                            <button className="bin-button" onClick={() => handleDelete(expense.id)}>
                                <svg
                                    className="bin-top"
                                    viewBox="0 0 39 7"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <line y1="5" x2="39" y2="5" stroke="white" stroke-width="4"></line>
                                    <line
                                        x1="12"
                                        y1="1.5"
                                        x2="26.0357"
                                        y2="1.5"
                                        stroke="white"
                                        stroke-width="3"
                                    ></line>
                                </svg>
                                <svg
                                    className="bin-bottom"
                                    viewBox="0 0 33 39"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <mask id="path-1-inside-1_8_19" fill="white">
                                        <path
                                            d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"
                                        ></path>
                                    </mask>
                                    <path
                                        d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                                        fill="white"
                                        mask="url(#path-1-inside-1_8_19)"
                                    ></path>
                                    <path d="M12 6L12 29" stroke="white" stroke-width="4"></path>
                                    <path d="M21 6V29" stroke="white" stroke-width="4"></path>
                                </svg>

                            </button>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;
