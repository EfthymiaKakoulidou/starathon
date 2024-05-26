
const nav = document.querySelector('nav');

document.querySelector('#burger').addEventListener('click',(e) => {
  e.currentTarget.classList.toggle("active");
  nav.classList.toggle('show');
});

// Game Logic

// Declare the game variables
let correctAnswer;
let audio;
let themeAudio;
let amountOfQuestions;
let answersCorrect = 0;
let timer;
const TIMER_DURATION = 10;

// Declare the shuffled game data iterator
let shuffledGameDataIterator;


// Easy Mode
// Game start trigger button for youngling
let startGameEasy = document.getElementById('start-game-easy');

// Change the text of the button when the mouse hovers over it
startGameEasy.addEventListener('mouseover', function() {
    startGameEasy.textContent = 'Easy';
});

// Change the text of the button when the mouse leaves it
startGameEasy.addEventListener('mouseout', function() {
    startGameEasy.textContent = 'Youngling';
});

startGameEasy.addEventListener('click', triviaGameEasy);

// Intermediate Mode
// Game start trigger button for padawan
let startGameMedium = document.getElementById('start-game-medium');

// Change the text of the button when the mouse hovers over it
startGameMedium.addEventListener('mouseover', function() {
    startGameMedium.textContent = 'Intermediate';
});

// Change the text of the button when the mouse leaves it
startGameMedium.addEventListener('mouseout', function() {
    startGameMedium.textContent = 'Padawan';
});

// Game start trigger button for Padawan
startGameMedium.addEventListener('click', triviaGameMedium);


// Hard Mode
// Game start trigger button for Grand Master
let startGameHard = document.getElementById('start-game-hard');

// Change the text of the button when the mouse hovers over it
startGameHard.addEventListener('mouseover', function() {
    startGameHard.textContent = 'Hard';
});

// Change the text of the button when the mouse leaves it
startGameHard.addEventListener('mouseout', function() {
    startGameHard.textContent = 'Grand Master';
});

startGameHard.addEventListener('click', triviaGameHard);

// Game start youngling
function triviaGameEasy() {
  
    // "I like those odds audio"
    audio = new Audio('./static/sounds/the-mandalorian.mp3');
    audio.play();

    // Disable the startGameEasy button
    startGameEasy.disabled = true;

    setTimeout(function() {
        // Fetch the game data
        fetch('./static/js/game_data/game_data_easy.json')

        // Parse the JSON data
        .then(response => response.json())

        // Handle the parsed data and create the game
        .then(function(game_data) {

            // Set the amount of questions
            amountOfQuestions = game_data.length;

            // Shuffle the order of the game data
            let shuffledGameData = shuffleArray([...game_data]);

            // Create an iterator for the shuffled game data
            shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            // Display the first question
            displayNextQuestion();

            // Create a new Audio object
            themeAudio = new Audio('./static/sounds/cantina-band.mp3');
            themeAudio.play();
            
            // Play the audio every 26 seconds
            setInterval(function() {
                themeAudio.currentTime = 0;
                themeAudio.play();
            }, 26000); // 26000 milliseconds = 26 seconds
            
        })
        // Handle any errors
        .catch(error => console.error('Error:', error));
    }, 2400)
}

// Game start padawan
function triviaGameMedium() {
  
    // "I like those odds audio"
    audio = new Audio('./static/sounds/the-mandalorian.mp3');
    audio.play();

    // Disable the startGameMedium button
    startGameMedium.disabled = true;

    setTimeout(function() {
        // Fetch the game data
        fetch('./static/js/game_data/game_data_medium.json')

        // Parse the JSON data
        .then(response => response.json())

        // Handle the parsed data and create the game
        .then(function(game_data) {

            // Set the amount of questions
            amountOfQuestions = game_data.length;

            // Shuffle the order of the game data
            let shuffledGameData = shuffleArray([...game_data]);

            // Create an iterator for the shuffled game data
            shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            // Display the first question
            displayNextQuestion();

            // Create a new Audio object
            themeAudio = new Audio('./static/sounds/cantina-band.mp3');
            themeAudio.play();
            
            // Play the audio every 26 seconds
            setInterval(function() {
                themeAudio.currentTime = 0;
                themeAudio.play();
            }, 26000); // 26000 milliseconds = 26 seconds
            
        })
        // Handle any errors
        .catch(error => console.error('Error:', error));
    }, 2400)
}

// Game start Grand Master
function triviaGameHard() {
  
    // "I like those odds audio"
    audio = new Audio('./static/sounds/the-mandalorian.mp3');
    audio.play();

    // Disable the startGameHard button
    startGameHard.disabled = true;

    setTimeout(function() {
        // Fetch the game data
        fetch('./static/js/game_data/game_data_hard.json')

        // Parse the JSON data
        .then(response => response.json())

        // Handle the parsed data and create the game
        .then(function(game_data) {

            // Set the amount of questions
            amountOfQuestions = game_data.length;

            // Shuffle the order of the game data
            let shuffledGameData = shuffleArray([...game_data]);

            // Create an iterator for the shuffled game data
            shuffledGameDataIterator = shuffledGameData[Symbol.iterator]();

            // Display the first question
            displayNextQuestion();

            // Create a new Audio object
            themeAudio = new Audio('./static/sounds/cantina-band.mp3');
            themeAudio.play();
            
            // Play the audio every 26 seconds
            setInterval(function() {
                themeAudio.currentTime = 0;
                themeAudio.play();
            }, 26000); // 26000 milliseconds = 26 seconds
            
        })
        // Handle any errors
        .catch(error => console.error('Error:', error));
    }, 2400)
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
        stopTimer();
        themeAudio.pause();
        themeAudio.currentTime = 0;
    
        let message;
        let imageSrc;
    
        if (answersCorrect >= 3) {
            audio = new Audio('./static/sounds/vader-force-strong.mp3');
            audio.play();
            imageSrc = './static/images/success.jpg'; 
        } else {
            audio = new Audio('');
            audio.play();
            imageSrc = './static/images/failure.png'; 
        }
    
        document.getElementById('timer').textContent = null;
        gameArea.innerHTML = `<h1>You scored ${answersCorrect} out of ${amountOfQuestions}</h1>
                              <h2>No more questions</h2>
                              <img src="${imageSrc}" alt="result image" class="result-image">
                              <div>
                                  <button id="return-home" type="button" class="game-start" aria-label="button to return to home page">
                                      Return to Home
                                  </button>
                              </div>`;
    
                              let returnHome = document.getElementById('return-home');
                              returnHome.addEventListener('click', function() {
                                  audio = new Audio('./static/sounds/roger-roger-sound.mp3');
                                  audio.play();
                                  setTimeout(function() {
                                      window.location.href = 'index.html';
                                  }, 1900);
        });
    
        return;
    }

    // Shuffle the answers and generate the HTML
    let shuffledAnswers = shuffleArray([...nextItem.value.answers]);
    let html = generateQuestionHTML(nextItem, shuffledAnswers);
    gameArea.innerHTML = html;

    // Attach event listeners to the answers and next question button
    attachAnswerListeners(shuffledAnswers, nextItem);
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
                answersCorrect++;
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

// Start Timer function
function startTimer() {
    let timeLeft = TIMER_DURATION;
    document.getElementById('timer').classList.add('countdown');
    document.getElementById('timer').textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            modalMessage.textContent = 'Time is up!';
            modal.style.display = "block";
        }
    }, 1000);
}

// Stop Timer function
function stopTimer() {
    clearInterval(timer);
    document.getElementById('timer').classList.remove('countdown');
}
