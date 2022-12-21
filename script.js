$(document).ready(function() {

// Setting API
// The producer is here THE API is king! lol
const RANDOM_QUOTE_API_URL = 'https://api.quotable.io/random'

// Selecting id quote-display
const quoteDisplayElement = document.getElementById('quote-display')

// Selecting id quoteInput
const quoteInputElement = document.getElementById('quoteInput')

// Selecting id timer
const timerElement = document.getElementById('timer')

// Selecting id quote-author
const quoteDisplayAuthor = document.getElementById('quote-author')

// Event listener
quoteInputElement.addEventListener('input', () => {
  // variable for all span tag
  const arrayQuote = quoteDisplayElement.querySelectorAll('span')
  // spliting each value of the index eg. w o r d
  const arrayValue = quoteInputElement.value.split('')

  // default logic as flag is set  to true
  let correct = true

  // function for individual text of the paragraph
  // the action part is here
  arrayQuote.forEach((characterSpan, index) => {
    // variable for each index value
    const character = arrayValue[index]

    // if input character is null then remove correct and incorrect class
    // then set the flag to false
    if (character == null) {
      characterSpan.classList.remove('correct')
      characterSpan.classList.remove('incorrect')
      correct = false
    // else if the opposite of the above action
    // but the default flag or the correct = true remains
    } else if (character === characterSpan.innerText) {
      characterSpan.classList.add('correct')
      characterSpan.classList.remove('incorrect')
    // else the last choice or action to happen is
    // remove correct class, add incorrect class if the type text
    // is wrong or did not match the quote and set flag to false
    // flag is correct = false 
    } else {
      characterSpan.classList.remove('correct')
      characterSpan.classList.add('incorrect')
      correct = false
    }
  })
  // new quote will render again if all type test are correct
  if (correct) renderNewQuote()
})

// getting the content from the server
// the manager is here
function getRandomQuote() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

// function for getting the author of the content from the server
// second manager
function getRandomQuoteauthor() {
  return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.author)
}

// function to insert the values inside our html
// js to server to our html (main actor is here)
async function renderNewQuote() {
  const quote = await getRandomQuote()
  console.log(quote)
  const author = await getRandomQuoteauthor()
  quoteDisplayAuthor.innerHTML = author
  quoteDisplayElement.innerHTML = ''
  quote.split('').forEach(character => {
    const characterSpan = document.createElement('span')
    characterSpan.innerText = character
    quoteDisplayElement.appendChild(characterSpan)
  })
  // input box will be null after completing the type correctly
  quoteInputElement.value = null
  startTimer()
}

// function for timer
let startTime
function startTimer() {
  timerElement.innerText = 0
  startTime = new Date()
  setInterval(() => {
    timer.innerText = getTimerTime()
  }, 1000)
}
// function for timer
function getTimerTime() {
  return Math.floor((new Date() - startTime) / 1000)
}

// calling the main function to make all process works
renderNewQuote()

});