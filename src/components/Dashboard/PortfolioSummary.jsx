import React from 'react';
import PropTypes from 'prop-types';
import { ArrowUp, ArrowDown, Minus } from 'lucide-react';

const PortfolioSummary = ({ stocks = [] }) => {
  // Calculations
  const metrics = stocks.reduce((acc, stock) => {
    const quantity = Number(stock.quantity) || 0;
    const purchasePrice = Number(stock.purchasePrice) || 0;
    const currentPrice = Number(stock.currentPrice) || 0; // Assuming currentPrice is passed or updated in stock object

    const investment = quantity * purchasePrice;
    const currentValue = quantity * currentPrice;

    acc.totalInvestment += investment;
    acc.totalCurrentValue += currentValue;
    return acc;
  }, { totalInvestment: 0, totalCurrentValue: 0 });

  const totalGainLoss = metrics.totalCurrentValue - metrics.totalInvestment;
  const percentageChange = metrics.totalInvestment > 0
    ? (totalGainLoss / metrics.totalInvestment) * 100
    : 0;

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Styles
  const styles = {
    container: {
      display: 'flex',
      flexWrap: 'wrap', // responsive wrapping
      gap: '20px',
      marginBottom: '32px',
      justifyContent: 'space-between',
    },
    card: {
      flex: '1 1 300px', // Grow and shrink, base 300px
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 2px 12px rgba(0, 0, 0, 0.04)',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      border: '1px solid #f0f0f0',
    },
    label: {
      fontSize: '14px',
      color: '#7c7e8c',
      fontWeight: '500',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    value: {
      fontSize: '28px',
      fontWeight: '600',
      color: '#44475b',
    },
    gainLossContainer: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '28px',
      fontWeight: '600',
    },
    positive: {
      color: '#00d09c',
    },
    negative: {
      color: '#eb5b3c',
    },
    neutral: {
      color: '#7c7e8c',
    },
    subText: {
      fontSize: '14px',
      fontWeight: '500',
      marginLeft: '8px',
    }
  };

  const isPositive = totalGainLoss > 0;
  const isNegative = totalGainLoss < 0;
  
  const gainLossColor = isPositive ? styles.positive : (isNegative ? styles.negative : styles.neutral);
  const Icon = isPositive ? ArrowUp : (isNegative ? ArrowDown : Minus);

  if (stocks.length === 0) {
    return (
      <div style={{ ...styles.card, flex: '1 1 100%', alignItems: 'center', padding: '40px' }}>
        <h3 style={{ color: '#44475b', margin: 0 }}>Your Portfolio Summary</h3>
        <p style={{ color: '#7c7e8c', marginTop: '8px' }}>Start adding stocks to see your portfolio summary.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Current Value */}
      <div style={styles.card}>
        <div style={styles.label}>Current Value</div>
        <div style={styles.value}>
          {formatCurrency(metrics.totalCurrentValue)}
        </div>
      </div>

      {/* Total Investment */}
      <div style={styles.card}>
        <div style={styles.label}>Total Investment</div>
        <div style={styles.value}>
          {formatCurrency(metrics.totalInvestment)}
        </div>
      </div>

      {/* Total Gain/Loss */}
      <div style={styles.card}>
        <div style={styles.label}>Total Returns</div>
        <div style={{ ...styles.gainLossContainer, ...gainLossColor }}>
          <span>{formatCurrency(Math.abs(totalGainLoss))}</span>
          <span style={styles.subText}>({Math.abs(percentageChange).toFixed(2)}%)</span>
          <Icon size={20} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};

PortfolioSummary.propTypes = {
  stocks: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      purchasePrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      currentPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
};

export default PortfolioSummary;

