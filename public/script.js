const fetchAllButton = document.getElementById('fetch-quotes');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByAuthorButton = document.getElementById('fetch-by-author');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.querySelector('.quote');
const attributionText = document.querySelector('.attribution');

const resetQuotes = () => {
  quoteContainer.innerHTML = '';
}

const renderError = response => {
  quoteContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderQuotes = (quotes = []) => {
  console.log(quotes)
  resetQuotes();
  if (quotes.length > 0) {
    if (quotes[0].deleted) {
      quoteContainer.innerHTML = `<p>The quote <strong>"${quotes[0].quote.quote}"</strong> by <strong>${quotes[0].quote.person}</strong> was deleted.</p>`;
    } else {
      quotes.forEach(quote => {
        const stringQuote = JSON.stringify({
          ...quote,
          quote: quote.quote.replace(`"`, `!£$`).replace(`'`, `£$%`)
        }).replace(`'`, `£$%`)
        const newQuote = document.createElement('div');
        newQuote.id = quote.id
        newQuote.className = 'single-quote';
        newQuote.innerHTML = `<div class="quote-text">${quote.quote}</div>
        <div class="attribution">- ${quote.person} (${quote.year ? quote.year : 'Year Unknown'})</div>
        <button value='${stringQuote}' onclick='handleEditClick(event)'>Edit Quote</button>
        <button value='${quote.id}' onclick='handleDelete(event)'>Delete Quote</button>`;
        quoteContainer.appendChild(newQuote);
      });
    }
  } else {
    quoteContainer.innerHTML = '<p>Your request returned no quotes.</p>';
  }
}

const handleEditClick = e => {
  let quote = JSON.parse(e.target.value.replace(`£$%`, `'`))
  quote = {
    ...quote,
    quote: quote.quote.replace(`!£$`, `"`).replace(`£$%`, `'`)
  }
  const thisQuote = document.getElementById(quote.id);
  const input = document.createElement('textarea');
  input.id = `edit-${quote.id}`
  input.defaultValue = quote.quote
  const thisInput = document.getElementById(`edit-${quote.id}`);
  if (thisInput) {
    thisQuote.removeChild(thisInput)
  } else {
      thisQuote.appendChild(input);
  }
  const submit = document.createElement('button');
  submit.innerHTML = 'Submit';
  submit.id = `submit-${quote.id}`;
  submit.value = e.target.value;
  submit.onclick =  (event) => handleEditSubmit(event);
  const thisSubmit = document.getElementById(`submit-${quote.id}`);
  if (thisSubmit) {
    thisQuote.removeChild(thisSubmit)
  } else {
      thisQuote.appendChild(submit);
  }
}

const handleEditSubmit = e => {
  let quote = JSON.parse(e.target.value.replace(`£$%`, `'`))
  quote = {
    ...quote,
    quote: quote.quote.replace(`!£$`, `"`).replace(`£$%`, `'`)
  }
  const inputValue = document.getElementById(`edit-${quote.id}`).value;
  fetch(`/api/quotes/${quote.id}?quote=${inputValue}`, {
    method: 'PUT',
  })
  .then(response => response.json())
  .then(response => renderQuotes(response))
}

const handleDelete = e => {
  const quoteId = e.target.value;
  fetch(`/api/quotes/${quoteId}`, {
    method: 'DELETE'
  })
  .then(response => response.json())
  .then(response => renderQuotes(response))
}

fetchAllButton.addEventListener('click', () => {
  fetch('/api/quotes')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});

fetchRandomButton.addEventListener('click', () => {
  fetch('/api/quotes/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes([response.quote]);
  });
});

fetchByAuthorButton.addEventListener('click', () => {
  const author = document.getElementById('author').value;
  fetch(`/api/quotes?person=${author}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderQuotes(response.quotes);
  });
});