// gets the value inside the local storage called score. If there are no values set default values
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

function updateScore() {
  document.querySelector('.scores').innerText = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

updateScore();

function pickComputerMove() {
  const randomNumber = Math.random();
  
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    return 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    return 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    return 'scissors';
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  
  let result = '';
  
  if (playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'It\'s a tie!';
    } else if (computerMove === 'scissors') {
      result = 'You win!';
    } else {
      result = 'You lose!';
    }
  } else if (playerMove === 'paper') {
    if (computerMove === 'paper') {
      result = 'It\'s a tie!';
    } else if (computerMove === 'rock') {
      result = 'You win!';
    } else {
      result = 'You lose!';
    }
  } else if (playerMove === 'scissors') {
    if (computerMove === 'scissors') {
      result = 'It\'s a tie!';
    } else if (computerMove === 'paper') {
      result = 'You win!';
    } else {
      result = 'You lose!';
    }
}
  
  if (result === 'You win!') {
    score.wins += 1;
  } else if (result === 'You lose!') {
    score.losses += 1;
  } else if (result === 'It\'s a tie!') {
    score.ties += 1;
  }
  
  
  // Stores the score values inside the local storage called score
  localStorage.setItem('score', JSON.stringify(score));
  
  document.querySelector('.result').innerText = result;
  document.querySelector('.game-move').innerHTML = `You <img src="${playerMove}-emoji.png" class="move-icon"> <img src="${computerMove}-emoji.png" class="move-icon"> Computer`;
  updateScore();
}