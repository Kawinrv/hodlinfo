const express = require('express');
const mysql = require('mysql2/promise');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = 3000;

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};


const fetchAndStoreData = async () => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);


    const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
    const tickers = response.data;

    
    const firstTenTickers = Object.values(tickers).slice(0, 10);

    const query = `
      INSERT INTO tickers (name, last, buy, sell, volume, base_unit)
      VALUES (?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
      last = VALUES(last), buy = VALUES(buy), sell = VALUES(sell), volume = VALUES(volume), base_unit = VALUES(base_unit);
    `;

    for (const ticker of firstTenTickers) {
      const { name, last, buy, sell, volume, base_unit } = ticker;
      const values = [name, last, buy, sell, volume, base_unit];
      await connection.execute(query, values);
    }

    console.log('Data successfully inserted/updated at', new Date().toLocaleTimeString());
  } catch (error) {
    console.error('Error fetching or storing data:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};


setInterval(fetchAndStoreData, 10000);


app.get('/api/tickers', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute('SELECT * FROM tickers LIMIT 10');
    res.json(rows);
    
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Error fetching data');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.get('/api/btc-price', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);

    const [rows] = await connection.execute("SELECT last FROM tickers WHERE base_unit = 'btc' LIMIT 1");
    if (rows.length > 0) {
      res.json({ last: rows[0].last });
      
    } else {
      res.status(404).send('BTC price not found');
    }
  } catch (error) {
    console.error('Error fetching BTC price:', error);
    res.status(500).send('Error fetching BTC price');
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});


// Serve the HTML and JavaScript files from the public directory
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
