const quoteList = document.getElementById('quoteList');
const searchInput = document.getElementById('searchInput');
const errorDiv = document.getElementById('error');
let allQuotes = [];

// Custom function that returns a Promise to fetch quotes
function fetchQuotes() {
  return new Promise((resolve, reject) => {
    fetch('https://dummyjson.com/quotes')
      .then(response => {
        if (!response.ok) {
          reject(new Error('Failed to fetch quotes'));
        } else {
          return response.json();
        }
      })
      .then(data => resolve(data.quotes))
      .catch(error => reject(error));
  });
}

// Use the Promise
fetchQuotes()
  .then(quotes => {
    allQuotes = quotes;
    displayQuotes(allQuotes);
  })
  .catch(err => {
    errorDiv.textContent = err.message;
  });

// Display quotes in the list
function displayQuotes(quotes) {
  quoteList.innerHTML = '';
  if (quotes.length === 0) {
    quoteList.innerHTML = '<li>No matching quotes found.</li>';
    return;
  }
  quotes.forEach(q => {
    const li = document.createElement('li');
    li.textContent = q.quote;
    quoteList.appendChild(li);
  });
}

// Filter quotes when typing
searchInput.addEventListener('input', () => {
  const searchText = searchInput.value.toLowerCase();
  const filtered = allQuotes.filter(q => q.quote.toLowerCase().includes(searchText));
  displayQuotes(filtered);
});
