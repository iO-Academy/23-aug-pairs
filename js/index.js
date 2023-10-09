const openInstructions = document.querySelector("#instructions");
const modal = document.querySelector(".instruction-modal");
const closeModal = document.querySelector(".close-modal");

openInstructions.addEventListener("click", () => {
  modal.classList.toggle("active");
});

closeModal.addEventListener("click", () => {
  modal.classList.toggle("active");
});
