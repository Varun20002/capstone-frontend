import React, { useState } from 'react';
import StockPurchaseForm from './components/Stocks/StockPurchaseForm';
import PortfolioSummary from './components/Dashboard/PortfolioSummary';
import StockList from './components/Dashboard/StockList';
import PortfolioCharts from './components/Dashboard/PortfolioCharts';
import SearchBar from './components/Dashboard/SearchBar';
import { playClickSound } from './utils/sound';
import { MOCK_STOCKS } from './data/mockStocks';

const App = () => {
  // Mock Data for User Portfolio
  const [stocks, setStocks] = useState([
    {
      stockId: '1',
      symbol: 'TATASTEEL',
      companyName: 'Tata Steel Ltd.',
      quantity: 100,
      purchasePrice: 110.50,
      currentPrice: 125.00,
      purchaseDate: '2023-10-15',
      logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500470.png',
    },
    {
      stockId: '2',
      symbol: 'RELIANCE',
      companyName: 'Reliance Industries',
      quantity: 50,
      purchasePrice: 2400.00,
      currentPrice: 2350.00,
      purchaseDate: '2023-11-01',
      logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500325.png',
    },
    {
      stockId: '3',
      symbol: 'HDFCBANK',
      companyName: 'HDFC Bank',
      quantity: 25,
      purchasePrice: 1500.00,
      currentPrice: 1550.00,
      purchaseDate: '2023-09-20',
      logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500180.png',
    }
  ]);

  // View State: 'dashboard' | 'details'
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedStock, setSelectedStock] = useState(null);
  const [editingHolding, setEditingHolding] = useState(null);

  const handleStockSelect = (stock) => {
    playClickSound();
    setSelectedStock(stock);
    setEditingHolding(null); // Clear edit state if new search
    setCurrentView('details');
  };

  const handleBackToDashboard = () => {
    playClickSound();
    setSelectedStock(null);
    setEditingHolding(null);
    setCurrentView('dashboard');
  };

  const handleStockFormSubmit = (submittedData) => {
    // If we have an editingHolding, we are updating an existing record
    if (editingHolding) {
      setStocks(prev => prev.map(s => 
        s.stockId === submittedData.stockId ? { ...submittedData, logoUrl: s.logoUrl } : s
      ));
    } else {
      // Add new to portfolio
      const stockWithId = {
        ...submittedData,
        // Ensure we keep the logo from the selected stock data
        logoUrl: selectedStock?.logoUrl || ''
      };
      setStocks(prev => [...prev, stockWithId]);
    }
    
    // Return to dashboard
    handleBackToDashboard();
  };

  const handleEdit = (portfolioItem) => {
    playClickSound();
    
    // 1. Find the full static data (chart, about) from MOCK_STOCKS based on symbol
    const staticData = MOCK_STOCKS.find(s => s.symbol === portfolioItem.symbol);
    
    // 2. If found, use it. If not (edge case), construct a minimal object so the UI doesn't crash.
    const fullStockData = staticData || {
      ...portfolioItem,
      chartData: {}, 
      about: 'Description not available for this stock.',
      marketCap: '-',
      peRatio: '-',
      dividendYield: '-',
      changePercent: 0
    };

    setSelectedStock(fullStockData);
    setEditingHolding(portfolioItem); // Pass the portfolio specific data (qty, price)
    setCurrentView('details');
  };

  const handleDelete = (stockId) => {
    if (window.confirm('Are you sure you want to delete this stock?')) {
      playClickSound();
      setStocks(stocks.filter(s => s.stockId !== stockId));
    }
  };

  return (
    <>
      {currentView === 'dashboard' && (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '24px' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <h1 style={{ fontSize: '24px', color: '#44475b', margin: 0 }}>My Portfolio</h1>
            <SearchBar onSelectStock={handleStockSelect} />
          </header>

          <PortfolioSummary stocks={stocks} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px', marginTop: '24px' }}>
            <div style={{ gridColumn: 'span 2' }}>
              <StockList 
                stocks={stocks} 
                onEdit={handleEdit} 
                onDelete={handleDelete} 
              />
            </div>
            <div style={{ gridColumn: 'span 1' }}>
              <PortfolioCharts stocks={stocks} />
            </div>
          </div>
        </div>
      )}

      {currentView === 'details' && selectedStock && (
        <StockPurchaseForm 
          stock={selectedStock} 
          initialValues={editingHolding}
          onSubmit={handleStockFormSubmit}
          onBack={handleBackToDashboard}
        />
      )}
    </>
  );
};

export default App;
