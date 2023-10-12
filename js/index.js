const openInstructions = document.querySelector("#instructions");
const modalOverlay = document.querySelector(".instruction-modal");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close-modal");
const h1 = document.querySelector(".header");
//const indexMusic= new Audio('./sounds/psycho.mp3');

//indexMusic.play();

document.addEventListener("mousemove", () => {
  const indexMusic= new Audio('./sounds/psycho.mp3');
  console.log(indexMusic)
  indexMusic.play().then();
});

openInstructions.addEventListener("click", () => {
  modalOverlay.classList.toggle("active");
  modal.classList.toggle("active");
});

closeModal.addEventListener("click", () => {
  modalOverlay.classList.toggle("active");
  modal.classList.toggle("active");
});


