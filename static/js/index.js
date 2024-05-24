
const nav = document.querySelector('nav');

document.querySelector('#burger').addEventListener('click',(e) => {
  e.currentTarget.classList.toggle("active");
  nav.classList.toggle('show');
});

fetchGameData();
function fetchGameData() {
    fetch('./static/js/game_data/game_data.json')
    .then(response => response.json())
    .then(function(game_data) {
        console.log(game_data);
    })
    .catch(error => console.error('Error:', error));
}
