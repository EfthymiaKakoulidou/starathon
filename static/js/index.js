
const nav = document.querySelector('nav');

document.querySelector('#burger').addEventListener('click',(e) => {
  e.currentTarget.classList.toggle("active");
  nav.classList.toggle('show');
});

// Trigger the fetchGameData function when the page is loaded
fetchGameData();
function fetchGameData() {
    fetch('./static/js/game_data/game_data.json')
    .then(response => response.json())
    .then(function(game_data) {

        // Shuffle the order of the game data
        let shuffledGameData = shuffleArray([...game_data]);
        console.log(shuffledGameData);
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
