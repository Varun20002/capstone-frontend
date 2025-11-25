import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowLeft, Info } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

const StockPurchaseForm = ({ stock, onSubmit, onBack, isSubmitting = false, initialValues = null }) => {
  const isEditMode = !!initialValues;
  const [timeframe, setTimeframe] = useState('1D');
  
  // Initialize state with initialValues if in Edit mode, otherwise defaults
  const [quantity, setQuantity] = useState(initialValues?.quantity || 1);
  const [price, setPrice] = useState(initialValues?.purchasePrice || stock?.currentPrice || 0);
  const [date, setDate] = useState(initialValues?.purchaseDate || new Date().toISOString().split('T')[0]);
  
  const chartData = stock?.chartData?.[timeframe] || [];
  const latestPrice = stock?.currentPrice || 0;
  const isPositive = stock?.changePercent >= 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    playClickSound();
    if (quantity > 0 && price > 0) {
      onSubmit({
        // Keep existing ID if editing, else generate new
        stockId: initialValues?.stockId || Date.now().toString(), 
        symbol: stock.symbol,
        companyName: stock.companyName,
        quantity: Number(quantity),
        purchasePrice: Number(price),
        currentPrice: Number(latestPrice), // In real app, this would be fetched live
        purchaseDate: date,
      });
    }
  };

  const styles = {
    container: {
      backgroundColor: '#F5F7FA',
      minHeight: '100vh',
      padding: '24px',
      fontFamily: '"Roboto", sans-serif',
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      fontWeight: '500',
      color: '#44475b',
      marginBottom: '24px',
      padding: 0,
    },
    mainGrid: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: '24px',
      maxWidth: '1200px',
      margin: '0 auto',
    },
    card: {
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '32px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
      marginBottom: '32px',
    },
    logo: {
      width: '64px',
      height: '64px',
      borderRadius: '50%',
      objectFit: 'contain',
      border: '1px solid #ebedf0',
      padding: '4px',
    },
    priceLarge: {
      fontSize: '32px',
      fontWeight: '600',
      color: '#44475b',
    },
    change: {
      fontSize: '16px',
      fontWeight: '500',
      color: isPositive ? '#00d09c' : '#eb5b3c',
      marginTop: '4px',
    },
    chartContainer: {
      height: '400px',
      marginBottom: '32px',
    },
    tabs: {
      display: 'flex',
      gap: '12px',
      marginBottom: '24px',
    },
    tab: (active) => ({
      padding: '6px 16px',
      borderRadius: '16px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      backgroundColor: active ? '#e5fbf5' : 'transparent',
      color: active ? '#00d09c' : '#7c7e8c',
      transition: 'all 0.2s',
    }),
    sectionTitle: {
      fontSize: '18px',
      fontWeight: '600',
      color: '#44475b',
      marginBottom: '16px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    fundamentalsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '20px',
      marginBottom: '32px',
    },
    fundamentalItem: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px',
    },
    fundLabel: {
      fontSize: '12px',
      color: '#7c7e8c',
    },
    fundValue: {
      fontSize: '16px',
      fontWeight: '500',
      color: '#44475b',
    },
    buyPanel: {
      position: 'sticky',
      top: '24px',
      height: 'fit-content',
    },
    inputGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: '500',
      color: '#7c7e8c',
      marginBottom: '8px',
    },
    input: {
      width: '100%',
      padding: '16px',
      fontSize: '18px',
      fontWeight: '500',
      borderRadius: '8px',
      border: '1px solid #ebedf0',
      outline: 'none',
      color: '#44475b',
      boxSizing: 'border-box',
    },
    submitButton: {
      width: '100%',
      padding: '16px',
      backgroundColor: '#00d09c',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: '600',
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      opacity: isSubmitting ? 0.7 : 1,
      marginTop: '12px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <button onClick={() => { playClickSound(); onBack(); }} style={styles.backButton}>
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <div style={styles.mainGrid}>
          {/* Left Column: Details */}
          <div style={styles.card}>
            <div style={styles.header}>
              <img 
                src={stock.logoUrl} 
                alt={stock.symbol} 
                style={styles.logo} 
                onError={(e) => { e.target.src = 'https://via.placeholder.com/64?text=' + stock.symbol[0] }}
              />
              <div>
                <h1 style={{ margin: 0, fontSize: '24px', color: '#44475b' }}>{stock.companyName}</h1>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span style={styles.priceLarge}>₹{latestPrice}</span>
                  <span style={styles.change}>
                    {isPositive ? '+' : ''}{stock.changePercent}% (1D)
                  </span>
                </div>
              </div>
            </div>

            <div style={styles.chartContainer}>
              <div style={styles.tabs}>
                {['1D', '1W', '1M'].map(t => (
                  <button 
                    key={t} 
                    style={styles.tab(timeframe === t)}
                    onClick={() => { playClickSound(); setTimeframe(t); }}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#00d09c" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#00d09c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" hide />
                  <YAxis domain={['auto', 'auto']} hide />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#00d09c" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorVal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div>
              <h3 style={styles.sectionTitle}>Fundamentals</h3>
              <div style={styles.fundamentalsGrid}>
                <div style={styles.fundamentalItem}>
                  <span style={styles.fundLabel}>Market Cap</span>
                  <span style={styles.fundValue}>{stock.marketCap}</span>
                </div>
                <div style={styles.fundamentalItem}>
                  <span style={styles.fundLabel}>P/E Ratio</span>
                  <span style={styles.fundValue}>{stock.peRatio}</span>
                </div>
                <div style={styles.fundamentalItem}>
                  <span style={styles.fundLabel}>Dividend Yield</span>
                  <span style={styles.fundValue}>{stock.dividendYield}</span>
                </div>
                <div style={styles.fundamentalItem}>
                  <span style={styles.fundLabel}>Symbol</span>
                  <span style={styles.fundValue}>{stock.symbol}</span>
                </div>
              </div>

              <h3 style={styles.sectionTitle}><Info size={18}/> About {stock.companyName}</h3>
              <p style={{ color: '#44475b', lineHeight: '1.6', fontSize: '14px' }}>
                {stock.about}
              </p>
            </div>
          </div>

          {/* Right Column: Buy/Edit Panel */}
          <div style={{ ...styles.card, ...styles.buyPanel }}>
            <h3 style={{ ...styles.sectionTitle, marginTop: 0 }}>
              {isEditMode ? `Edit ${stock.symbol}` : `Buy ${stock.symbol}`}
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Quantity (Shares)</label>
                <input 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Price (₹)</label>
                <input 
                  type="number" 
                  step="0.05"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Date</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  style={{ ...styles.input, fontSize: '16px' }}
                />
              </div>

              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                margin: '20px 0',
                padding: '16px',
                backgroundColor: '#f5f7fa',
                borderRadius: '8px'
              }}>
                <span style={{ color: '#7c7e8c' }}>Total Amount</span>
                <span style={{ fontWeight: '600', color: '#44475b' }}>
                  ₹{(quantity * price).toLocaleString('en-IN')}
                </span>
              </div>

              <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : (isEditMode ? 'UPDATE HOLDING' : 'BUY')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

StockPurchaseForm.propTypes = {
  stock: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
  initialValues: PropTypes.shape({
    stockId: PropTypes.string,
    quantity: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    purchasePrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    purchaseDate: PropTypes.string,
  }),
};

export default StockPurchaseForm;
