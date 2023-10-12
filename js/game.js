const cardArray = [
  {
    id: 0,
    name: "spider",
    image: "assets/svgs/spider-solid.svg",
    pictureid: 0,
    matched: false,
  },
  {
    id: 1,
    name: "ghost",
    image: "assets/svgs/ghost-solid.svg",
    pictureid: 1,
    matched: false,
  },
  {
    id: 2,
    name: "crow",
    image: "assets/svgs/crow-solid.svg",
    pictureid: 2,
    matched: false,
  },
  {
    id: 3,
    name: "bat",
    image: "assets/svgs/bat.svg",
    pictureid: 3,
    matched: false,
  },
  {
    id: 4,
    name: "broom",
    image: "assets/svgs/broom-solid.svg",
    pictureid: 4,
    matched: false,
  },
  {
    id: 5,
    name: "hat",
    image: "assets/svgs/hat-wizard-solid.svg",
    pictureid: 5,
    matched: false,
  },
  {
    id: 6,
    name: "spider",
    image: "assets/svgs/spider-solid.svg",
    pictureid: 0,
    matched: false,
  },
  {
    id: 7,
    name: "ghost",
    image: "assets/svgs/ghost-solid.svg",
    pictureid: 1,
    matched: false,
  },
  {
    id: 8,
    name: "crow",
    image: "assets/svgs/crow-solid.svg",
    pictureid: 2,
    matched: false,
  },
  {
    id: 9,
    name: "bat",
    image: "assets/svgs/bat.svg",
    pictureid: 3,
    matched: false,
  },
  {
    id: 10,
    name: "broom",
    image: "assets/svgs/broom-solid.svg",
    pictureid: 4,
    matched: false,
  },
  {
    id: 11,
    name: "hat",
    image: "assets/svgs/hat-wizard-solid.svg",
    pictureid: 5,
    matched: false,
  },
];

const convertSeconds = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
};

let time = 0;
let timerRunning = false;
let timer;

const toggleTimer = (running) => {
  if (running) {
    timerRunning = true;
    timer = setInterval(() => {
      time++;
      const timer = document.querySelector("#timer");
      timer.innerHTML = `Time<br> ${convertSeconds(time)}`;
    }, 1000);
  }
  if (!running) {
    clearInterval(timer);
  }
};

const shuffle = (cards) => {
  return cards.sort(() => Math.random() - 0.5);
};

const shuffledCardArray = shuffle(cardArray);
const overlay = document.querySelector(".overlay");
const cardGrid = document.querySelector("#card-grid");
let clickCounter = 1;
let firstClick;
let turnCounter = 0;
let turnDisplay = document.querySelector("#turns-p");
let matchCounter = 0;
let totalTurns = document.querySelector("#total-turns");

const soundButton = document.querySelector("#sound-button");
let musicPlaying = false;
let music = new Audio("assets/sounds/psycho.mp3");
music.volume = 0.6;
soundButton.addEventListener("click", () => {
  if (musicPlaying) {
    music.pause();
    soundButton.innerHTML =
      "Play Sounds <i class='fa-solid fa-volume-high'></i>";
  } else {
    music.play();
    soundButton.innerHTML =
      "Mute Sounds <i class='fa-solid fa-volume-xmark'></i>";
  }
  musicPlaying = !musicPlaying;
});

const flipCards = () => {
  const flippedCards = document.querySelectorAll(".flipped");
  flippedCards.forEach((flippedCard) => {
    flippedCard.classList.add("card-flip-step1");
    flippedCard.addEventListener("transitionend", () => {
      flippedCard.style.backgroundImage =
        "url('./assets/svgs/grim-reaper.svg')";
      flippedCard.style.backgroundColor = "#000000";
      flippedCard.classList.remove("card-flip-step2");
      flippedCard.classList.remove("card-flip-step1");
    });
    flippedCard.classList.remove("card-flip-step2");
    flippedCard.classList.remove("flipped");
    overlay.style.display = "none";
  });
};

let knife = new Audio("assets/sounds/knife-being-sharpened-99632.mp3");
knife.volume = 0.3;
let boneCrack = new Audio("assets/sounds/bone-crack-121580.mp3");
boneCrack.volume = 0.3;
let scaryLaugh = new Audio("assets/sounds/scary-laugh-123862 (1).mp3");

const addClickEvents = (card, cardInfo) => {
  card.addEventListener("click", () => {
    timerRunning ? null : toggleTimer(true);
    musicPlaying ? knife.play() : null;
    card.classList.add("card-flip-step1");
    card.addEventListener("transitionend", () => {
      card.style.backgroundImage = `url(${cardInfo.image})`;
      card.style.backgroundColor = "#83060e";
      card.classList.remove("card-flip-step1");
      card.classList.add("card-flip-step2");
    });

    if (
      clickCounter % 2 === 0 &&
      card.classList.contains("matched") === false
    ) {
      card.classList.add("flipped");
      if (
        cardInfo.id !== firstClick.id &&
        cardInfo.pictureid !== firstClick.pictureid
      ) {
        clickCounter++;
        overlay.style.display = "block";
        setTimeout(flipCards, 1000);
      } else if (cardInfo.id !== firstClick.id) {
        const flippedCards = document.querySelectorAll(".flipped");
        flippedCards.forEach((flippedCard) => {
          flippedCard.classList.remove("flipped");
          flippedCard.classList.add("matched");
        });
        clickCounter++;
        matchCounter += 2;
        musicPlaying ? boneCrack.play() : null;
        if (matchCounter === cardArray.length) {
          toggleTimer(false);
          setTimeout(displayEndGame, 1000);
        }
      }
    } else if (card.classList.contains("matched") === false) {
      card.classList.add("flipped");
      firstClick = cardInfo;
      turnCounter++;
      turnDisplay.innerHTML = `Turn <br> ${turnCounter}`;
      clickCounter++;
    }
  });
};

shuffledCardArray.map((cardInfo) => {
  const newCard = document.createElement("div");
  newCard.classList.add("card");
  cardGrid.appendChild(newCard);
  addClickEvents(newCard, cardInfo);
});

const displayEndGame = () => {
  const endModal = document.querySelector(".end-modal");
  const modal = document.querySelector(".modal");
  const totalTime = document.querySelector("#total-time");
  endModal.classList.toggle("active");
  modal.classList.toggle("active");
  totalTurns.innerText = "You took " + turnCounter + " turns to win.";
  totalTime.innerText = `It took you ${convertSeconds(time)}... SLOOOW!`;
  musicPlaying ? scaryLaugh.play() : null;
};
