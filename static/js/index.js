
const nav = document.querySelector('nav');

document.querySelector('#burger').addEventListener('click',(e) => {
  e.currentTarget.classList.toggle("active");
  nav.classList.toggle('show');
});

// Game Logic

let timer;
const TIMER_DURATION = 10;

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
    // Handle any errors
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
    startTimer();

    // Get the next item from the shuffled game data iterator
    let nextItem = shuffledGameDataIterator.next();

    // Get the game area element
    let gameArea = document.getElementById('game-area');

    // If there are no more questions, display a message
    if (nextItem.done) {
        gameArea.innerHTML = '<h2>No more questions</h2>';
        return;
    }

    // Shuffle the answers and generate the HTML
    let shuffledAnswers = shuffleArray([...nextItem.value.answers]);
    let html = generateQuestionHTML(nextItem, shuffledAnswers);
    gameArea.innerHTML = html;

    // Attach event listeners to the answers and next question button
    attachAnswerListeners(shuffledAnswers, nextItem);
    attachNextQuestionListener();
}

// Generate the HTML for the question and answers
function generateQuestionHTML(nextItem, shuffledAnswers) {

    // Generate the HTML for the question
    let html = `<h2>${nextItem.value.question}</h2>`;

    // Generate the HTML for the answers
    shuffledAnswers.forEach((answer, index) => {
        html += `<div><input type="radio" id="answer${index}" name="answer" value="${answer}">
                 <label for="answer${index}">${answer}</label></div>`;
    });

    // Generate the HTML for the next question button
    html += `<button id="next-question-button" type="button" class="game-start"
             aria-label="Button for next trivia question.">Next Question</button>`;

    // Return the generated HTML
    return html;
}

// Get the modal
let modal = document.getElementById('answerModal');
let modalMessage = document.getElementById('modal-message');

// Attach event listeners to the possible answers
function attachAnswerListeners(shuffledAnswers, nextItem) {

    // Attach event listeners to the answers
    shuffledAnswers.forEach((answer, index) => {

        // Get the answer element
        let answerElement = document.getElementById(`answer${index}`);
        answerElement.addEventListener('click', function() {
            stopTimer();

            // Display the modal with the result of the answer
            if (answer === nextItem.value.correctAnswer) {
                modalMessage.textContent = 'Correct!';
            } else {
                modalMessage.textContent = 'Incorrect. The correct answer was ' + nextItem.value.correctAnswer;
            }
            modal.style.display = "block";
        });
    });
}

// Attach event listener to the next question modal button
let nextQuestionModalButton = document.getElementById('next-question-modal-button');
nextQuestionModalButton.addEventListener('click', function() {
    modal.style.display = "none";
    displayNextQuestion();
});

// Attach event listener to the next question button
function attachNextQuestionListener() {
    let nextQuestionButton = document.getElementById('next-question-button');
    nextQuestionButton.addEventListener('click', displayNextQuestion);
}

function startTimer() {
    let timeLeft = TIMER_DURATION;
    document.getElementById('timer').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            displayNextQuestion();
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timer);
}
