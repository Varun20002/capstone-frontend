import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Search } from 'lucide-react';
import { MOCK_STOCKS } from '../../data/mockStocks';

const SearchBar = ({ onSelectStock }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsExpanded(false);
        setResults([]);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim().length > 0) {
      const filtered = MOCK_STOCKS.filter(stock => 
        stock.symbol.toLowerCase().includes(value.toLowerCase()) ||
        stock.companyName.toLowerCase().includes(value.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  const handleSelect = (stock) => {
    onSelectStock(stock);
    setQuery('');
    setResults([]);
    setIsExpanded(false);
  };

  const styles = {
    wrapper: {
      position: 'relative',
      zIndex: 100,
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: `1px solid ${isExpanded ? '#00d09c' : '#ebedf0'}`,
      padding: '8px 16px',
      width: isExpanded ? '400px' : '240px',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      boxShadow: isExpanded ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
    },
    icon: {
      color: '#7c7e8c',
      marginRight: '12px',
    },
    input: {
      border: 'none',
      outline: 'none',
      fontSize: '14px',
      width: '100%',
      color: '#44475b',
      backgroundColor: 'transparent',
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      marginTop: '8px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.1)',
      border: '1px solid #ebedf0',
      maxHeight: '400px',
      overflowY: 'auto',
      display: results.length > 0 ? 'block' : 'none',
    },
    resultItem: {
      padding: '12px 16px',
      borderBottom: '1px solid #f0f0f0',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      transition: 'background 0.2s',
    },
    itemHover: {
      backgroundColor: '#f5f7fa',
    },
    symbol: {
      fontWeight: '600',
      color: '#44475b',
      fontSize: '14px',
    },
    company: {
      fontSize: '12px',
      color: '#7c7e8c',
      marginTop: '2px',
    },
    price: {
      fontWeight: '500',
      fontSize: '14px',
      color: '#44475b',
    }
  };

  return (
    <div ref={wrapperRef} style={styles.wrapper}>
      <div 
        style={styles.container}
        onFocus={() => setIsExpanded(true)}
        onClick={() => setIsExpanded(true)}
      >
        <Search size={20} style={styles.icon} />
        <input
          type="text"
          placeholder="Search stocks, etfs..."
          value={query}
          onChange={handleSearch}
          style={styles.input}
        />
      </div>

      {results.length > 0 && (
        <div style={styles.dropdown}>
          {results.map((stock) => (
            <div
              key={stock.id}
              style={styles.resultItem}
              onClick={() => handleSelect(stock)}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img 
                  src={stock.logoUrl} 
                  alt={stock.symbol} 
                  style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'contain', backgroundColor: '#f5f5f5' }}
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/32?text=' + stock.symbol[0] }}
                />
                <div>
                  <div style={styles.symbol}>{stock.symbol}</div>
                  <div style={styles.company}>{stock.companyName}</div>
                </div>
              </div>
              <div style={styles.price}>
                ₹{stock.currentPrice.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

SearchBar.propTypes = {
  onSelectStock: PropTypes.func.isRequired,
};

export default SearchBar;

