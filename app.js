// app.js
const express = require('express');
const app = express();
const port = 3000;

// Basic endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Hello from test server!' });
});

// Endpoint with configurable delay
app.get('/delay/:ms', (req, res) => {
  const delay = parseInt(req.params.ms) || 100;
  setTimeout(() => {
    res.json({ 
      message: 'Response after delay',
      delay: delay
    });
  }, delay);
});

// CPU intensive endpoint
app.get('/cpu', (req, res) => {
  let result = 0;
  for(let i = 0; i < 1000000; i++) {
    result += Math.random() * Math.random();
  }
  res.json({ 
    message: 'CPU intensive operation completed',
    result: result
  });
});

// Memory usage endpoint
app.get('/memory', (req, res) => {
  const array = new Array(1000000).fill('test data');
  res.json({ 
    message: 'Memory intensive operation completed',
    arrayLength: array.length
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Test server listening at http://0.0.0.0:${port}`);
});
