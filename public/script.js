

async function fetchTickers() {
  try {
    const response = await fetch('/api/tickers');
    const tickers = await response.json();
    console.log('Fetched tickers:', tickers);

    const tableBody = document.querySelector('#tickers-table tbody');
    tableBody.innerHTML = '';

    tickers.forEach(ticker => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${ticker.name}</td>
        <td>${ticker.last}</td>
        <td>${ticker.buy}</td>
        <td>${ticker.sell}</td>
        <td>${ticker.volume}</td>
        <td>${ticker.base_unit}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error('Error fetching tickers:', error);
  }
}
async function fetchBTCPrice() {
  try {
    const response = await fetch('/api/btc-price');
    const data = await response.json();
    console.log('Fetched BTC data:', data);

    const btcPriceElement = document.getElementById('btc-price');
    btcPriceElement.textContent = `${data.last}`;
  } catch (error) {
    console.error('Error fetching BTC price:', error);
  }
}

window.onload = () => {
  fetchBTCPrice();
  fetchTickers();
};


setInterval(() => {
  fetchBTCPrice();
  fetchTickers();
}, 10000);
