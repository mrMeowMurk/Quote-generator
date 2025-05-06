import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainColumn from './components/MainColumn/MainColumn';
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
  const [darkMode, setDarkMode] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quoteHistory, setQuoteHistory] = useState([]);
  const synthRef = useRef(window.speechSynthesis);

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
      if (!response.ok) throw new Error('Ошибка сети');
      const data = await response.json();
      setTimeout(() => {
        setQuote(data.content);
        setAuthor(data.author);
        setFadeIn(true);
        setQuoteHistory(prev => [...prev, { content: data.content, author: data.author, category: data.tags[0] }]);
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

  const toggleFavorite = () => {
    const newFavorite = { quote, author, category, addedAt: new Date().toISOString() };
    if (favorites.some(fav => fav.quote === quote)) {
      setFavorites(favorites.filter(fav => fav.quote !== quote));
    } else {
      setFavorites([...favorites, newFavorite]);
    }
  };

  const removeFavorite = (index) => {
    setFavorites(favorites.filter((_, i) => i !== index));
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`"${quote}" - ${author}`);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareOnTelegram = () => {
    const text = encodeURIComponent(`"${quote}" - ${author}`);
    window.open(`https://t.me/share/url?url=&text=${text}`, '_blank');
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
  };

  const speakQuote = () => {
    if (synthRef.current.speaking) synthRef.current.cancel();
    const utter = new window.SpeechSynthesisUtterance(`"${quote}". ${author}`);
    utter.lang = 'ru-RU';
    synthRef.current.speak(utter);
  };

  const handleSelectQuote = (q) => {
    setQuote(q.quote || q.content);
    setAuthor(q.author);
    setSidebarOpen(false);
  };

  useEffect(() => {
    fetchCategories();
    fetchNewQuote();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      if (e.key.toLowerCase() === 'f') toggleFavorite();
      if (e.key.toLowerCase() === 'c') copyToClipboard();
      if (e.key.toLowerCase() === 's') speakQuote();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quote, author, favorites]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="layout">
        <button className="sidebar-toggle" onClick={()=>setSidebarOpen(v=>!v)}>
          ☰
        </button>
        <Sidebar
          favorites={favorites}
          history={quoteHistory}
          removeFavorite={removeFavorite}
          onSelectQuote={handleSelectQuote}
          categories={categories}
          darkMode={darkMode}
          style={{display: sidebarOpen ? 'block' : ''}}
        />
        <MainColumn
          quote={quote}
          author={author}
          category={category}
          isLoading={isLoading}
          error={error}
          copied={copied}
          fadeIn={fadeIn}
          categories={categories}
          onCategoryChange={setCategory}
          onCopyClick={copyToClipboard}
          onFavoriteClick={toggleFavorite}
          onNewQuoteClick={fetchNewQuote}
          onSpeakClick={speakQuote}
          onShareTwitter={shareOnTwitter}
          onShareTelegram={shareOnTelegram}
          isFavorite={favorites.some(fav => fav.quote === quote)}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

export default App;