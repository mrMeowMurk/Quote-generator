import React, { useState } from 'react';
import '../styles/Sidebar.css';

const Sidebar = ({
  favorites,
  history,
  removeFavorite,
  onSelectQuote,
  categories = [],
  darkMode,
  style
}) => {
  const [tab, setTab] = useState('favorites');
  const [filter, setFilter] = useState('');
  const list = tab === 'favorites' ? favorites : history;
  const filtered = filter
    ? list.filter(item => item.category === filter)
    : list;

  const EmptyState = () => (
    <div className="sidebar-empty">
      {tab === 'favorites' ? (
        <>
          <span className="empty-icon">⭐</span>
          <h3>Нет избранных цитат</h3>
          <p>Добавляйте понравившиеся цитаты, нажимая на кнопку "В избранное"</p>
        </>
      ) : (
        <>
          <span className="empty-icon">📜</span>
          <h3>История пуста</h3>
          <p>Здесь будут отображаться просмотренные цитаты</p>
        </>
      )}
    </div>
  );

  return (
    <aside className={`sidebar${darkMode ? ' dark-mode' : ''}`} style={style}> 
      <div className="sidebar-header">
        <div className="sidebar-tabs">
          <button 
            className={`tab-button ${tab === 'favorites' ? 'active' : ''}`}
            onClick={() => setTab('favorites')}
          >
            <span className="tab-icon">⭐</span>
            <span className="tab-text">Избранное</span>
            {favorites.length > 0 && <span className="tab-count">{favorites.length}</span>}
          </button>
          <button 
            className={`tab-button ${tab === 'history' ? 'active' : ''}`}
            onClick={() => setTab('history')}
          >
            <span className="tab-icon">📜</span>
            <span className="tab-text">История</span>
            {history.length > 0 && <span className="tab-count">{history.length}</span>}
          </button>
        </div>

        {list.length > 0 && categories.length > 0 && (
          <div className="sidebar-filter">
            <select 
              value={filter} 
              onChange={e => setFilter(e.target.value)}
              className="filter-select"
            >
              <option value="">Все категории</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="sidebar-content">
        {filtered.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="sidebar-list">
            {filtered.map((item, i) => (
              <div 
                key={i} 
                className="quote-card"
                onClick={() => onSelectQuote(item)}
              >
                <div className="quote-content">
                  <p className="quote-text">"{item.quote || item.content}"</p>
                  <p className="quote-author">— {item.author}</p>
                </div>
                {tab === 'favorites' && (
                  <button 
                    className="remove-button" 
                    onClick={e => {
                      e.stopPropagation();
                      removeFavorite(i);
                    }}
                    title="Удалить из избранного"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; 