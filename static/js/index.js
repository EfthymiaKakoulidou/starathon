
const nav = document.querySelector('nav');

document.querySelector('#burger').addEventListener('click',(e) => {
  e.currentTarget.classList.toggle("active");
  nav.classList.toggle('show');
});

// Game Logic

// Declare the shuffled game data iterator
let shuffledGameDataIterator;

// Game start trigger button
let startGame = document.getElementById('start-game-button');
startGame.addEventListener('click', triviaGame);

function triviaGame() {

    // Fetch the game data
    fetch('./static/js/game_data/game_data.json')

    // Parse the JSON data
    .then(response => response.json())

    // Handle the parsed data and create the game
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

    // Create a copy of the array
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

    // Get the next item from the shuffled game data
    let nextItem = shuffledGameDataIterator.next();

    // Get the game area element
    let gameArea = document.getElementById('game-area');

    if (!nextItem.done) {

        // Shuffle the answers
        let shuffledAnswers = shuffleArray([...nextItem.value.answers]);
        
        // Create the HTML for the question and answers
        let html = `<h2>${nextItem.value.question}</h2>`;
        shuffledAnswers.forEach((answer, index) => {
            html += `<div><input type="radio" id="answer${index}" name="answer" value="${answer}">
                     <label for="answer${index}">${answer}</label></div>`;
        });
        html += `<button id="next-question-button" type="button" class="game-start"
                 aria-label="Button for next trivia question.">Next Question</button>`;

        // Add the HTML to the game area
        gameArea.innerHTML = html;

        // Add a click event listener to the next question button
        let nextQuestionButton = document.getElementById('next-question-button');
        nextQuestionButton.addEventListener('click', displayNextQuestion);

    } else {
        gameArea.innerHTML = '<h2>No more questions</h2>';
    }
}

