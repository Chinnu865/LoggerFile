const express = require('express');
const app = express();
const morgan = require('morgan');
const { userLogger, userErrorLogger } = require('./logger');
const fs = require('fs');
const path = require('path');

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'api.log'), { flags: 'a' });
// const errorLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'error.log'), { flags: 'a' });
// const accessLogStream = fs.createWriteStream('./logs/user.log', { flags: 'a' });
// const accessLogger = morgan('combined', { stream: accessLogStream });
 
// app.use(express.json());
// app.use(accessLogger);

const accessLogStream = fs.createWriteStream('./logs/access.log', { flags: 'a' });
const errorLogStream = fs.createWriteStream('./logs/error.log', { flags: 'a' });

const accessLogger = morgan('combined', {
  skip: (req, res) => res.statusCode < 200 || res.statusCode >= 400,
  stream: accessLogStream
});

const errorLogger = morgan('combined', {
  skip: (req, res) => res.statusCode >= 200 && res.statusCode < 400,
  stream: errorLogStream
})

app.use(accessLogger);
app.use(errorLogger);

const routes = require('./index');
app.use('/api', routes);

app.listen(5000, () => {
  userLogger.info(`server running`)
});