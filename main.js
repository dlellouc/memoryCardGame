
// html and css from https://codepen.io/eladcandroid/pen/RwQjGWK?editors=1111

// cards array
const cardsArray = [    
    '&#128525;','&#128525;',
    '&#128561;','&#128561;',
    '&#128564;','&#128564;',
    '&#128520;','&#128520;',
    '&#128545;','&#128545;',
    '&#129313;','&#129313;'
];

let shuffledCardsArray = cardsArray.map(function(item) {     // duplicating cardsArray
    return item;
});


// game cards
let cards = document.querySelectorAll('.card');

let flippedNotConfirmedCards = [];              // flipped cards that are not tagged as 'foundCard'; array's length <= 2

let score = 0;                                  // bonus 2

let tries = 0;                                  // bonus 3
let gameOver = false;

cards.forEach(card => {
	card.addEventListener('click', function(e) {
        let cardInner = card.querySelector('.inner');
        let cardBack = cardInner.querySelector('.back');

		if (!gameOver && !cardBack.classList.contains('foundCard') && flippedNotConfirmedCards.length < 2) {
            // flip a card only if it is not game over
            // and if the card is not a found card 
            // and if there is no more than 1 not confirmed card already flipped 

            cardInner.classList.add('flipped');
            flippedNotConfirmedCards.push(card);

            if (flippedNotConfirmedCards.length == 2) {
                let flippedCardInner1 = flippedNotConfirmedCards[0].querySelector('.inner');
                let cardBack1 = flippedCardInner1.querySelector('.back');

                let flippedCardInner2 = flippedNotConfirmedCards[1].querySelector('.inner');
                let cardBack2 = flippedCardInner2.querySelector('.back');
                
                if (cardBack1.innerHTML === cardBack2.innerHTML) {      // if it is a match, tag them as 'foundCard'
                    setTimeout(function() {
                        cardBack1.classList.add('foundCard');
                        cardBack2.classList.add('foundCard');
                    }, 1000);

                    score++;                                                        // and add 1 to the score, and refresh the display
                    let scoreDisplay = document.querySelector('.scoreDisplay');
                    scoreDisplay.innerText = 'Your score is : ' + score;

                } else {                                                // if is not a match, flip back the cards
                    setTimeout(function() {
                        flippedCardInner1.classList.remove('flipped');
                        flippedCardInner2.classList.remove('flipped');
                    }, 1000);
                }

                flippedNotConfirmedCards.pop();                        // in both cases, remove the cards from 'flippedNotConfirmedCards'
                flippedNotConfirmedCards.pop();

                tries++;
                if (score === 0 && tries >= (shuffledCardsArray.length / 2)) {
                    gameOver = true;
                    let scoreDisplay = document.querySelector('.scoreDisplay');
                    scoreDisplay.innerText = 'Game Over';
                }
            }
        }
	})
});


// functions
function shuffleArray(array) {                                              // found on the web
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}


function startNewGame() {
    shuffleArray(shuffledCardsArray);                                               // shuffle the cards

    flippedNotConfirmedCards = [];                                                  // reset
    
    score = 0;
    let scoreDisplay = document.querySelector('.scoreDisplay');
    scoreDisplay.innerText = 'Your score is : ' + score;
    
    tries = 0;
    gameOver = false;

    cards.forEach(card => {
	    const cardInner = card.querySelector('.inner');
        const cardBack = cardInner.querySelector('.back');

        cardInner.classList.remove('flipped');                                      // reset
        cardBack.classList.remove('foundCard');

        cardBack.innerHTML = shuffledCardsArray[cardInner.getAttribute('value')];   // replace previous innerHTML
    });
}


// Bonus 1 : button to shuffle the cards
let header = document.querySelector('header');

let newGameBtnDiv = document.createElement('div');
let newGameBtn = document.createElement('button');
newGameBtn.type = 'button';
newGameBtn.innerText = 'Start New Game';
newGameBtn.addEventListener('click', startNewGame);

header.style.display = 'block';
newGameBtnDiv.append(newGameBtn);
header.append(newGameBtnDiv);


// Bonus 2 : variable 'score' and score display
let scoreDisplay = document.createElement('h4');
scoreDisplay.classList.add('scoreDisplay');
scoreDisplay.innerText = 'Your score is : ' + score;

header.append(scoreDisplay);


// Bonus 3 : game over, for example if no match after (number of cards / 2) tries





startNewGame();
