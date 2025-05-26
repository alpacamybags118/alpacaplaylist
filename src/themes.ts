export interface Theme {
  name: string;
  background: string;
  overlay: string;
  textColor: string;
  borderColor: string;
  shadowColor: string;
  questionText: string;
  emojis: string;
  backdropFilter?: string; // Optional backdropFilter property
}

export const THEMES: Record<string, Theme> = {
  pastelGoth: {
    name: 'Pastel Goth',
    background: 'linear-gradient(135deg, #ffb6d5 0%, #ff69b4 50%, #b19cd9 75%, #add8e6 100%)', // Added light purple and light blue
    overlay: 'rgba(255, 182, 213, 0.85)',
    textColor: '#7a004f',
    borderColor: '#ff69b4',
    shadowColor: '#ffb6d544',
    questionText: "Type your answer here... (｡•́︿•̀｡)",
    emojis: "✨🦇🖤",
  },
  frutigerAero: {
    name: 'Frutiger Aero',
    background: 'linear-gradient(135deg, #a8e6cf 0%, #dcedc1 100%)',
    overlay: 'rgba(168, 230, 207, 0.3)', // Semi-transparent background
    textColor: '#05668d',
    borderColor: '#02c39a',
    shadowColor: '#a8e6cf44',
    questionText: "What's on your mind? 🌈",
    emojis: "🌈✨☁️",
    backdropFilter: 'blur(10px)', // Add blur effect for glassmorphism
  },
  brutalist: {
    name: 'Brutalist',
    background: 'linear-gradient(135deg, #f7f7f7 0%, #e0e0e0 100%)',
    overlay: 'rgba(240, 240, 240, 0.85)',
    textColor: '#000000',
    borderColor: '#333333',
    shadowColor: '#cccccc44',
    questionText: "Enter your thoughts. 🖤",
    emojis: "🖤📐💾",
  },
  jungle: {
    name: 'Jungle',
    background: 'linear-gradient(135deg, #1b5e20 0%, #4caf50 100%)',
    overlay: 'rgba(27, 94, 32, 0.85)',
    textColor: '#ffffff',
    borderColor: '#66bb6a',
    shadowColor: '#1b5e2044',
    questionText: "Share your jungle vibes! 🌿",
    emojis: "🌿🐒🍃",
  },
};

export type ThemeKey = keyof typeof THEMES;
