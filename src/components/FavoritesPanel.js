import React, { useState } from 'react';
import '../styles/FavoritesPanel.css';

const FavoritesPanel = ({ favorites, removeFavorite, darkMode, categories = [] }) => {
  const [filter, setFilter] = useState('');
  const filtered = filter
    ? favorites.filter(fav => fav.category === filter)
    : favorites;

  return (
    <div className={`favorites-panel ${darkMode ? 'dark-mode' : ''}`}>
      <div className="favorites-header">
        <h3>Избранные цитаты</h3>
        <span className="favorites-count">{filtered.length}</span>
      </div>
      {categories.length > 0 && (
        <div style={{marginBottom: '1rem'}}>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="">Все категории</option>
            {categories.map(cat => (
              <option key={cat.name} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>
      )}
      <div className="favorites-list">
        {filtered.length === 0 ? (
          <div className="empty-favorites">
            <p>У вас пока нет избранных цитат</p>
            <p className="hint">Добавляйте понравившиеся цитаты, нажимая на звездочку</p>
          </div>
        ) : (
          <div className="favorites-grid">
            {filtered.map((fav, index) => (
              <div key={index} className="favorite-card">
                <div className="favorite-content">
                  <p className="quote">"{fav.quote}"</p>
                  <p className="author">- {fav.author}</p>
                </div>
                <div className="favorite-actions">
                  <button 
                    className="remove-btn"
                    onClick={() => removeFavorite(index)}
                    title="Удалить из избранного"
                  >
                    ×
                  </button>
                  <button 
                    className="share-btn"
                    onClick={() => {
                      const text = encodeURIComponent(`"${fav.quote}" - ${fav.author}`);
                      window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
                    }}
                    title="Поделиться в Twitter"
                  >
                    🐦
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPanel; 