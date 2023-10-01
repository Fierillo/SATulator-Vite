async function convert(satoshis, conversionType) {
    // URL is changed every time that user git the slider.
    const apiUrl = conversionType === 0
      ? 'https://criptoya.com/api/btc/ars'
      : 'https://criptoya.com/api/btc/usd';
  
    // Function call to API to get data.
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      // BTCUSD is feed by Letsbit, Bitso, Decrypto. BTCARS is feed by Lemon, Binance, Belo. Feed change everytime user git the slider.
      let exchanges = [];
      if (conversionType === 0) {
        exchanges = ["lemoncash", "binance", "belo"];
      } else {
        exchanges = ["letsbit", "bitso", "decrypto"];
      }
  
      // When exchange data is not available the average is adjusted.
      let totalPrices = 0;
      let numberOfExchanges = 0;
      exchanges.forEach(exchange => {
        if (data[exchange] && data[exchange]["totalAsk"] && data[exchange]["totalBid"]) {
          totalPrices += (data[exchange]["totalAsk"] + data[exchange]["totalBid"]) / 2;
          numberOfExchanges++;
        }
      });
  
      // Final result is defined, also error messages.
      if (numberOfExchanges > 0) {
        const averagePrice = totalPrices / numberOfExchanges;
        const satoshiValue = satoshis / 100000000;
        const conversionResult = satoshiValue * averagePrice;
        return conversionResult.toLocaleString('en-US', {minimumFractionDigits: 2,maximumFractionDigits: 2,});

      } else {throw new Error(`No hay datos disponibles en los exchanges para BTC`);
      }
    } catch (error) {
      throw new Error(`Error al realizar la conversión: ${error.message}`);
    }
  }
  
  export default convert;
  