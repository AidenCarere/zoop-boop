const express = require('express');
const path = require('path');
const app = express();
const apiRouter = require('./routes/api');

// Middlewares
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Serve static files from Vite's build directory
app.use(express.static(path.join(__dirname, 'client')));


// define route handlers
app.use('/api', apiRouter)

// All GET requests to '/' are directed to the built index.html from Vite
// app.get('/api', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'index.html'));
// });

// Default Route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.status(404).send('This is not the page you\'re looking for...'));

/**
 * express error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred broski' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;