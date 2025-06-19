import React, { useState } from 'react';
import { THEMES, ThemeKey } from '../themes';
import Diary from './Diary';
import ThemeSelector from './ThemeSelector';
import Alpaca3D from './Alpaca3D';

const QUESTIONS = [
  "What's your vibe today?",
  "Describe your mood",
  "What are the feels?"
];

const getRandomQuestion = () => QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
const getRandomThemeKey = () => {
  const themeKeys = Object.keys(THEMES) as Array<ThemeKey>;
  return themeKeys[Math.floor(Math.random() * themeKeys.length)];
};

const App: React.FC = () => {
  const [question] = useState(getRandomQuestion());
  const [currentThemeKey, setCurrentThemeKey] = useState<keyof typeof THEMES>(getRandomThemeKey());
  const theme = THEMES[currentThemeKey];

  const handleThemeChange = (themeKey: keyof typeof THEMES) => {
    setCurrentThemeKey(themeKey);
  };

  return (
    <div style={{
      minHeight: '100dvh',
      minWidth: '100vw',
      width: '100vw',
      background: theme.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: 0,
      padding: 24, // Add some padding to ensure space for scrolling
      boxSizing: 'border-box',
      position: 'relative', // Changed from fixed to relative
      overflowY: 'auto', // Allow vertical scrolling
      zIndex: 0,
    }}>
      <ThemeSelector currentThemeKey={currentThemeKey} onThemeChange={handleThemeChange} />
      <Diary theme={theme} question={question} />
      <Alpaca3D />
    </div>
  );
};

export default App;