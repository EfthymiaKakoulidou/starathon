
const nav = document.querySelector('nav');

document.querySelector('#burger').addEventListener('click',(e) => {
  e.currentTarget.classList.toggle("active");
  nav.classList.toggle('show');
});

// Game Logic

let shuffledGameDataIterator;

// Trigger the fetchGameData function when the page is loaded
fetchGameData();
function fetchGameData() {
    fetch('./static/js/game_data/game_data.json')
    .then(response => response.json())
    .then(function(game_data) {

        // Shuffle the order of the game data
        let shuffledGameData = shuffleArray([...game_data]);
        console.log(shuffledGameData);

        // Create an iterator for the shuffled game data
        shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

        // Display the first question
        displayNextQuestion();
        
    })
    .catch(error => console.error('Error:', error));
}

// Shuffle an array's elements order
function shuffleArray(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;

    }

    return array;
}

// Display the next question
function displayNextQuestion() {
    let nextItem = shuffledGameDataIterator.next();
    if (!nextItem.done) {
        // Display the question and answers
        console.log(nextItem.value.question);
        console.log(nextItem.value.answers[0]);
        console.log(nextItem.value.answers[1]);
        console.log(nextItem.value.answers[2]);
        console.log(nextItem.value.answers[3]);
    } else {
        console.log('No more questions');
    }
}

// Add a click event listener to the button
let button = document.getElementById('next-question-button');
button.addEventListener('click', displayNextQuestion);
