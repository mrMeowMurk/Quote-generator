import React from 'react';
import '../styles/Header.css';

const Header = ({ darkMode, toggleDarkMode }) => {
  const currentHour = new Date().getHours();
  const currentDate = new Date().toLocaleDateString('ru-RU', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  });
  
  let greeting = '';
  let emoji = '';

  if (currentHour >= 5 && currentHour < 12) {
    greeting = 'Доброе утро';
    emoji = '🌅';
  } else if (currentHour >= 12 && currentHour < 18) {
    greeting = 'Добрый день';
    emoji = '☀️';
  } else if (currentHour >= 18 && currentHour < 22) {
    greeting = 'Добрый вечер';
    emoji = '🌆';
  } else {
    greeting = 'Доброй ночи';
    emoji = '🌙';
  }

  return (
    <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
      <div className="header-content">
        <div className="greeting">
          <div className="greeting-main">
            <h2>{greeting}</h2>
            <span className="greeting-emoji">{emoji}</span>
          </div>
          <p className="date">{currentDate}</p>
          <p className="subtitle">Каждый день - это возможность найти вдохновение в мудрых словах</p>
        </div>
        <button className="theme-toggle" onClick={toggleDarkMode} title={darkMode ? 'Включить светлую тему' : 'Включить тёмную тему'}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default Header; 