const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const mountRoutes = require('./routes');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mountRoutes(app);

app.use('*', (req, res) => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  res.status(error.statusCode).json({
    message: error.message,
  });
});

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(`Server running at http://${process.env.HOST}:${process.env.PORT}/`);
});
