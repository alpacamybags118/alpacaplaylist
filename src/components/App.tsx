import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { BitmapLayer } from '@deck.gl/layers';
import { THEMES, ThemeKey } from '../themes';

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

const Alpaca3D = () => {
  const [alpacaImage, setAlpacaImage] = useState('');

  useEffect(() => {
    // Load the alpaca image dynamically
    const fetchAlpacaImage = async () => {
      const response = await fetch('/images/alpaca.jpg'); // Replace with actual path
      const blob = await response.blob();
      setAlpacaImage(URL.createObjectURL(blob));
    };

    fetchAlpacaImage();
  }, []);

  const layers = [
    new BitmapLayer({
      id: 'alpaca-layer',
      bounds: [-122.519, 37.7045, -122.355, 37.829], // Example coordinates
      image: alpacaImage || 'https://example.com/default-alpaca.jpg', // Fallback image
      pickable: true,
    }),
  ];

  return (
    <DeckGL
      initialViewState={{
        longitude: -122.4,
        latitude: 37.74,
        zoom: 11,
        pitch: 30,
        bearing: 0,
      }}
      controller={true}
      layers={layers}
      style={{ width: '100%', height: '500px' }}
    />
  );
};

const App: React.FC = () => {
  const [question] = useState(getRandomQuestion());
  const [text, setText] = useState('');
  const [diaryEntry, setDiaryEntry] = useState<string | null>(null);
  const [currentThemeKey, setCurrentThemeKey] = useState<keyof typeof THEMES>(getRandomThemeKey());
  const [typedDiaryEntry, setTypedDiaryEntry] = useState('');
  const theme = THEMES[currentThemeKey];

  useEffect(() => {
    let typedEntry = `  Dear Diary,\n ${diaryEntry}`;
    if (typedEntry) {
      let index = 0;
      setTypedDiaryEntry(''); // Reset the typed entry
      const interval = setInterval(() => {
        if (index < typedEntry.length && typedEntry[index]) {
          setTypedDiaryEntry((prev) => prev + typedEntry.charAt(index)); // Sequentially add characters
          index++;
        } else {
          clearInterval(interval);
        }
      }, 50); // Adjust typing speed here

      return () => {
        clearInterval(interval); // Ensure cleanup of interval
      };
    }
  }, [diaryEntry]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        setTypedDiaryEntry(''); // Clear the typed entry for the new entry
        setDiaryEntry(null)
        setDiaryEntry(`${text.trim()}`); // Set the new diary entry
        setText(''); // Clear the input text
      }
    }
  };

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentThemeKey(e.target.value as keyof typeof THEMES);
    setDiaryEntry(null); // Clear the current diary entry when the theme changes
    setTypedDiaryEntry(''); // Reset the typed diary entry to allow new entries
  };

  return (
    <div style={{
      minHeight: '100dvh',
      minWidth: '100vw',
      width: '100vw',
      height: '100dvh',
      background: theme.background,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      boxSizing: 'border-box',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 0,
    }}>
      <div style={{
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 3,
      }}>
        <select
          value={currentThemeKey}
          onChange={handleThemeChange}
          style={{
            padding: '8px 12px',
            fontSize: 16,
            borderRadius: 8,
            border: `1px solid ${theme.borderColor}`,
            background: theme.overlay,
            color: theme.textColor,
            fontFamily: 'inherit',
          }}
        >
          {Object.entries(THEMES).map(([key, value]) => (
            <option key={key} value={key} style={{ color: value.textColor }}>
              {value.name}
            </option>
          ))}
        </select>
      </div>
      <div style={{
        maxWidth: 600,
        width: '100%',
        padding: 32,
        textAlign: 'center',
        background: theme.overlay,
        borderRadius: 24,
        boxShadow: `0 8px 32px 0 ${theme.shadowColor}`,
        border: `2px solid ${theme.borderColor}`,
        position: 'relative',
        fontFamily: '"Caveat", "Comic Neue", "Segoe UI", cursive, sans-serif',
        color: theme.textColor,
        overflow: 'hidden',
        zIndex: 1,
      }}>
        <h2 style={{
          marginBottom: 24,
          fontSize: 32,
          fontWeight: 700,
          letterSpacing: 1,
          textShadow: '0 2px 8px #fff8',
          color: theme.textColor,
          fontFamily: '"Caveat", "Comic Neue", "Segoe UI", cursive, sans-serif',
          textDecoration: `underline wavy ${theme.borderColor}`,
        }}>{question}</h2>
        <textarea
          className="themed-textarea"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={8}
          style={{
            width: '100%',
            minWidth: 0,
            maxWidth: '100%',
            fontSize: 20,
            padding: 20,
            borderRadius: 16,
            border: `2px solid ${theme.borderColor}`,
            background: 'rgba(255, 255, 255, 0.12)',
            color: '#ffffff',
            boxShadow: `0 2px 12px 0 ${theme.shadowColor}`,
            outline: 'none',
            marginBottom: 32,
            fontFamily: 'inherit',
            resize: 'vertical',
            boxSizing: 'border-box',
          }}
          placeholder={theme.questionText}
        />
        <style>
          {`
            .themed-textarea::placeholder {
              color: ${theme.textColor};
              opacity: 0.8;
            }
          `}
        </style>
        {diaryEntry && (
          <div style={{
            marginTop: 40,
            padding: 24,
            background: 'rgba(255,255,255,0.18)',
            borderRadius: 16,
            color: theme.textColor,
            fontSize: 20,
            fontFamily: 'inherit',
            whiteSpace: 'pre-line',
            boxShadow: `0 2px 8px 0 ${theme.shadowColor}`,
            border: `1.5px solid ${theme.borderColor}`,
            maxWidth: 520,
            marginLeft: 'auto',
            marginRight: 'auto',
            marginBottom: 56,
          }}>
            {typedDiaryEntry}
          </div>
        )}
        <div style={{
          position: 'absolute',
          bottom: 12,
          right: 24,
          fontSize: 28,
          opacity: 0.7,
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 2,
        }}>
          <span role="img" aria-label="sparkle">
            {theme.emojis}
          </span>
        </div>
      </div>
      <Alpaca3D />
    </div>
  );
};

export default App;