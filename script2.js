"use strict";

const cardBackClasses = [
  "card-Back-0.png",
  "card-Back-1.png",
  "card-Back-2.png",
  "card-Back-3.png",
  "card-Back-4.png",
  "card-Back-5.png",
  "card-Back-6.png",
  "card-Back-7.png",
  "card-Back-8.png",
];
import imageBank1 from "./image1/imageBank1.js";
let nextPairs;
let flattenedGamePairs;
let startBtn = document.getElementById("start-game");
let scoreboard = document.querySelector(".scoreboard");
let cont = document.querySelector(".container");
let modal = document.querySelector(".modal");
let cardElements = document.querySelectorAll(".card");
let attempts = document.getElementById("attempt-count");
let curScore = document.getElementById("match-count");
let highScores = document.getElementById("high-scores");
let bottomText = document.querySelector(".bottom-text");
let cWrapper = document.querySelectorAll(".card-wrapper");
let warningText = document.querySelector(".warning");
let playAgain = document.getElementById("play-again");
const deaths = ["death0.png", "death1.png", "death2.png", "death3.png"];
let deathMessages = [
  "Despair!",
  "Fate has frowned upon you",
  "Into the abyss...",
  "A chilling touch of death...",
  "The void takes its due...",
  "The cold hand of fate reaches out...",
  "A grim turn of events...",
];
scoreboard.style.display = "none";
cont.style.display = "none";

function shuffle(array) {
  let m = array.length,
    t,
    i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
function selectRandom(array, numItems) {
  const shuffled = shuffle(array);
  const selectedItems = shuffled.slice(0, numItems);
  // Remove the selected items from the original array
  for (let item of selectedItems) {
    const index = array.indexOf(item);
    if (index > -1) {
      array.splice(index, 1);
    }
  }
  return selectedItems;
}
function selectRandomElements(array, count) {
  return Array.from(
    { length: count },
    () => array.splice(Math.floor(Math.random() * array.length), 1)[0]
  );
}
function showText(textElement) {
  textElement.style.visibility = "visible";
  textElement.style.opacity = 1;

  setTimeout(() => {
    textElement.style.transition = "opacity 1s ease-out";
    textElement.style.opacity = 0;
    setTimeout(() => {
      textElement.style.visibility = "hidden";
      textElement.style.transition = "none";
      textElement.style.opacity = 1;
    }, 1000);
  }, 1000);
}
function showTextLonger(textElement) {
  textElement.style.visibility = "visible";
  textElement.style.opacity = 1;

  setTimeout(() => {
    textElement.style.transition = "opacity 1s ease-out";
    textElement.style.opacity = 0;
    setTimeout(() => {
      textElement.style.visibility = "hidden";
      textElement.style.transition = "none";
      textElement.style.opacity = 1;
    }, 1200);
  }, 1200);
}
function victory() {
  warningText.textContent = "Victory!";
  warningText.style.display = "block";
  document.body.style.backgroundColor = "#6ca381";
  cWrapper.forEach((el) => (el.style.backgroundColor = "#6ca381"));
  cardElements.forEach((card) => {
    card.style.pointerEvents = "none";
    card.style.display = "none";
  });
  let initials = "";
  while (!initials || initials.length > 3) {
    initials = prompt("Enter your initials (3 characters or less):");
    if (initials) {
      initials = initials.toUpperCase().substring(0, 3);
    }
  }
  const date = new Date().toISOString().split("T")[0];
  const score = {
    name: initials,
    attempts: parseInt(attempts.textContent),
    date: date,
  };
  let scores = JSON.parse(localStorage.getItem("scores")) || [];
  scores.push(score);
  scores.sort((a, b) => a.attempts - b.attempts);
  scores = scores.slice(0, 5);
  localStorage.setItem("scores", JSON.stringify(scores));

  let tableContainer = document.getElementById("table-container");
  let table = document.createElement("table");
  let tableHead = document.createElement("thead");
  let tableBody = document.createElement("tbody");
  let headerRow = document.createElement("tr");
  ["Initials", "Attempts", "Date"].forEach((text) => {
    let th = document.createElement("th");
    th.textContent = text;
    headerRow.appendChild(th);
  });
  tableHead.appendChild(headerRow);

  scores.forEach((score) => {
    let tr = document.createElement("tr");
    ["name", "attempts", "date"].forEach((key) => {
      let td = document.createElement("td");
      td.textContent = score[key];
      tr.appendChild(td);
    });
    tableBody.appendChild(tr);
  });
  table.appendChild(tableHead);
  table.appendChild(tableBody);
  while (tableContainer.firstChild) {
    tableContainer.firstChild.remove();
  }
  tableContainer.appendChild(table);
  highScores.style.display = "block";
}
function startNewGame() {
  cardElements.forEach((cardElement) => {
    cardElement.style.display = "block";
    cardElement.style.pointerEvents = "auto";
  });
  highScores.style.display = "none";
  scoreboard.style.display = "flex";
  cont.style.display = "block";
  const ng = new NewGame([1, 2, 2, 3, 1, 2, 1, 4], imageBank1);
  ng.initialize();
  const nga = new GameActive();
  nga.reset();
  cardElements.forEach((cardElement, index) => {
    let newCard = new Card(cardElement);
    newCard.cardElement.addEventListener("click", () => nga.clickCard(newCard));
  });
}
class NewGame {
  constructor(numSelections, imageBank1) {
    this.numSelections = numSelections;
    this.imageBank1 = imageBank1;
  }
  initialize() {
    // Initialize an empty array to store game pairs
    const gamePairs = [];
    // Iterate over imageGroups
    for (let [index, group] of imageBank1.entries()) {
      // Get the number of items to select from numSelections
      const numItemsToSelect = this.numSelections[index];
      // Check if the length of the group is less than the number of items to select
      // If so, add all items from the group to gamePairs
      group.length < numItemsToSelect
        ? gamePairs.push(...group)
        : gamePairs.push(...selectRandom(group, numItemsToSelect));
      // If not, add a random selection of items from the group to gamePairs
    }
    // Flatten gamePairs into a single array
    flattenedGamePairs = gamePairs.flat();
    // Select random elements from flattenedGamePairs for the starting matches
    let startingMatches = selectRandomElements(flattenedGamePairs, 4);
    // Duplicate and shuffle the starting matches
    startingMatches = shuffle([...startingMatches, ...startingMatches]);
    console.log(startingMatches);
    // Select random elements from flattenedGamePairs for the next pairs
    nextPairs = selectRandomElements(flattenedGamePairs, 4);
    // Duplicate and shuffle the next pairs
    nextPairs = shuffle([...nextPairs, ...nextPairs]);
    console.log(nextPairs);
    // Return the flattened array of game pairs
    console.log(flattenedGamePairs);
    return { nextPairs, flattenedGamePairs };
  }
}

function nextPairsCycling() {
  if (flattenedGamePairs.length > 0 && nextPairs.length < 8) {
    let newImage = flattenedGamePairs.splice(
      Math.floor(Math.random() * flattenedGamePairs.length),
      1
    )[0];
    nextPairs.push(newImage);
    nextPairs.push(newImage);
  }
}

class Card {
  constructor(cardElement) {
    this.cardElement = cardElement;
    this.assignNewCard();
  }
  assignNewCard() {
    this.isFlipped = false;
    this.cardBack =
      cardBackClasses[Math.floor(Math.random() * cardBackClasses.length)];
    let cRIndex = nextPairs[Math.floor(Math.random() * nextPairs.length)];
    this.image = nextPairs.splice(cRIndex, 1)[0];
    nextPairsCycling();
    this.cardElement.style.backgroundImage = "";

    setTimeout(() => {
      this.cardElement.style.backgroundImage = `url(${this.cardBack})`;
      this.cardElement.dataset.image = `url(${this.image})`;
    }, 0);
  }
  flipCard() {
    this.isFlipped = !this.isFlipped;
    this.updateAppearance();
  }
  updateAppearance() {
    if (this.isFlipped) {
      this.cardElement.style.backgroundImage = `url(${this.image})`;
    } else {
      this.cardElement.style.backgroundImage = `url(${this.cardBack})`;
    }
  }
  replaceCard() {
    this.assignNewCard();
  }
}

class GameActive {
  constructor() {
    this.flippedCards = [];
    this.attempts = 0;
    this.matches = 0;
    this.isWaiting = false;
  }
  reset() {
    this.attempts = 0;
    this.matches = 0;
    this.flippedCards = [];
    this.isWaiting = false;
    attempts.textContent = 0;
    curScore.textContent = 0;
    document.body.style.backgroundColor = "#ddd";
    cWrapper.forEach((el) => (el.style.backgroundColor = "#ddd"));
  }
  incrementAttempts() {
    this.attempts++;
    attempts.textContent = this.attempts;
  }
  adjustMatches(amount) {
    const previousMatches = this.matches;
    this.matches += amount;
    curScore.textContent = this.matches;
    previousMatches < this.matches
      ? curScore.classList.add("score-up")
      : curScore.classList.add("score-down");
    setTimeout(() => {
      curScore.classList.remove("score-up");
      curScore.classList.remove("score-down");
    }, 150);

    if (this.matches >= 30) {
      victory();
    }
  }
  deathWarning() {
    const [firstCard] = this.flippedCards;
    if (deaths.includes(firstCard.image) && this.flippedCards.length === 1) {
      warningText.textContent = "Careful!";
      document.body.style.color = "#ddd";
      warningText.style.color = "#ddd";
      showText(warningText);
      document.body.style.backgroundColor = "#080808";

      cWrapper.forEach((el) => (el.style.backgroundColor = "#080808"));
      cardElements.forEach(
        (el) => (el.style.boxShadow = "0px 0px 0px rgba(0, 0, 0, 0)")
      );
    }
  }
  deathMessage() {
    let mIndex = Math.floor(Math.random() * deathMessages.length);
    return deathMessages[mIndex];
  }
  clickCard(card) {
    if (
      !this.isWaiting &&
      this.flippedCards.length < 2 &&
      !this.flippedCards.includes(card)
    ) {
      card.flipCard();
      this.flippedCards.push(card);
      this.deathWarning();
      if (this.flippedCards.length === 2) {
        this.isWaiting = true;
        setTimeout(() => {
          this.checkForMatch();
          this.isWaiting = false;
        }, 1000);
      }
    }
  }
  resetFlippedCards() {
    setTimeout(() => {
      this.flippedCards.forEach((card) => {
        card.flipCard();
      });
      this.flippedCards = [];
      this.isWaiting = false;
    }, 1000);
  }
  colorsDefault() {
    document.body.style.backgroundColor = "#ddd";
    cWrapper.forEach((el) => (el.style.backgroundColor = "#ddd"));
    cardElements.forEach(
      (el) => (el.style.boxShadow = "10px 10px 2px rgba(39, 39, 37, 0.63)")
    );
    document.body.style.color = "#080808";
  }
  checkForMatch() {
    this.incrementAttempts();
    const [card1, card2] = this.flippedCards;

    bottomText.textContent =
      card1.image === card2.image ? "Matched!" : "Not a match.";
    showText(bottomText);
    this.colorsDefault();

    if (card1.image === card2.image) {
      this.adjustMatches(1);
      deaths.includes(card1.image)
        ? (this.adjustMatches(2),
          (warningText.textContent = "An extra reward!"),
          showTextLonger(warningText))
        : null;
      card1.replaceCard();
      card2.replaceCard();
      this.flippedCards = [];
    } else {
      const deathPenalty =
        deaths.includes(card1.image) || deaths.includes(card2.image);
      deathPenalty ? console.log("death penalty!") : null;
      deathPenalty
        ? ((warningText.textContent = this.deathMessage()),
          showTextLonger(warningText),
          this.adjustMatches(-1),
          (document.body.style.backgroundColor = "#551f1f"),
          cWrapper.forEach((el) => (el.style.backgroundColor = "#551f1f")),
          (warningText.style.color = "#080808"))
        : null;
      deathPenalty
        ? setTimeout(() => {
            (document.body.style.backgroundColor = "#080808"),
              cWrapper.forEach((el) => (el.style.backgroundColor = "#080808")),
              (warningText.style.color = "#ddd");
          }, 200)
        : null;
      deathPenalty
        ? setTimeout(() => {
            (document.body.style.backgroundColor = "#551f1f"),
              cWrapper.forEach((el) => (el.style.backgroundColor = "#551f1f")),
              (warningText.style.color = "#080808");
          }, 400)
        : null;
      deathPenalty
        ? setTimeout(() => {
            (document.body.style.backgroundColor = "#ddd"),
              cWrapper.forEach((el) => (el.style.backgroundColor = "#ddd")),
              (document.body.style.color = "#080808");
          }, 600)
        : null;
      this.resetFlippedCards();
    }
  }
}

startBtn.addEventListener("click", function () {
  modal.style.display = "none";
  startNewGame();
});
playAgain.addEventListener("click", startNewGame);
// localStorage.clear();
