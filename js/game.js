const cardArray = [
    {
        id: 0,
        name: "spider",
        image: "assets/svgs/spider-solid.svg",
        pictureid: 0,
    },
    {
        id: 1,
        name: "ghost",
        image: "assets/svgs/ghost-solid.svg",
        pictureid: 1,
    },
    {
        id: 2,
        name: "crow",
        image: "assets/svgs/crow-solid.svg",
        pictureid: 2,
    },
    {
        id: 3,
        name: "bat",
        image: "assets/svgs/bat.svg",
        pictureid: 3,
    },
    {
        id: 4,
        name: "broom",
        image: "assets/svgs/broom-solid.svg",
        pictureid: 4,
    },
    {
        id: 5,
        name: "hat",
        image: "assets/svgs/hat-wizard-solid.svg",
        pictureid: 5,
    },
    {
        id: 6,
        name: "spider",
        image: "assets/svgs/spider-solid.svg",
        pictureid: 0,
    },
    {
        id: 7,
        name: "ghost",
        image: "assets/svgs/ghost-solid.svg",
        pictureid: 1,
    },
    {
        id: 8,
        name: "crow",
        image: "assets/svgs/crow-solid.svg",
        pictureid: 2,
    },
    {
        id: 9,
        name: "bat",
        image: "assets/svgs/bat.svg",
        pictureid: 3,
    },
    {
        id: 10,
        name: "broom",
        image: "assets/svgs/broom-solid.svg",
        pictureid: 4,
    },
    {
        id: 11,
        name: "hat",
        image: "assets/svgs/hat-wizard-solid.svg",
        pictureid: 5,
    },
];

const shuffle = (cards) => {
    return cards.sort(() => Math.random() - 0.5);
};

const shuffledCardArray = shuffle(cardArray);

const cardGrid = document.querySelector("#card-grid");

let clickCounter = 1;
let firstClick;

shuffledCardArray.map((card) => {
    const newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.dataset.url = card.image;
    cardGrid.appendChild(newCard);
    newCard.addEventListener('click', () => {
        newCard.style.backgroundImage = `url(${card.image})`;
        if (clickCounter % 2 === 0 && clickCounter !== 0) {
            if (card.id !== firstClick) {
                clickCounter++;
                console.log('different card')
            }
            // console.log('second click');
            // console.log(card.id);
        } else {
            firstClick = card.id;
            console.log(firstClick);
            clickCounter++;
            console.log('first click');
        }
    })
});

