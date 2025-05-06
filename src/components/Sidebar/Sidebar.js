import React, { useState } from 'react';
import './Sidebar.css';

const QuoteCard = ({ quote, author, onSelect, onRemove, showRemove, addedAt }) => {
  const formattedDate = new Date(addedAt).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="quote-card" onClick={onSelect}>
      {showRemove && (
        <button 
          className="remove-button" 
          onClick={e => {
            e.stopPropagation();
            onRemove();
          }}
          title="Удалить из избранного"
        >
          ✕
        </button>
      )}
      <div className="quote-content">
        <span className="quote-date" title="Время добавления">{formattedDate}</span>
        <p className="quote-text">"{quote}"</p>
        <div className="quote-footer">
          <p className="quote-author">— {author}</p>
          <div className="quote-actions">
            <button 
              className="action-button copy"
              onClick={e => {
                e.stopPropagation();
                navigator.clipboard.writeText(`"${quote}" — ${author}`);
              }}
              title="Копировать цитату"
            >
              📋
            </button>
            <button 
              className="action-button share"
              onClick={e => {
                e.stopPropagation();
                window.open(`https://t.me/share/url?url=&text=${encodeURIComponent(`"${quote}" — ${author}`)}`, '_blank');
              }}
              title="Поделиться в Telegram"
            >
              ✈️
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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
              <QuoteCard
                key={i}
                quote={item.quote || item.content}
                author={item.author}
                addedAt={item.addedAt || new Date().toISOString()}
                showRemove={tab === 'favorites'}
                onSelect={() => onSelectQuote(item)}
                onRemove={() => removeFavorite(i)}
              />
            ))}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar; 