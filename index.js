const express = require('express');
const app = express();
const http = require('http').Server(app);
const PORT = process.env.PORT || 3000;

app.get('/', function (req, res) {
  res.send('<h1>Hello world</h1>');
});

http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
  process.send('ready');
})
