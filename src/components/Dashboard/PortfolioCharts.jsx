import React from 'react';
import PropTypes from 'prop-types';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = ['#00d09c', '#5367ff', '#ffb900', '#eb5b3c', '#8e44ad', '#34495e', '#e67e22', '#95a5a6'];

const PortfolioCharts = ({ stocks = [] }) => {
  if (!stocks || stocks.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>Charts will appear once you add some stocks.</p>
      </div>
    );
  }

  // Prepare data: Calculate current value for each stock
  const data = stocks.map(stock => ({
    name: stock.symbol,
    value: (Number(stock.quantity) * (Number(stock.currentPrice) || Number(stock.purchasePrice))),
  })).filter(item => item.value > 0);

  const totalValue = data.reduce((acc, item) => acc + item.value, 0);

  if (totalValue === 0) {
     return (
      <div style={styles.emptyContainer}>
        <p style={styles.emptyText}>Portfolio value is zero. Add stocks to see allocation.</p>
      </div>
    );
  }

  // Custom Legend Component for Groww-style look
  const renderLegend = (props) => {
    const { payload } = props;
    return (
      <ul style={styles.legendList}>
        {payload.map((entry, index) => (
          <li key={`item-${index}`} style={styles.legendItem}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ ...styles.legendDot, backgroundColor: entry.color }}></span>
              <span style={styles.legendText}>{entry.value}</span>
            </div>
            <span style={styles.legendPercent}>
              {((entry.payload.value / totalValue) * 100).toFixed(1)}%
            </span>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div style={styles.card}>
      <h3 style={styles.title}>Portfolio Allocation</h3>
      <div style={styles.chartWrapper}>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value)}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            />
            <Legend 
              content={renderLegend} 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              wrapperStyle={{
                right: 0,
                top: '50%',
                transform: 'translate(0, -50%)',
                width: '45%' // Ensure legend takes appropriate space
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
    padding: '24px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: '"Roboto", sans-serif',
  },
  title: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#44475b',
    marginBottom: '24px',
    marginTop: 0,
  },
  emptyContainer: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    textAlign: 'center',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
  },
  emptyText: {
    color: '#7c7e8c',
    fontSize: '14px',
  },
  chartWrapper: {
    width: '100%',
    minHeight: '300px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  legendList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxHeight: '200px',
    overflowY: 'auto',
  },
  legendItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '13px',
    color: '#44475b',
    width: '100%', 
  },
  legendDot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    marginRight: '8px',
    display: 'inline-block',
    flexShrink: 0,
  },
  legendText: {
    fontWeight: '500',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxWidth: '90px', // Prevent text from pushing layout
  },
  legendPercent: {
    color: '#7c7e8c',
    fontSize: '12px',
    marginLeft: '8px',
    flexShrink: 0,
  },
};

PortfolioCharts.propTypes = {
  stocks: PropTypes.array,
};

export default PortfolioCharts;
