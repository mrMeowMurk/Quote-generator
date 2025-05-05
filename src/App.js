import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [copied, setCopied] = useState(false);
  const [fadeIn, setFadeIn] = useState(true);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/tags');
      if (!response.ok) throw new Error('Ошибка загрузки категорий');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error('Ошибка при загрузке категорий:', err);
    }
  };

  const fetchNewQuote = async () => {
    setFadeIn(false);
    setIsLoading(true);
    setError(null);
    setCopied(false);
    
    try {
      const url = category ? `/random?tags=${category}` : '/random';
      const response = await fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error('Ошибка сети');
      }
      const data = await response.json();
      setTimeout(() => {
        setQuote(data.content);
        setAuthor(data.author);
        setFadeIn(true);
      }, 300);
    } catch (err) {
      setError('Произошла ошибка при загрузке цитаты. Попробуйте еще раз.');
      console.error('Ошибка:', err);
    }
    setIsLoading(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`"${quote}" - ${author}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Ошибка при копировании:', err);
    }
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`"${quote}" - ${author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = encodeURIComponent(`"${quote}" - ${author}`);
    window.open(`https://t.me/share/url?url=&text=${text}`, '_blank');
  };

  useEffect(() => {
    fetchCategories();
    fetchNewQuote();
  }, []);

  return (
    <div className="app">
      <div className="quote-container">
        <h1>Генератор Цитат</h1>
        
        <div className="categories">
          <select 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
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

        {error ? (
          <div className="error">{error}</div>
        ) : (
          <>
            <div className={`quote-content ${fadeIn ? 'fade-in' : 'fade-out'}`}>
              {isLoading ? (
                <div className="loader">Загрузка...</div>
              ) : (
                <>
                  <p className="quote">"{quote}"</p>
                  <p className="author">- {author}</p>
                </>
              )}
            </div>

            <div className="buttons-container">
              <button 
                className="action-btn copy-btn"
                onClick={copyToClipboard}
                disabled={isLoading}
              >
                {copied ? '✓ Скопировано' : 'Копировать'}
              </button>

              <button 
                className="new-quote-btn"
                onClick={fetchNewQuote}
                disabled={isLoading}
              >
                Новая цитата
              </button>

              <div className="share-buttons">
                <button 
                  className="action-btn share-btn twitter"
                  onClick={shareOnTwitter}
                  disabled={isLoading}
                >
                  Twitter
                </button>
                <button 
                  className="action-btn share-btn telegram"
                  onClick={shareOnTelegram}
                  disabled={isLoading}
                >
                  Telegram
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
