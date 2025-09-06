import { useState } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import StatsCards from './StatsCards';
import './ExpenseCharts.css';

const ExpenseCharts = ({ expenses }) => {
    const [activeTab, setActiveTab] = useState('overview');

    const categoryColors = {
        food: '#ff6b6b',
        cafe: '#4ecdc4',
        fees: '#45b7d1',
        trip: '#96ceb4',
        friends: '#ffeaa7',
        girlfriend: '#fd79a8',
        other: '#74b9ff'
    };

    const totalAmount = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
    const avgAmount = expenses.length > 0 ? totalAmount / expenses.length : 0;
    const expenseCount = expenses.length;

    const categoryData = expenses.reduce((acc, expense) => {
        const category = expense.category || 'other';
        if (!acc[category]) {
            acc[category] = { name: category, value: 0, count: 0 };
        }
        acc[category].value += parseFloat(expense.amount || 0);
        acc[category].count += 1;
        return acc;
    }, {});

    const pieData = Object.values(categoryData).map(item => ({
        ...item,
        name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
        color: categoryColors[item.name] || categoryColors.other
    }));

    const dateData = expenses.reduce((acc, expense) => {
        const date = expense.date;
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += parseFloat(expense.amount || 0);
        return acc;
    }, {});

    const trendData = Object.entries(dateData)
        .sort(([a], [b]) => new Date(a) - new Date(b))
        .map(([date, amount]) => ({
            date,
            amount: parseFloat(amount.toFixed(2))
        }));

    const renderOverview = () => (
        <div className="chart-section">
            <StatsCards
                totalAmount={totalAmount}
                expenseCount={expenseCount}
                avgAmount={avgAmount}
                categoryCount={Object.keys(categoryData).length}
            />
            <div className="chart-container">
                <h3 className="chart-title">Expense by Category</h3>
                <div className="pie-chart-layout">
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                        </PieChart>
                    </ResponsiveContainer>
                    <div className="category-summary">
                        <h4 className="summary-title">Category Summary</h4>
                        {pieData
                            .sort((a, b) => b.value - a.value)
                            .map((category) => (
                                <div key={category.name} className="category-item">
                                    <div className="category-color-box" style={{ backgroundColor: category.color }}></div>
                                    <div className="category-info">
                                        <strong>{category.name}</strong>
                                        <span>{category.count} expenses • ${category.value.toFixed(2)}</span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );

    const renderCategoryBreakdown = () => (
        <div className="chart-container">
            <h3 className="chart-title">Category Breakdown</h3>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={pieData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                    <Bar dataKey="value" fill="#8884d8">
                        {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );

    const renderTrends = () => (
        <div className="chart-container">
            <h3 className="chart-title">Spending Trends</h3>
            <ResponsiveContainer width="100%" height={400}>
                <LineChart data={trendData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']} />
                    <Line type="monotone" dataKey="amount" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );

    if (expenses.length === 0) {
        return (
            <div className="empty-chart-state">
                <PieChartIcon size={64} />
                <h3>No Data to Visualize</h3>
                <p>Add some expenses to see beautiful charts and insights!</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Expense Analytics</h2>
            <div className="tabs">
                <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
                <button className={`tab ${activeTab === 'categories' ? 'active' : ''}`} onClick={() => setActiveTab('categories')}>Categories</button>
                <button className={`tab ${activeTab === 'trends' ? 'active' : ''}`} onClick={() => setActiveTab('trends')}>Trends</button>
            </div>
            {activeTab === 'overview' && renderOverview()}
            {activeTab === 'categories' && renderCategoryBreakdown()}
            {activeTab === 'trends' && renderTrends()}
        </div>
    );
};

export default ExpenseCharts;