import { Calendar, DollarSign, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import './StatsCards.css';

const StatsCards = ({ totalAmount, expenseCount, avgAmount, categoryCount }) => {
    const stats = [
        {
            icon: <DollarSign size={24} />,
            label: 'Total Spent',
            value: `$${totalAmount.toFixed(2)}`,
            color: 'green'
        },
        {
            icon: <Calendar size={24} />,
            label: 'Total Expenses',
            value: expenseCount,
            color: 'blue'
        },
        {
            icon: <TrendingUp size={24} />,
            label: 'Average Expense',
            value: `$${avgAmount.toFixed(2)}`,
            color: 'orange'
        },
        {
            icon: <PieChartIcon size={24} />,
            label: 'Categories',
            value: categoryCount,
            color: 'purple'
        }
    ];

    return (
        <div className="stats-grid">
            {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                    <div className={`stat-icon ${stat.color}`}>
                        {stat.icon}
                    </div>
                    <div className="stat-info">
                        <p className="stat-value">{stat.value}</p>
                        <p className="stat-label">{stat.label}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatsCards;

