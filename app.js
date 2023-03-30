const express = require('express');
const app = express();

app.use(express.json());
const routes = require('./index');
app.use('/api', routes);

app.listen(5000, () => {
    console.log('Server running on port 5000');
  });