const express = require('express');
const router = express.Router();

const { quotes } = require('./data');
const { getRandomElement, createId, isCopy } = require('./utils');

router.get('', (req, res, next) => {
const query = req.query
    let returnedQuotes;
    if (query.person) {
        returnedQuotes = quotes.filter(quote => quote.person.toLowerCase().includes(query.person.toLowerCase()))
        returnedQuotes = {quotes: returnedQuotes}
    } else {
        returnedQuotes = {quotes: quotes}
    }
    res.status(200).send(returnedQuotes)
});

router.get('/random', (req, res, next) => {
    const randomQuote = { quote: getRandomElement(quotes)};
    res.status(200).send(randomQuote);
});

router.post('/', (req, res, next) => {
    const reqQuote = req.query.quote;
    const reqPerson = req.query.person;
    const reqYear = req.query.year;
    if (reqQuote && reqPerson) {
        const newQuote = {
        quote: reqQuote,
        person: reqPerson,
        year: reqYear,
        id: createId()
        }
        const quoteIsCopy = isCopy(newQuote, quotes);
        if (quoteIsCopy) {
            res.status(400).send('Quote is already in database.');
        } else {
            quotes.push(newQuote);
            res.status(200).send({quote: newQuote});
        }
    } else {
        res.status(400).send();
    }
})

router.put(`/:quoteId`, (req, res, next) => {
    const newQuote = req.query.quote;
    const id = req.params.quoteId;

    quotes.forEach((quote, i) => {
        if (quote.id === id) {
        quotes[i] = {
            ...quote,
            quote: newQuote
        }
        res.status(200).send([quotes[i]])
        }
    })
})

router.delete(`/:quoteId`, (req, res, next) => {
const quoteId = req.params.quoteId;
    let deletedQuote;
    quotes.forEach((quote, i) => {
        if (quote.id === quoteId) {
        deletedQuote = [{quote: quote, deleted: true}]
        quotes.splice(i, 1);
        }
    })
    res.status(200).send(deletedQuote);
})

module.exports = router;