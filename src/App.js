import React, { useState, useEffect } from 'react';
import "./index.css";

function App() {
  // Renk state'leri
  const [currentColor, setCurrentColor] = useState('');
  const [favoriteColors, setFavoriteColors] = useState([]);

  // Uygulama yüklendiğinde localStorage'den favori renkleri al
  useEffect(() => {
    const savedColors = JSON.parse(localStorage.getItem('favoriteColors'));
    if (savedColors) {
      setFavoriteColors(savedColors);
    }
  }, []);

  // Yeni renk üret ve arka planı bu renge ayarla
  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    setCurrentColor(randomColor);
  };

  // Rengi favorilere ekle
  const addToFavorites = () => {
    if (!favoriteColors.includes(currentColor)) {
      const updatedFavorites = [...favoriteColors, currentColor];
      setFavoriteColors(updatedFavorites);
      localStorage.setItem('favoriteColors', JSON.stringify(updatedFavorites)); // Favori renkleri kaydet
    }
  };

  // Favori renkleri temizle
  const clearFavorites = () => {
    setFavoriteColors([]);
    localStorage.removeItem('favoriteColors');
  };

  return (
    <div
      style={{
        backgroundColor: currentColor,
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1 className='baslik'>Renk Paleti Üretici</h1>
      <button onClick={generateRandomColor} style={{ margin: '10px' }}>
        Renk Oluştur
      </button>
      <button onClick={addToFavorites} style={{ margin: '10px' }}>
        Favorilere Ekle
      </button>
      <h2>Seçili Renk: {currentColor}</h2>

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <h3>Favori Renkler</h3>
        <div style={{
          display: 'flex', flexWrap: 'wrap', justifyContent: 'center'
        }}>
          {
            favoriteColors.map((color, index) => (
              <div
                key={index}
                onClick={() => setCurrentColor(color)}
                style={{
                  backgroundColor: color,
                  width: '50px',
                  height: '50px',
                  margin: '5px',
                  cursor: 'pointer',
                  border: "3px solid black",
                }}
              ></div>
            ))
          }
        </div>
        {favoriteColors.length > 0 && (
          <button onClick={clearFavorites} style={{ marginTop: '10px' }}>
            Favorileri Temizle
          </button>
        )}
      </div>
    </div >
  );
}

export default App;
