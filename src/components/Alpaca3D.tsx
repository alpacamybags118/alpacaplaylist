import React, { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react';
import { BitmapLayer } from '@deck.gl/layers';

const Alpaca3D: React.FC = () => {
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

export default Alpaca3D;
