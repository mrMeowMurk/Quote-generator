import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './FavoritesPanel.css';

const FavoritesPanel = ({ favorites, removeFavorite, darkMode, categories = [] }) => {
  const [filter, setFilter] = useState('');
  const filtered = filter
    ? favorites.filter(fav => fav.category === filter)
    : favorites;

  return (
    <motion.div 
      className={`favorites-panel ${darkMode ? 'dark-mode' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="favorites-header">
        <h3>Избранные цитаты</h3>
        <motion.span 
          className="favorites-count"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {filtered.length}
        </motion.span>
      </div>

      {categories.length > 0 && (
        <div className="favorites-filter">
          <select 
            value={filter} 
            onChange={e => setFilter(e.target.value)}
          >
            <option value="">Все категории</option>
            {categories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      )}
      
      <AnimatePresence>
        {filtered.length === 0 ? (
          <motion.div 
            className="empty-favorites"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p>У вас пока нет избранных цитат</p>
            <p className="hint">Добавляйте понравившиеся цитаты, нажимая на звездочку</p>
          </motion.div>
        ) : (
          <motion.div 
            className="favorites-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {filtered.map((fav, index) => (
              <motion.div 
                key={index} 
                className="favorite-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <div className="favorite-content">
                  <p className="quote">"{fav.quote}"</p>
                  <p className="author">— {fav.author}</p>
                </div>
                <div className="favorite-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => removeFavorite(index)}
                    title="Удалить из избранного"
                  >
                    ✕
                  </button>
                  <button 
                    className="share-btn"
                    onClick={() => {
                      const text = encodeURIComponent(`"${fav.quote}" — ${fav.author}`);
                      window.open(`https://t.me/share/url?url=&text=${text}`, '_blank');
                    }}
                    title="Поделиться в Telegram"
                  >
                    ✈️
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FavoritesPanel; 