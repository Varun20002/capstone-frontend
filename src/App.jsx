import React, { useState } from 'react';
import StockPurchaseForm from './components/Stocks/StockPurchaseForm';
import PortfolioSummary from './components/Dashboard/PortfolioSummary';
import StockList from './components/Dashboard/StockList';
import PortfolioCharts from './components/Dashboard/PortfolioCharts';
import SearchBar from './components/Dashboard/SearchBar';
import { playClickSound } from './utils/sound';

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

  const handleStockSelect = (stock) => {
    playClickSound();
    setSelectedStock(stock);
    setCurrentView('details');
  };

  const handleBackToDashboard = () => {
    setSelectedStock(null);
    setCurrentView('dashboard');
  };

  const handleAddStock = (newStock) => {
    // Add to portfolio
    const stockWithId = {
      ...newStock,
      // Ensure we keep the logo from the selected stock data
      logoUrl: selectedStock?.logoUrl || ''
    };

    setStocks(prev => [...prev, stockWithId]);
    
    // Return to dashboard
    setCurrentView('dashboard');
    setSelectedStock(null);
  };

  const handleEdit = (stock) => {
    // For now, let's just log or implement simple edit later if needed
    // The requirement focused on the new Purchase flow
    console.log("Edit stock:", stock);
    alert("Edit functionality to be implemented in next phase");
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
          onSubmit={handleAddStock}
          onBack={handleBackToDashboard}
        />
      )}
    </>
  );
};

export default App;
