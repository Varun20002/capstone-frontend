import React from 'react';
import PropTypes from 'prop-types';
import { Edit2, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { playClickSound } from '../../utils/sound';

const StockList = ({ stocks = [], onEdit, onDelete, isLoading, error }) => {
  
  const formatCurrency = (val) => 
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(val);

  const handleEditClick = (stock) => {
    playClickSound();
    onEdit(stock);
  };

  const handleDeleteClick = (stockId) => {
    playClickSound();
    onDelete(stockId);
  };

  if (isLoading) {
    return (
      <div style={styles.centerMessage}>
        <div className="spinner"></div>
        <p style={{ color: '#7c7e8c', marginTop: '16px' }}>Loading your holdings...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={styles.errorBanner}>
        <p>{error}</p>
      </div>
    );
  }

  if (!stocks || stocks.length === 0) {
    return (
      <div style={styles.centerMessage}>
        <div style={styles.emptyIcon}>🌱</div>
        <h3 style={{ color: '#44475b' }}>Nothing here yet</h3>
        <p style={{ color: '#7c7e8c' }}>Add your first stock to get started.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Injecting CSS for responsive behavior */}
      <style>{`
        .stock-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px; /* Force scroll on very small if table used */
        }
        .stock-table th {
          text-align: left;
          padding: 16px;
          color: #7c7e8c;
          font-size: 12px;
          font-weight: 500;
          border-bottom: 1px solid #ebedf0;
        }
        .stock-table td {
          padding: 16px;
          border-bottom: 1px solid #ebedf0;
          color: #44475b;
          font-size: 14px;
          font-weight: 500;
        }
        .stock-table tr:last-child td {
          border-bottom: none;
        }
        .stock-table tr:hover {
          background-color: #f9fafb;
        }
        
        .desktop-view {
          display: block;
          overflow-x: auto;
          background: white;
          border-radius: 12px;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
        }
        .mobile-view {
          display: none;
        }

        @media (max-width: 768px) {
          .desktop-view {
            display: none;
          }
          .mobile-view {
            display: flex;
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>

      {/* Desktop Table View */}
      <div className="desktop-view">
        <table className="stock-table">
          <thead>
            <tr>
              <th>COMPANY</th>
              <th>QTY</th>
              <th>AVG. PRICE</th>
              <th>LTP</th>
              <th>CUR. VALUE</th>
              <th>P&L</th>
              <th style={{ textAlign: 'right' }}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => {
              const quantity = Number(stock.quantity);
              const purchasePrice = Number(stock.purchasePrice);
              const currentPrice = Number(stock.currentPrice) || purchasePrice; // Fallback if no live data
              
              const totalInvestment = quantity * purchasePrice;
              const currentValue = quantity * currentPrice;
              const gainLoss = currentValue - totalInvestment;
              const gainLossPercent = totalInvestment > 0 ? (gainLoss / totalInvestment) * 100 : 0;
              const isPositive = gainLoss >= 0;

              return (
                <tr key={stock.stockId || stock.symbol}>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                      <span style={{ fontWeight: '600' }}>{stock.symbol}</span>
                      <span style={{ fontSize: '12px', color: '#7c7e8c' }}>{stock.companyName}</span>
                    </div>
                  </td>
                  <td>{quantity}</td>
                  <td>{formatCurrency(purchasePrice)}</td>
                  <td>
                    <span style={{ fontWeight: '600' }}>{formatCurrency(currentPrice)}</span>
                  </td>
                  <td>{formatCurrency(currentValue)}</td>
                  <td>
                    <div style={{ color: isPositive ? '#00d09c' : '#eb5b3c' }}>
                      <div>{formatCurrency(gainLoss)}</div>
                      <div style={{ fontSize: '11px' }}>({gainLossPercent.toFixed(2)}%)</div>
                    </div>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <button style={styles.actionButton} onClick={() => handleEditClick(stock)} title="Edit">
                      <Edit2 size={16} />
                    </button>
                    <button style={{ ...styles.actionButton, color: '#eb5b3c' }} onClick={() => handleDeleteClick(stock.stockId)} title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="mobile-view">
        {stocks.map((stock) => {
          const quantity = Number(stock.quantity);
          const purchasePrice = Number(stock.purchasePrice);
          const currentPrice = Number(stock.currentPrice) || purchasePrice;
          const currentValue = quantity * currentPrice;
          const gainLoss = currentValue - (quantity * purchasePrice);
          const isPositive = gainLoss >= 0;

          return (
            <div key={stock.stockId || stock.symbol} style={styles.mobileCard}>
              <div style={styles.cardHeader}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{stock.symbol}</div>
                  <div style={{ fontSize: '12px', color: '#7c7e8c' }}>{stock.companyName}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 'bold' }}>{formatCurrency(currentValue)}</div>
                  <div style={{ fontSize: '12px', color: isPositive ? '#00d09c' : '#eb5b3c' }}>
                    {isPositive ? '+' : ''}{formatCurrency(gainLoss)}
                  </div>
                </div>
              </div>
              <div style={styles.cardDivider} />
              <div style={styles.cardDetails}>
                <div>
                  <span style={styles.detailLabel}>Qty:</span> {quantity}
                </div>
                <div>
                  <span style={styles.detailLabel}>Avg:</span> {formatCurrency(purchasePrice)}
                </div>
                <div>
                  <span style={styles.detailLabel}>LTP:</span> {formatCurrency(currentPrice)}
                </div>
              </div>
              <div style={styles.cardActions}>
                <button style={styles.mobileBtn} onClick={() => handleEditClick(stock)}>Edit</button>
                <button style={{ ...styles.mobileBtn, color: '#eb5b3c' }} onClick={() => handleDeleteClick(stock.stockId)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    fontFamily: '"Roboto", sans-serif',
  },
  centerMessage: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.04)',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  errorBanner: {
    backgroundColor: '#fdecea',
    color: '#eb5b3c',
    padding: '16px',
    borderRadius: '8px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  actionButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    color: '#7c7e8c',
    transition: 'color 0.2s',
  },
  mobileCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '16px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '12px',
  },
  cardDivider: {
    height: '1px',
    backgroundColor: '#ebedf0',
    margin: '8px 0',
  },
  cardDetails: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#44475b',
    marginBottom: '12px',
  },
  detailLabel: {
    color: '#7c7e8c',
    marginRight: '4px',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px',
  },
  mobileBtn: {
    background: 'none',
    border: 'none',
    color: '#00d09c',
    fontWeight: '600',
    fontSize: '14px',
    padding: '4px 8px',
    cursor: 'pointer',
  }
};

StockList.propTypes = {
  stocks: PropTypes.array,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default StockList;
