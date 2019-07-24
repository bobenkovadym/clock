const express = require('express');
const moment = require('moment');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/time', (req, res) => {
  let date = moment().format('YYYY-MM-DD HH:mm:ss');
  res.send(date);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
