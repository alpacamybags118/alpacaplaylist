import React from 'react';
import { THEMES } from '../themes';

type ThemeSelectorProps = {
  currentThemeKey: keyof typeof THEMES;
  onThemeChange: (themeKey: keyof typeof THEMES) => void;
};

const ThemeSelector: React.FC<ThemeSelectorProps> = ({ currentThemeKey, onThemeChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onThemeChange(e.target.value as keyof typeof THEMES);
  };

  return (
    <div style={{
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 3,
    }}>
      <select
        value={currentThemeKey}
        onChange={handleChange}
        style={{
          padding: '8px 12px',
          fontSize: 16,
          borderRadius: 8,
          border: `1px solid ${THEMES[currentThemeKey].borderColor}`,
          background: THEMES[currentThemeKey].overlay,
          color: THEMES[currentThemeKey].textColor,
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
  );
};

export default ThemeSelector;
