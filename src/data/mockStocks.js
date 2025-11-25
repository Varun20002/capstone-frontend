export const MOCK_STOCKS = [
  {
    id: 'RELIANCE',
    symbol: 'RELIANCE',
    companyName: 'Reliance Industries Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500325.png',
    currentPrice: 2350.00,
    changePercent: 1.2,
    marketCap: '₹15.8T',
    peRatio: 24.5,
    dividendYield: '0.3%',
    about: 'Reliance Industries Limited is an Indian multinational conglomerate headquartered in Mumbai. It has diverse businesses including energy, petrochemicals, natural gas, retail, telecommunications, mass media, and textiles.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 2340 + Math.random() * 20 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 2300 + Math.random() * 100 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 2200 + Math.random() * 200 }))
    }
  },
  {
    id: 'TCS',
    symbol: 'TCS',
    companyName: 'Tata Consultancy Services',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK532540.png',
    currentPrice: 3450.00,
    changePercent: -0.5,
    marketCap: '₹12.5T',
    peRatio: 30.2,
    dividendYield: '1.4%',
    about: 'Tata Consultancy Services is an Indian multinational information technology services and consulting company headquartered in Mumbai.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 3440 + Math.random() * 20 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 3400 + Math.random() * 100 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 3300 + Math.random() * 200 }))
    }
  },
  {
    id: 'HDFCBANK',
    symbol: 'HDFCBANK',
    companyName: 'HDFC Bank Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500180.png',
    currentPrice: 1550.00,
    changePercent: 0.8,
    marketCap: '₹8.9T',
    peRatio: 19.8,
    dividendYield: '1.1%',
    about: 'HDFC Bank Limited is an Indian banking and financial services company headquartered in Mumbai.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 1540 + Math.random() * 20 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 1500 + Math.random() * 80 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 1450 + Math.random() * 150 }))
    }
  },
  {
    id: 'INFY',
    symbol: 'INFY',
    companyName: 'Infosys Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500209.png',
    currentPrice: 1420.00,
    changePercent: 1.5,
    marketCap: '₹5.8T',
    peRatio: 22.4,
    dividendYield: '2.2%',
    about: 'Infosys Limited is an Indian multinational information technology company that provides business consulting, information technology and outsourcing services.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 1410 + Math.random() * 20 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 1380 + Math.random() * 60 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 1350 + Math.random() * 100 }))
    }
  },
  {
    id: 'ICICIBANK',
    symbol: 'ICICIBANK',
    companyName: 'ICICI Bank Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK532174.png',
    currentPrice: 950.00,
    changePercent: 0.3,
    marketCap: '₹6.5T',
    peRatio: 18.5,
    dividendYield: '0.8%',
    about: 'ICICI Bank Limited is an Indian multinational bank and financial services company headquartered in Mumbai.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 945 + Math.random() * 10 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 930 + Math.random() * 30 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 900 + Math.random() * 80 }))
    }
  },
  {
    id: 'HUL',
    symbol: 'HUL',
    companyName: 'Hindustan Unilever Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500696.png',
    currentPrice: 2500.00,
    changePercent: -0.2,
    marketCap: '₹5.9T',
    peRatio: 55.6,
    dividendYield: '1.5%',
    about: 'Hindustan Unilever Limited is an Indian consumer goods company headquartered in Mumbai. It is a subsidiary of the British company Unilever.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 2490 + Math.random() * 20 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 2480 + Math.random() * 40 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 2450 + Math.random() * 80 }))
    }
  },
  {
    id: 'ITC',
    symbol: 'ITC',
    companyName: 'ITC Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500875.png',
    currentPrice: 440.00,
    changePercent: 0.5,
    marketCap: '₹5.4T',
    peRatio: 26.8,
    dividendYield: '2.8%',
    about: 'ITC Limited is an Indian conglomerate company headquartered in Kolkata. It has a diversified presence in FMCG, Hotels, Packaging, Paperboards & Specialty Papers and Agri-Business.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 438 + Math.random() * 4 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 435 + Math.random() * 10 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 420 + Math.random() * 30 }))
    }
  },
  {
    id: 'SBIN',
    symbol: 'SBIN',
    companyName: 'State Bank of India',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500112.png',
    currentPrice: 580.00,
    changePercent: 1.1,
    marketCap: '₹5.1T',
    peRatio: 10.2,
    dividendYield: '1.9%',
    about: 'State Bank of India is an Indian multinational public sector bank and financial services statutory body headquartered in Mumbai.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 575 + Math.random() * 10 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 560 + Math.random() * 30 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 550 + Math.random() * 50 }))
    }
  },
  {
    id: 'BHARTIARTL',
    symbol: 'BHARTIARTL',
    companyName: 'Bharti Airtel Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK532454.png',
    currentPrice: 880.00,
    changePercent: -0.4,
    marketCap: '₹4.9T',
    peRatio: 58.4,
    dividendYield: '0.5%',
    about: 'Bharti Airtel Limited, also known as Airtel, is an Indian multinational telecommunications services company based in New Delhi.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 875 + Math.random() * 10 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 860 + Math.random() * 30 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 850 + Math.random() * 50 }))
    }
  },
  {
    id: 'KOTAKBANK',
    symbol: 'KOTAKBANK',
    companyName: 'Kotak Mahindra Bank Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500247.png',
    currentPrice: 1780.00,
    changePercent: 0.2,
    marketCap: '₹3.5T',
    peRatio: 22.1,
    dividendYield: '0.1%',
    about: 'Kotak Mahindra Bank Limited is an Indian banking and financial services company headquartered in Mumbai.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 1770 + Math.random() * 20 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 1760 + Math.random() * 40 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 1750 + Math.random() * 60 }))
    }
  },
  {
    id: 'LT',
    symbol: 'LT',
    companyName: 'Larsen & Toubro Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500510.png',
    currentPrice: 2950.00,
    changePercent: 0.9,
    marketCap: '₹4.1T',
    peRatio: 35.2,
    dividendYield: '0.8%',
    about: 'Larsen & Toubro Limited is an Indian multinational conglomerate company, with business interests in engineering, construction, manufacturing, technology and financial services.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 2940 + Math.random() * 20 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 2900 + Math.random() * 80 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 2850 + Math.random() * 150 }))
    }
  },
  {
    id: 'AXISBANK',
    symbol: 'AXISBANK',
    companyName: 'Axis Bank Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK532215.png',
    currentPrice: 980.00,
    changePercent: 0.6,
    marketCap: '₹3.0T',
    peRatio: 14.5,
    dividendYield: '0.1%',
    about: 'Axis Bank Limited is an Indian banking and financial services company headquartered in Mumbai.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 975 + Math.random() * 10 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 960 + Math.random() * 30 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 940 + Math.random() * 60 }))
    }
  },
  {
    id: 'MARUTI',
    symbol: 'MARUTI',
    companyName: 'Maruti Suzuki India Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK532500.png',
    currentPrice: 10400.00,
    changePercent: 0.4,
    marketCap: '₹3.1T',
    peRatio: 28.9,
    dividendYield: '0.9%',
    about: 'Maruti Suzuki India Limited is the Indian subsidiary of Japanese automaker Suzuki Motor Corporation.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 10350 + Math.random() * 100 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 10200 + Math.random() * 300 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 10000 + Math.random() * 600 }))
    }
  },
  {
    id: 'TATASTEEL',
    symbol: 'TATASTEEL',
    companyName: 'Tata Steel Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK500470.png',
    currentPrice: 125.00,
    changePercent: -0.8,
    marketCap: '₹1.5T',
    peRatio: 8.5,
    dividendYield: '2.9%',
    about: 'Tata Steel Limited is an Indian multinational steel-making company, based in Jamshedpur, Jharkhand and headquartered in Mumbai.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 124 + Math.random() * 2 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 122 + Math.random() * 5 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 118 + Math.random() * 10 }))
    }
  },
  {
    id: 'WIPRO',
    symbol: 'WIPRO',
    companyName: 'Wipro Ltd',
    logoUrl: 'https://assets-netstorage.groww.in/stock-assets/logos/GSTK507685.png',
    currentPrice: 410.00,
    changePercent: 0.1,
    marketCap: '₹2.2T',
    peRatio: 19.2,
    dividendYield: '0.2%',
    about: 'Wipro Limited is an Indian multinational corporation that provides information technology, consultant and business process services.',
    chartData: {
      '1D': Array.from({ length: 20 }, (_, i) => ({ time: `${9 + Math.floor(i/2)}:${i%2===0?'00':'30'}`, value: 408 + Math.random() * 4 })),
      '1W': Array.from({ length: 7 }, (_, i) => ({ time: `Day ${i+1}`, value: 405 + Math.random() * 10 })),
      '1M': Array.from({ length: 30 }, (_, i) => ({ time: `Day ${i+1}`, value: 400 + Math.random() * 20 }))
    }
  }
];

