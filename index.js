// PLAYER DATA
const player = {
    name: "Boaz Marube",
    chips: 10000
};

// GAME STATE VARIABLES
let cards = [];                  // Array to hold drawn cards
let totalSum = 0;                // Sum of card values
let hasBlackJack = false;        // Track if player hit 21
let isAlive = false;             // Track if player is still in game
let gameMessage = "";            // Current message to display

// DOM ELEMENT REFERENCES
const messageEl = document.getElementById("message-el");
const sumEl = document.getElementById("sum-el");
const cardsEl = document.getElementById("cards-el");
const playerEl = document.getElementById("player-el");

// Display player's name and chips
playerEl.textContent = `${player.name}: Ksh ${player.chips}`;

// FUNCTION: Generate Random Card
function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    if (randomNumber > 10) {
        return 10;     // Face cards are worth 10
    } else if (randomNumber === 1) {
        return 11;     // Ace is worth 11
    } else {
        return randomNumber;
    }
}

// FUNCTION: Start New Game
function startGame() {
    isAlive = true;
    hasBlackJack = false;
    cards = [];             // Reset cards array
    totalSum = 0;           // Reset total sum

    // Draw two initial cards
    const firstCard = getRandomCard();
    const secondCard = getRandomCard();
    cards.push(firstCard, secondCard);
    totalSum = firstCard + secondCard;

    renderGame();
}

// ====== FUNCTION: Render Game State ======
function renderGame() {
    // Display drawn cards
    cardsEl.textContent = "Cards: ";
    cards.forEach(card => {
        cardsEl.textContent += `${card} `;
    });

    // Display current total sum
    sumEl.textContent = `Sum: ${totalSum}`;

    // Determine game message based on sum
    if (totalSum < 21) {
        gameMessage = "Do you want to draw a new card?";
    } else if (totalSum === 21) {
        gameMessage = "You've got Blackjack!";
        hasBlackJack = true;
    } else {
        gameMessage = "You're out of the game!";
        isAlive = false;
    }

    // Display message
    messageEl.textContent = gameMessage;
}

// ====== FUNCTION: Draw New Card ======
function drawNewCard() {
    if (isAlive && !hasBlackJack) {
        const newCard = getRandomCard();
        cards.push(newCard);
        totalSum += newCard;
        renderGame();
    }
}
