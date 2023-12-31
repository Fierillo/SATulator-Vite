import React, { useState, useEffect } from 'react';
// Link to CSS style file.
import './App.css'; 
// Link to conversion function.
import convert from './convert.js';

const App = () => {
  // Setup of dynamic states
  const [satoshis, setSatoshis] = useState(0);
  const [conversionType, setConversionType] = useState(0);
  const [conversionResult, setConversionResult] = useState(0);

  // Here is where conversion function is called.
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await convert(satoshis, conversionType);
        setConversionResult(result);
      } catch (error) {
        console.error(error);
        setConversionResult('Error al realizar la conversión. Por favor, intenta de nuevo más tarde.');
      }
    }
    fetchData();
  }, [satoshis, conversionType]);

  // Here is where the UI is defined.
  return (
    // Main box is defined.
    <div className="container">
      <h1>SATulator</h1>
      {/* Input box is defined. */}
      <div className="input-container">
        <label htmlFor="satoshisInput">Satoshis:</label>
        <input
          type="number"
          id="satoshisInput"
          placeholder="Ingresa la cantidad de satoshis"
          value={satoshis}
          onChange={(e) => setSatoshis(e.target.value)}
          style={{ textAlign: 'center' }}
        />
      </div>
      {/* Slider is defined. */}
      <div className="slider-container">
        <label htmlFor="conversionSlider">Conversión a:</label>
        <span id="conversionType">
          {conversionType === 0 ? 'Pesos' : 'Dólares'}
        </span>
        <input
          type="range"
          id="conversionSlider"
          min="0"
          max="1"
          step="1"
          value={conversionType}
          onChange={(e) => setConversionType(parseInt(e.target.value))}
        />
      </div>
      {/* Result field is defined. */}
      <div id="result" className="result">
        {conversionResult}{conversionType == 0 ? " ARS" : " USD"}
      </div>
    </div>
  );
};

export default App;