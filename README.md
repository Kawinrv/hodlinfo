# Hodlinfo 

This project fetches the top 10 cryptocurrency ticker data from the WazirX API, stores it in a MySQL database, and displays it on a web page that updates every 10 seconds.
## Build with

- HTML
- CSS
- Node.js
- MySQL

## Prerequisites

- Node.js
- MySQL

## Install Dependencies
npm install
npm install axios

```bash
git clone https://github.com/your-repository.git
cd your-repository
npm servercon.js

Project Structure
server.js: Sets up the Express server, fetches data from the WazirX API, stores it in the MySQL database, and serves the API endpoints.
public/index.html: The HTML file that displays the data.
public/style.css: The CSS file for styling the web page.
public/script.js: The JavaScript file that fetches data from the server and updates the HTML table.

Endpoints
GET /api/tickers: Fetches the top 10 tickers from the database.
GET /api/btc-price: Fetches the last price of BTC from the database.

How It Works
The server fetches data from the WazirX API every 10 seconds and stores the top 10 tickers in the MySQL database.
The /api/tickers endpoint returns the stored tickers.
The frontend fetches the tickers from the server every 10 seconds and updates the HTML table.
Frontend
The frontend consists of an HTML table that displays the ticker data. The JavaScript code in public/script.js fetches the data from the server and updates the table every 10 seconds.
