import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './MainColumn.css';

const MainColumn = ({
  quote,
  author,
  category,
  isLoading,
  error,
  copied,
  fadeIn,
  categories,
  onCategoryChange,
  onCopyClick,
  onFavoriteClick,
  onNewQuoteClick,
  onSpeakClick,
  onShareTwitter,
  onShareTelegram,
  isFavorite,
  darkMode
}) => {
  return (
    <main className="main-column">
      <motion.div 
        className="quote-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="controls">
          <div className="categories">
            <select 
              value={category} 
              onChange={(e) => onCategoryChange(e.target.value)}
              className="category-select"
            >
              <option value="">Все категории</option>
              {categories.map(cat => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {error ? (
          <motion.div 
            className="error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {error}
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div 
              key={quote}
              className={`quote-content ${fadeIn ? 'fade-in' : 'fade-out'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {isLoading ? (
                <div className="loader">
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                  <div className="loader-dot"></div>
                </div>
              ) : (
                <>
                  <motion.p 
                    className="quote"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    "{quote}"
                  </motion.p>
                  <motion.p 
                    className="author"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    - {author}
                  </motion.p>
                  {category && (
                    <motion.span 
                      className="quote-category"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.2 }}
                    >
                      {category}
                    </motion.span>
                  )}
                </>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="buttons-container">
          <div className="primary-buttons">
            <motion.button 
              className="new-quote-btn"
              onClick={onNewQuoteClick}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Новая цитата
            </motion.button>
          </div>
          
          <div className="secondary-buttons">
            <motion.button 
              className="action-btn copy-btn"
              onClick={onCopyClick}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Копировать цитату"
            >
              {copied ? '✓ Скопировано' : '📋 Копировать'}
            </motion.button>

            <motion.button 
              className="action-btn favorite-btn"
              onClick={onFavoriteClick}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
            >
              {isFavorite ? '★ В избранном' : '☆ В избранное'}
            </motion.button>

            <motion.button 
              className="action-btn speak-btn"
              onClick={onSpeakClick}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Прослушать цитату"
            >
              🔊 Прослушать
            </motion.button>
          </div>

          <div className="share-buttons">
            <motion.button 
              className="share-btn twitter"
              onClick={onShareTwitter}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Поделиться в Twitter"
            >
              Twitter
            </motion.button>
            <motion.button 
              className="share-btn telegram"
              onClick={onShareTelegram}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title="Поделиться в Telegram"
            >
              Telegram
            </motion.button>
          </div>
        </div>
      </motion.div>
    </main>
  );
};

export default MainColumn; 