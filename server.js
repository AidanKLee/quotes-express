const express = require('express');
const morgan = require('morgan');
const app = express();
const quotesRouter = require('./quotesRouter');

const PORT = process.env.PORT || 4002;

app.use(express.static('public'));
app.use(express.json());

app.use('/api/quotes', quotesRouter);

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
});