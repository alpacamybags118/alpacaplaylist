import React, { useEffect, useState } from 'react';
import { THEMES, ThemeKey } from '../themes';
import { OllamaClient } from '../clients/LLMClient';
import { SpotifyClient } from '../clients/SpotifyClient';

const ollamaClient = new OllamaClient();
const spotifyClient = new SpotifyClient(
  process.env.REACT_APP_SPOTIFY_CLIENT_ID || '',
  process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || ''
);

type DiaryProps = {
  theme: typeof THEMES[ThemeKey];
  question: string;
};

const Diary: React.FC<DiaryProps> = ({ theme, question }) => {
  const [text, setText] = useState('');
  const [diaryEntry, setDiaryEntry] = useState<string | null>(null);
  const [typedDiaryEntry, setTypedDiaryEntry] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let typedEntry = `  Dear Diary,\n ${diaryEntry}`;
    if (typedEntry && diaryEntry) { // Only proceed if diaryEntry exists
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

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (text.trim()) {
        setTypedDiaryEntry(''); // Clear the typed entry for the new entry
        setIsLoading(true); // Show loading indicator

        const prompt = `Translate the emotions conveyed in the following text into music genres: "${text.trim()}". Return only a plain list of music genres, separated by commas, with no additional text.`;
        try {
          const genres = await ollamaClient.generateResponse(prompt);
          console.log('Generated Music Genres:', genres);

          const formattedGenres = genres.split(',').map(genre => genre.trim());
          
          // Try to fetch songs if Spotify credentials are valid, otherwise skip
          let songsList = '';
          try {
            const songs = await spotifyClient.searchTracksByGenre(formattedGenres[0]);
            console.log('Fetched Songs:', songs);
            if (songs && songs.length > 0) {
              songsList = '\n\nHere are some songs for you:\n' + 
                songs.slice(0, 5).map(song => 
                  `- ${song.name} by ${song.artists.map(artist => artist.name).join(', ')}`
                ).join('\n');
            }
          } catch (spotifyError) {
            console.error('Spotify API error:', spotifyError);
            // Continue without Spotify integration if it fails
          }

          const entry = `${text.trim()}\n\nYour emotions translate to these music genres:\n${formattedGenres.map(genre => `- ${genre}`).join('\n')}${songsList}`;
          setDiaryEntry(entry);
        } catch (error) {
          console.error('Error:', error);
          // Set a basic diary entry even if LLM fails
          setDiaryEntry(text.trim());
        } finally {
          setIsLoading(false); // Hide loading indicator
        }

        setText(''); // Clear the input text
      }
    }
  };

  return (
    <div style={{
      maxWidth: 700, // Increased from 600
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
      overflow: 'visible',
      maxHeight: '85vh', // Increased from 80vh
      display: 'flex',
      flexDirection: 'column',
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
        rows={10} // Increased from 8
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
          maxWidth: 620, // Increased from 520
          maxHeight: '50vh', // Increased from 40vh
          overflowY: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: 56,
        }}>
          {typedDiaryEntry}
        </div>
      )}
      {isLoading && (
        <div style={{
          marginBottom: 16,
          fontSize: 18,
          color: theme.textColor,
          fontStyle: 'italic',
        }}>
          Generating music genres...
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
  );
};

export default Diary;
