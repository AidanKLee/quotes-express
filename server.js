const express = require('express');
const morgan = require('morgan');
const app = express();
const quotesRouter = require('./quotesRouter');

// const { quotes } = require('./data');
// const { getRandomElement, createId, isCopy } = require('./utils');

const PORT = process.env.PORT || 4002;

app.use(express.static('public'));
app.use(express.json());

app.use('/api/quotes', quotesRouter)

app.listen(PORT, () => {
  console.log(`Listening at port ${PORT}`)
})

// app.get('/api/quotes/random', (req, res, next) => {
//   const randomQuote = { quote: getRandomElement(quotes)};
//   res.status(200).send(randomQuote);
// });

// app.get('/api/quotes', (req, res, next) => {
//   const query = req.query
//   let returnedQuotes;
//   if (query.person) {
//     returnedQuotes = quotes.filter(quote => quote.person.toLowerCase().includes(query.person.toLowerCase()))
//     returnedQuotes = {quotes: returnedQuotes}
//   } else {
//     returnedQuotes = {quotes: quotes}
//   }
//     res.status(200).send(returnedQuotes)
// });

// app.post('/api/quotes', (req, res, next) => {
//   const reqQuote = req.query.quote;
//   const reqPerson = req.query.person;
//   const reqYear = req.query.year;
//   if (reqQuote && reqPerson) {
//     const newQuote = {
//       quote: reqQuote,
//       person: reqPerson,
//       year: reqYear,
//       id: createId()
//     }
//     const quoteIsCopy = isCopy(newQuote, quotes);
//     if (quoteIsCopy) {
//         res.status(400).send('Quote is already in database.');
//     } else {
//         quotes.push(newQuote);
//         res.status(200).send({quote: newQuote});
//     }
//   } else {
//     res.status(400).send();
//   }
// })

// app.put(`/api/quotes/:quoteId`, (req, res, next) => {
//   const newQuote = req.query.quote;
//   const id = req.params.quoteId;

//   quotes.forEach((quote, i) => {
//     if (quote.id === id) {
//       quotes[i] = {
//         ...quote,
//         quote: newQuote
//       }
//       res.status(200).send([quotes[i]])
//     }
//   })
// })

// app.delete(`/api/quotes/:quoteId`, (req, res, next) => {
//   const quoteId = req.params.quoteId;
//   let deletedQuote;
//   quotes.forEach((quote, i) => {
//     if (quote.id === quoteId) {
//       deletedQuote = [{quote: quote, deleted: true}]
//       quotes.splice(i, 1);
//     }
//   })
//   res.status(200).send(deletedQuote);
// })