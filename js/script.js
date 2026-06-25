"use strict";

/*====================================================
        MEMORY CARD GAME - PROFESSIONAL VERSION
                  PART 3A
====================================================*/

/*=============================
        GAME ICONS
=============================*/

const icons = [
    "fa-heart",
    "fa-star",
    "fa-moon",
    "fa-bolt",
    "fa-music",
    "fa-camera",
    "fa-gamepad",
    "fa-rocket"
];

/* Duplicate icons to create pairs */
let cards = [...icons, ...icons];

/*=============================
        DOM ELEMENTS
=============================*/

const gameBoard = document.getElementById("gameBoard");

const movesElement = document.getElementById("moves");

const timerElement = document.getElementById("timer");

const pairsElement = document.getElementById("pairs");

const restartButton = document.getElementById("restart");

const playAgainButton = document.getElementById("playAgain");

const modal = document.getElementById("winModal");

const finalMoves = document.getElementById("finalMoves");

const finalTime = document.getElementById("finalTime");

const confettiContainer =
document.getElementById("confetti-container");

/*=============================
        GAME VARIABLES
=============================*/

let firstCard = null;

let secondCard = null;

let lockBoard = false;

let moves = 0;

let matchedPairs = 0;

let seconds = 0;

let timerStarted = false;

let timerInterval;

/*=============================
        SHUFFLE
=============================*/

function shuffle(array){

    for(let i=array.length-1;i>0;i--){

        const j=Math.floor(Math.random()*(i+1));

        [array[i],array[j]]=[array[j],array[i]];

    }

}

/*=============================
        TIMER
=============================*/

function startTimer(){

    timerInterval=setInterval(()=>{

        seconds++;

        const min=Math.floor(seconds/60);

        const sec=seconds%60;

        timerElement.textContent=

        String(min).padStart(2,"0")

        +":"

        +String(sec).padStart(2,"0");

    },1000);

}

/*=============================
      CREATE GAME BOARD
=============================*/

function createBoard(){

    gameBoard.innerHTML="";

    shuffle(cards);

    cards.forEach(icon=>{

        const card=document.createElement("div");

        card.className="card";

        card.dataset.icon=icon;

        card.innerHTML=`

            <div class="front">

                <i class="fa-solid ${icon}"></i>

            </div>

            <div class="back">

                <i class="fa-solid fa-brain"></i>

            </div>

        `;

        card.addEventListener(

            "click",

            flipCard

        );

        gameBoard.appendChild(card);

    });

}

/*=============================
        RESET TURN
=============================*/

function resetTurn(){

    firstCard=null;

    secondCard=null;

    lockBoard=false;

}

/*=============================
      START NEW GAME
=============================*/

function initializeGame(){

    moves=0;

    matchedPairs=0;

    seconds=0;

    timerStarted=false;

    clearInterval(timerInterval);

    movesElement.textContent="0";

    pairsElement.textContent="0";

    timerElement.textContent="00:00";

    firstCard=null;

    secondCard=null;

    lockBoard=false;

    createBoard();

}

/*=============================
        EVENTS
=============================*/

restartButton.addEventListener(

    "click",

    initializeGame

);

playAgainButton.addEventListener(

    "click",

    ()=>{

        modal.classList.remove("show");

        initializeGame();

    }

);

/*=============================
      START GAME
=============================*/

initializeGame();

/*====================================================
            PART 3B CONTINUES...
====================================================*/
/*====================================================
            MEMORY CARD GAME
                PART 3B
====================================================*/

/*=============================
        FLIP CARD
=============================*/

function flipCard() {

    if (lockBoard) return;

    if (this === firstCard) return;

    if (!timerStarted) {
        timerStarted = true;
        startTimer();
    }

    this.classList.add("flip");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;

    moves++;
    movesElement.textContent = moves;

    checkMatch();

}

/*=============================
        CHECK MATCH
=============================*/

function checkMatch() {

    if (firstCard.dataset.icon === secondCard.dataset.icon) {

        disableCards();

    } else {

        unflipCards();

    }

}

/*=============================
        MATCH FOUND
=============================*/

function disableCards() {

    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    matchedPairs++;

    pairsElement.textContent = matchedPairs;

    resetTurn();

    if (matchedPairs === 8) {

        clearInterval(timerInterval);

        setTimeout(() => {

            showWinModal();

            launchConfetti();

        }, 600);

    }

}

/*=============================
        WRONG MATCH
=============================*/

function unflipCards() {

    lockBoard = true;

    firstCard.classList.add("shake");
    secondCard.classList.add("shake");

    setTimeout(() => {

        firstCard.classList.remove("shake");
        secondCard.classList.remove("shake");

    }, 400);

    setTimeout(() => {

        firstCard.classList.remove("flip");
        secondCard.classList.remove("flip");

        resetTurn();

    }, 900);

}

/*=============================
        WIN MODAL
=============================*/

function showWinModal() {

    finalMoves.textContent = moves;

    finalTime.textContent = timerElement.textContent;

    modal.classList.add("show");

}

/*=============================
        CONFETTI
=============================*/

function launchConfetti() {

    confettiContainer.innerHTML = "";

    const colors = [

        "#ff4d4d",
        "#00d4ff",
        "#ffe600",
        "#4cff88",
        "#ff7df3",
        "#ffffff"

    ];

    for (let i = 0; i < 180; i++) {

        const piece = document.createElement("div");

        piece.className = "confetti";

        piece.style.left = Math.random() * 100 + "%";

        piece.style.background =
            colors[Math.floor(Math.random() * colors.length)];

        piece.style.animationDelay =
            Math.random() * 2 + "s";

        piece.style.animationDuration =
            3 + Math.random() * 2 + "s";

        piece.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        confettiContainer.appendChild(piece);

    }

    setTimeout(() => {

        confettiContainer.innerHTML = "";

    }, 6000);

}

/*=============================
        KEYBOARD SHORTCUT
=============================*/

document.addEventListener("keydown", (e) => {

    if (e.key === "r" || e.key === "R") {

        initializeGame();

    }

});

/*=============================
        END OF FILE
=============================*/
