let cardDuration = 1000; // The time in Milli Seconds

let timer = document.querySelector(".info .time span");

let cardsContainer = document.querySelector(".game-blocks");

let cards = Array.from(cardsContainer.children);

let orderRange = [...cards.keys()];

document.querySelector(".splash-screen span").onclick = function () {
  let playerName = prompt("What's your name?");
  if (playerName.trim() == null || playerName.trim() == "") {
    document.querySelector(".info .name span").innerHTML = "Anonymous";
  } else {
    document.querySelector(".info .name span").innerHTML = playerName.trim();
  }
  document.querySelector(".splash-screen").remove();
  
  let start = setInterval(() => {
    timer.innerHTML--;
    if (timer.innerHTML === "0") {
      clearInterval(start);
      cards.forEach((card) => card.classList.add("prevent-click"));
      
      if (cards.filter((card) => card.classList.contains("matched")).length !== cards.length) {
        Swal.fire({
          icon: "error",
          title: "Game over!😢",
          html: `<strong>Play again?</strong>`,
          confirmButtonText: "Yes",
          confirmButtonColor: "#2196f3",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload(true);
          }
        });
      } else {
        Swal.fire({
          icon: "success",
          title: "Congratulations 😍",
          html: `<strong>Play?</strong>`,
          confirmButtonText: "Yes",
          confirmButtonColor: "#2196f3",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload(true);
          }
        });
      }
    } else {
      if (cards.filter((card) => card.classList.contains("matched")).length === cards.length) {
        clearInterval(start);
        Swal.fire({
          icon: "success",
          title: "Congratulations 😍",
          html: `<strong>Play?</strong>`,
          confirmButtonText: "Yes",
          confirmButtonColor: "#2196f3",
        }).then((result) => {
          if (result.isConfirmed) {
            location.reload(true);
          }
        });
      }
    }
  }, 1000);
}

let randomIndexesArray = [];

function shuffle(arr) {
  while (randomIndexesArray.length < arr.length) {
    let randomIndex = Math.floor(Math.random() * arr.length);
    if (!randomIndexesArray.includes(arr[randomIndex])) {
      randomIndexesArray.push(arr[randomIndex]);
    }
  }
}
shuffle(orderRange);

cards.forEach((card, index) => {
  card.style.order = randomIndexesArray[index];

  card.addEventListener("click", function () {
    flippedCard(card);
  });
});

function flippedCard(selectedCard) {
  selectedCard.classList.add("flipped");
  
  let flippedCards = cards.filter((card) => card.classList.contains("flipped"));
  
  if (flippedCards.length === 2) {
    cardsContainer.classList.add("prevent-click");
    setTimeout(() => {
      cardsContainer.classList.remove("prevent-click");
    }, cardDuration);
    
    checkMatchedCards(flippedCards[0], flippedCards[1]);
  }
}

function checkMatchedCards(fBlock, sBlock) {
  let wrongTries = document.querySelector(".info .tries span");

  if (fBlock.dataset.name === sBlock.dataset.name) {
    fBlock.classList.remove("flipped");
    sBlock.classList.remove("flipped");

    fBlock.classList.add("matched");
    sBlock.classList.add("matched");
  } else {
    wrongTries.innerHTML = parseInt(wrongTries.innerHTML) + 1;
    setTimeout(() => {
      fBlock.classList.remove("flipped");
      sBlock.classList.remove("flipped");
    }, cardDuration);
  }
}