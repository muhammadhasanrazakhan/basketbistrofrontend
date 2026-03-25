import React, { useState, useCallback } from 'react';
import { Search, ShoppingBag, Loader2, ArrowRight, History, Info, MapPin, Tag, ExternalLink } from 'lucide-react';
import { comparisonService } from '../../Services/geminiService';
import { PriceCard } from './PriceCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import styles from './ComparePage.module.css';

const Compare = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = useCallback(async (e, searchQuery) => {
    const finalQuery = searchQuery || query;
    if (e) e.preventDefault();
    if (!finalQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await comparisonService.comparePrices(finalQuery);
      setResult(data);
      if (!history.includes(finalQuery)) {
        setHistory(prev => [finalQuery, ...prev].slice(0, 5));
      }
    } catch (err) {
      setError(err.message || "Failed to fetch prices. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [query, history]);

  return (
    <div className={styles.comparePageContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.titleWrapper}>
            <div className={styles.titleIcon}>
              <ShoppingBag size={28} />
            </div>
            <h1 className={styles.title}>KHI-MART COMPARE</h1>
          </div>
          
          <p className={styles.subtitle}>
            Compare prices across Imtiaz, Naheed, Chase Up, and more in Karachi instantly with local stores in your area.
          </p>

          <form onSubmit={handleSearch} className={styles.searchForm}>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="E.g. Dalda Cooking Oil 5 Litre, Tapal Danedar 450g..."
              className={styles.searchInput}
            />
            <Search className={styles.searchIcon} size={24} />
            <button type="submit" disabled={loading} className={styles.searchButton}>
              {loading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
            </button>
          </form>

          {history.length > 0 && (
            <div className={styles.historyContainer}>
              <span className={styles.historyTitle}><History size={14} /> Recent:</span>
              {history.map((h, i) => (
                <button key={i} onClick={() => { setQuery(h); handleSearch(undefined, h); }} className={styles.historyItem}>
                  {h}
                </button>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        {error && (
          <div className={styles.errorBanner}><Info size={20} /> {error}</div>
        )}

        {loading && (
          <div className={styles.loadingContainer}>
            <div className={styles.spinnerWrapper}>
              <div className={styles.spinner}></div>
              <ShoppingBag className={styles.spinnerIcon} size={32} />
            </div>
            <h2 className={styles.loadingTitle}>Finding  Prices...</h2>
            <p className={styles.loadingSubtitle}>
              We're scanning major Karachi super marts to find that product for you.
            </p>
          </div>
        )}

        {result && !loading && (
          <div className={styles.resultsContainer}>
            {/* {result.cheapest && (
              <div className={styles.insightsBanner}>
                <div className={styles.insightsText}>
                  <div className={styles.insightsIconWrapper}><Tag size={32} /></div>
                  <div>
                    <h3 className={styles.insightsTitle}>Top Recommendation</h3>
                    <p className={styles.insightsDetail}>
                      Get it at <span className={styles.underline}>{result.cheapest.martName}</span> for PKR {result.cheapest.price.toLocaleString()}
                    </p>
                  </div>
                </div>
                <a href={result.cheapest.url} target="_blank" rel="noopener noreferrer" className={styles.buyNowButton}>
                  Buy Now <ArrowRight size={20} />
                </a>
              </div>
            )} */}

            <div className={styles.statsAndChartGrid}>
              <div className={styles.chartContainer}>
                <h3 className={styles.sectionTitle}>Price Trends <span className={styles.sectionSubtitle}>(Across Markets)</span></h3>
                <div style={{height: '256px', width: '100%'}}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={result.prices} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="martName" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 600, fill: '#64748b'}} dy={10} />
                      <YAxis hide domain={['dataMin - 100', 'dataMax + 100']} />
                      <Tooltip 
                        cursor={{fill: '#f8fafc'}}
                        contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'}}
                        formatter={(value) => [`PKR ${value}`, 'Price']}
                      />
                      <Bar dataKey="price" radius={[8, 8, 0, 0]} barSize={40}>
                        {result.prices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.martName === result.cheapest?.martName ? '#059669' : '#4f46e5'} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className={styles.summaryContainer}>
                <div>
                  <h3 className={styles.sectionTitle}>Price Summary</h3>
                  <div className={styles.summaryDetails}>
                    <div className={styles.summaryRow}><span>Average Price</span><strong>PKR {(result.prices.reduce((acc, p) => acc + p.price, 0) / result.prices.length).toFixed(0).toLocaleString()}</strong></div>
                    <div className={styles.summaryRow}><span>Price Range</span><strong>PKR {Math.min(...result.prices.map(p => p.price)).toLocaleString()} - {Math.max(...result.prices.map(p => p.price)).toLocaleString()}</strong></div>
                    <div className={styles.summaryRow}><span>Available At</span><strong>{result.prices.length} Stores</strong></div>
                  </div>
                </div>
                <div className={styles.disclaimerBox}>
                  <MapPin size={18} />
                  <p>Prices are collected for Karachi area stores. Availability might vary by specific branch.</p>
                </div>
              </div>
            </div>

            <div className={styles.priceCardsGrid}>
              {result.prices.map((price, idx) => (
                <PriceCard key={idx} data={price} isCheapest={price.martName === result.cheapest?.martName} />
              ))}
            </div>

            <div className={styles.aiAnalysisContainer}>
              <h3 className={styles.aiAnalysisTitle}><Info size={24} /> AI Market Analysis</h3>
              <div className={styles.aiAnalysisBody}>
                {result.summary.split('\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className={styles.groundingSourcesContainer}>
                <h4 className={styles.groundingSourcesTitle}>Search Grounding Sources</h4>
                <div className={styles.groundingSourcesLinks}>
                  {result.groundingSources.map((source, i) => (
                    <a key={i} href={source.uri} target="_blank" rel="noopener noreferrer" className={styles.sourceLink}>
                      <ExternalLink size={10} /> {source.title}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {!result && !loading && (
           <div className={styles.welcomeContainer}>
            <div className={styles.welcomeIconWrapper}><Search size={48} /></div>
            <h2 className={styles.welcomeTitle}>Start Comparing Today</h2>
            <p className={styles.welcomeSubtitle}>
              Stop overpaying! Search for any grocery item to find where it's cheapest in Karachi, and also compare it with local stores in your area.
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Compare;
