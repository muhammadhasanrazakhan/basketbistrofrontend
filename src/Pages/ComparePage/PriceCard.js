import React from 'react';
import { ExternalLink, Tag, CheckCircle, AlertCircle } from 'lucide-react';
import styles from './ComparePage.module.css'; // Hum iski CSS agle step mein banayenge

export const PriceCard = ({ data, isCheapest }) => {
  return (
    <div className={`${styles.priceCard} ${isCheapest ? styles.cheapestCard : ''}`}>
      {isCheapest && (
        <span className={styles.cheapestBadge}>
          <Tag size={12} />
          CHEAPEST
        </span>
      )}
      
      <div className={styles.cardHeader}>
        <div>
          <h3 className={styles.martName}>{data.martName}</h3>
          <p className={styles.productName}>{data.productName}</p>
        </div>
        <div className={styles.price}>
          <span className={styles.currency}>{data.currency}</span>
          {data.price.toLocaleString()}
        </div>
      </div>

      <div className={styles.cardFooter}>
        <span className={data.availability === 'In Stock' ? styles.inStock : styles.checkSite}>
          {data.availability === 'In Stock' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
          {data.availability === 'In Stock' ? 'Available' : 'Check Site'}
        </span>
        
        {/* <a 
          href={data.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.viewStoreLink}
        >
          View Store <ExternalLink size={14} />
        </a> */}
      </div>
    </div>
  );
};
