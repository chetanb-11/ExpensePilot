import { useState } from 'react';
import './AddExpense.css';

const AddExpense = ({ onExpenseAdded }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    date: '',
    category: '',
      type:''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const[activeTab, setActiveTab]=useState("expenseAdd")

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description || !formData.amount || !formData.date) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch('http://localhost:8080/api/expense', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          amount: parseFloat(formData.amount)
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create expense');
      }

      setFormData({
        description: '',
        amount: '',
        date: '',
        category: '',
          type:''
      });

      if (onExpenseAdded) {
        onExpenseAdded();
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const expenseAdd = (
      <form onSubmit={handleSubmit} className="add-expense-form">
          <div className="form-group">
              <label htmlFor="description">Description *</label>
              <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="form-group">
              <label htmlFor="amount">Amount *</label>
              <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="form-group">
              <label htmlFor="date">Date *</label>
              <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
              />
          </div>
          <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
              >
                  <option value="">Select Category</option>
                  <option value="food">Food</option>
                  <option value="cafe">Cafe</option>
                  <option value="fees">Fees</option>
                  <option value="trip">Trip</option>
                  <option value="friends">Friends</option>
                  <option value="girlfriend">Girlfriend</option>
                  <option value="other">Other</option>
              </select>
          </div>
          <button type="submit" disabled={loading}>
              {loading ? 'Adding...' : 'Add Expense'}
          </button>
      </form>
  );
  const incomeAdd = (
        <form onSubmit={handleSubmit} className="add-expense-form">
            <div className="form-group">
                <label htmlFor="description">Description *</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="amount">Amount *</label>
                <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="date">Date *</label>
                <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                >
                    <option value="">Select Category</option>
                    <option value="food">Food</option>
                    <option value="cafe">Cafe</option>
                    <option value="fees">Fees</option>
                    <option value="trip">Trip</option>
                    <option value="friends">Friends</option>
                    <option value="girlfriend">Girlfriend</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button type="submit" disabled={loading}>
                {loading ? 'Adding...' : 'Add Expense'}
            </button>
        </form>
    )
  return (
    <div className="add-expense-container">
        <button className={`tab ${activeTab === 'expenseAdd' ? 'active' : ''}`} onClick={() => {
            setActiveTab('expenseAdd')
            setFormData(prev => ({ ...prev, type: 'expense' }))
        }}>Add Expense</button>
        <button className={`tab ${activeTab === 'incomeAdd' ? 'active' : ''}`} onClick={() => {
            setActiveTab('incomeAdd');
            setFormData(prev => ({ ...prev, type: 'income' }));
        }}>Add Income</button>
      {error && <div className="error-message">{error}</div>}

        {activeTab === "expenseAdd" && expenseAdd}
        {activeTab === "incomeAdd" && incomeAdd}

    </div>
  );
};

export default AddExpense;
