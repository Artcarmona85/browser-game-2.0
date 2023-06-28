// Define the sets of images for each symbol
const symbolSets = [
    ['https://media.giphy.com/media/MBU6dD2EutKbglilYg/giphy.gif', 'https://media.giphy.com/media/MBU6dD2EutKbglilYg/giphy.gif', 'https://media.giphy.com/media/MBU6dD2EutKbglilYg/giphy.gif'],
    ['https://media.giphy.com/media/FeFR6DSKQdWhOnvzH8/giphy.gif', 'https://media.giphy.com/media/FeFR6DSKQdWhOnvzH8/giphy.gif', 'https://media.giphy.com/media/FeFR6DSKQdWhOnvzH8/giphy.gif'],
    ['https://media.giphy.com/media/gLiMHZr8AAUtMyaYsI/giphy.gif', 'https://media.giphy.com/media/gLiMHZr8AAUtMyaYsI/giphy.gif', 'https://media.giphy.com/media/gLiMHZr8AAUtMyaYsI/giphy.gif'],
    ['https://media.giphy.com/media/xT0GqtV1VQYjQIH5OE/giphy.gif', 'https://media.giphy.com/media/xT0GqtV1VQYjQIH5OE/giphy.gif', 'https://media.giphy.com/media/xT0GqtV1VQYjQIH5OE/giphy.gif']
  ];
  
  // Get the necessary elements from the DOM
const symbol1 = document.getElementById('symbol1');
const symbol2 = document.getElementById('symbol2');
const symbol3 = document.getElementById('symbol3');
const betAmountInput = document.getElementById('betAmount');
const spinButton = document.getElementById('spinButton');
const cashOutButton = document.getElementById('cashOutButton');
const result = document.getElementById('result');
const balanceAmount = document.getElementById('balanceAmount');

let balance = 100;
let maxWin = 300;
let spinning = false;

// Function to randomly select an image from a symbol set
function getRandomImage(setIndex) {
  const set = symbolSets[setIndex];
  const randomIndex = Math.floor(Math.random() * set.length);
  return set[randomIndex];
}

// Function to spin the reels
function spinReels() {
  if (spinning) return;

  // Clear the previous result
  result.textContent = '';

  // Disable the spin button and cash out button during spinning
  spinButton.disabled = true;
  cashOutButton.disabled = true;

  // Disable the bet amount input while spinning
  betAmountInput.disabled = true;

  // Set the spinning flag
  spinning = true;

  // Generate random images for each reel
  const image1 = getRandomImage(0);
  const image2 = getRandomImage(1);
  const image3 = getRandomImage(2);

  // Display the images on the reels
  symbol1.innerHTML = `<img src="${image1}" alt="Symbol 1" />`;
  symbol2.innerHTML = `<img src="${image2}" alt="Symbol 2" />`;
  symbol3.innerHTML = `<img src="${image3}" alt="Symbol 3" />`;

  // Get the bet amount and convert it to a number
  const betAmount = parseInt(betAmountInput.value, 10);

  // Check if the bet amount is a valid number
  if (isNaN(betAmount)) {
    result.textContent = 'Invalid bet amount';
    finishSpin();
    return;
  }

  // Check for a win
  if (image1 === image2 && image2 === image3) {
    const winnings = betAmount * 2;
    balance += winnings;
    result.textContent = `You win $${winnings}!`;
  } else {
    balance -= betAmount;
    result.textContent = 'Try again';
  }

  // Update the balance
  balanceAmount.textContent = balance;

  // Check if the game is over (reached the maximum win limit or balance is 0)
  if (balance >= maxWin) {
    result.textContent = 'Game Over!';
    spinButton.disabled = true;
    cashOutButton.disabled = false;
  } else if (balance <= 0) {
    result.textContent = 'Out of funds! Game Over!';
    spinButton.disabled = true;
    cashOutButton.disabled = false;
  }

  // Finish the spin and enable buttons/input
  finishSpin();
}

// Function to finish the spin and enable buttons/input
function finishSpin() {
  // Reset the spinning flag
  spinning = false;

  // Enable the spin button, cash out button, and bet amount input after spinning
  spinButton.disabled = false;
  cashOutButton.disabled = false;
  betAmountInput.disabled = false;
}

// Function to cash out and end the game
function cashOut() {
  alert(`Congratulations! You cashed out $${balance}. Game Over!`);
  location.reload(); // Reload the page to start a new game
}

// Add a click event listener to the spin button
spinButton.addEventListener('click', spinReels);

// Add a click event listener to the cash out button
cashOutButton.addEventListener('click', cashOut);