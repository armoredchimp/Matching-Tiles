window.onload = function () {
  const cardBackClasses = [
    "card-Back-0",
    "card-Back-1",
    "card-Back-2",
    "card-Back-3",
    "card-Back-4",
    "card-Back-5",
    "card-Back-6",
    "card-Back-7",
    "card-Back-8",
  ];
  const imageGroups = [
    ["bug-kitchen0.png"],
    [
      ["bug-girl0.png", "bug-girl1.png"],
      ["bird-matron0.png", "bird-matron1.png"],
      ["city-cat0.png", "city-cat1.png"],
      ["fish-dinner0.png", "fish-dinner1.png"],
      ["pig-banker0.png", "pig-banker1.png"],
      ["sky-house0.png", "sky-house1.png"],
    ],
    [
      ["cyclist0.png", "cyclist1.png", "cyclist2.png"],
      ["horse-man0.png", "horse-man1.png", "horse-man2.png"],
      ["house0.png", "house1.png", "house2.png"],
      ["lad0.png", "lad1.png", "lad2.png"],
      ["manwithanimals0.png", "manwithanimals1.png", "manwithanimals2.png"],
      ["pig-couple0.png", "pig-couple1.png", "pig-couple2.png"],
      ["pig-man0.png", "pig-man1.png", "pig-man2.png"],
    ],
    [
      ["bird-girl0.png", "bird-girl1.png", "bird-girl2.png", "bird-girl3.png"],
      [
        "dinner-party0.png",
        "dinner-party1.png",
        "dinner-party2.png",
        "dinner-party3.png",
      ],
      ["fish-girl0.png", "fish-girl1.png", "fish-girl2.png", "fish-girl3.png"],
      [
        "hill-house0.png",
        "hill-house1.png",
        "hill-house2.png",
        "hill-house3.png",
      ],
      ["horse0.png", "horse1.png", "horse2.png", "horse3.png"],
      ["nest-man0.png", "nest-man1.png", "nest-man2.png", "nest-man3.png"],
      ["pig-lord0.png", "pig-lord1.png", "pig-lord2.png", "pig-lord3.png"],
      ["pinhead0.png", "pinhead1.png", "pinhead2.png", "pinhead3.png"],
    ],
    [
      ["cat0.png", "cat1.png", "cat2.png", "cat3.png", "cat4.png"],
      [
        "onion-man0.png",
        "onion-man1.png",
        "onion-man2.png",
        "onion-man3.png",
        "onion-man4.png",
      ],
    ],
    [
      [
        "cat-girl0.png",
        "cat-girl1.png",
        "cat-girl2.png",
        "cat-girl3.png",
        "cat-girl4.png",
        "cat-girl5.png",
      ],
      [
        "pigs0.png",
        "pigs1.png",
        "pigs2.png",
        "pigs3.png",
        "pigs4.png",
        "pigs5.png",
      ],
      [
        "rabbit-alley0.png",
        "rabbit-alley1.png",
        "rabbit-alley2.png",
        "rabbit-alley3.png",
        "rabbit-alley4.png",
        "rabbit-alley5.png",
      ],
      [
        "umbrella-man0.png",
        "umbrella-man1.png",
        "umbrella-man2.png",
        "umbrella-man3.png",
        "umbrella-man4.png",
        "umbrella-man5.png",
      ],
      [
        "urchin0.png",
        "urchin1.png",
        "urchin2.png",
        "urchin3.png",
        "urchin4.png",
        "urchin5.png",
      ],
    ],
    [
      [
        "guardian0.png",
        "guardian1.png",
        "guardian2.png",
        "guardian3.png",
        "guardian4.png",
        "guardian5.png",
        "guardian6.png",
      ],
      [
        "romance0.png",
        "romance1.png",
        "romance2.png",
        "romance3.png",
        "romance4.png",
        "romance5.png",
        "romance6.png",
        "romance7.png",
        "romance8.png",
      ],
      [
        "tea-party0.png",
        "tea-party1.png",
        "tea-party2.png",
        "tea-party3.png",
        "tea-party4.png",
        "tea-party5.png",
        "tea-party6.png",
        "tea-party7.png",
        "tea-party8.png",
        "tea-party9.png",
      ],
    ],
    ["death0.png", "death1.png", "death2.png", "death3.png"],
  ];
  //This grabs the intended amount from image groups. The larger groups get more basically, and we only grab one from the 7th sub-array which has the 3 largest groups. The final sub-array contains the death images which have special rules.
  const numSelections = [1, 2, 2, 3, 1, 2, 1, 1];
  //Shuffling function
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
  //Shuffles the array and grabs a specified number of items from it, then splices the array
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
    const results = [];
    for (let i = 0; i < count; i++) {
      const rIndex = Math.floor(Math.random() * array.length);
      results.push(...array.splice(rIndex, 1));
    }
    return results;
  }
  function generateNewGame() {
    const gamePairs = [];
    for (let i = 0; i < imageGroups.length; i++) {
      const numItemsToSelect = numSelections[i];
      if (imageGroups[i].length < numItemsToSelect) {
        // Chat GPT did this part and I forgot exactly what's happening here
        gamePairs.push(...imageGroups[i]);
      } else {
        gamePairs.push(...selectRandom(imageGroups[i], numItemsToSelect));
      }
    }
    //Combines all the randomized sub-arrays into one array
    console.log(gamePairs);
    //Flattens that so it's just a large image bank, the sub-arrays do not matter anymore (for this version of the game)
    const flattenedGamePairs = gamePairs.flat();
    console.log(flattenedGamePairs);
    //Starting matches will be the first 4 matches (8 out of starting 9 tiles) so that the game starts off easy. These 4 random images are removed so not to repeat. Then the same is done to the array of next pairs, which will be the incoming next 8 pictures (containing 4 matches but not necessarily in order)
    const sM = selectRandomElements(flattenedGamePairs, 4);
    const startingMatches = shuffle(sM.concat(sM));
    console.log(startingMatches);
    const nP = selectRandomElements(flattenedGamePairs, 4);
    const nextPairs = shuffle(nP.concat(nP));
    console.log(nextPairs);
    return flattenedGamePairs;
  }
  //   const sM = [];
  //   const nP = [];
  //   for (let i = 0; i < 4; i++) {
  //     const rIndex = Math.floor(Math.random() * flattenedGamePairs.length);
  //     // Push the random element to startingMatches
  //     sM.push(...flattenedGamePairs.splice(rIndex, 1));
  //   }
  //   const startingMatches = shuffle(sM.concat(sM));
  //   console.log(startingMatches);
  //   for (let i = 0; i < 4; i++) {
  //     const raIndex = Math.floor(Math.random() * flattenedGamePairs.length);
  //     nP.push(...flattenedGamePairs.splice(raIndex, 1));
  //   }
  //   const nextPairs = shuffle(nP.concat(nP));
  //   console.log(nextPairs);
  //   return flattenedGamePairs;
  // }
  generateNewGame();
  // function flipCard(card, randomIndex) {
  //   let assignedImage = card.dataset.assignedImage;
  //   if (card.dataset.flipped === false) {
  //     card.classList.remove("card-back", cardBackClasses[randomIndex]);
  //     card.classList.add(assignedImage);
  //     card.dataset.flipped = true;
  //   } else {
  //     card.classList.add("card-back", cardBackClasses[randomIndex]);
  //     card.classList.remove(assignedImage);
  //     card.dataset.flipped = false;
  //   }
  // }
};
// Generate new game and get game pairs
// let { gamePairs, nextPairsArray } = generateNewGame();

// Handle cards
// const cards = document.querySelectorAll(".card");
// cards.forEach((card, index) => {
//   const randomIndex = Math.floor(Math.random() * cardBackClasses.length);
//   const imageIndex = Math.floor(index / 2) % gamePairs.length;
//   const imageName = gamePairs[imageIndex][0].match(/_(.+)\d/)[1];
//   card.dataset.assignedImage = imageName;
//   card.dataset.flipped = "false";
//   card.classList.add("card-back", cardBackClasses[randomIndex]);

//   card.addEventListener("click", function () {
//     flipCard(this, randomIndex);
//     });
//   });
// };

// const nextPairs = function (gamePairs) {
//   const nextPairsArray = gamePairs.splice(gamePairs.length - 8, 8);
//   return { gamePairs, nextPairsArray };
// };

// const clock = function () {
//   const startTime = new Date();
//   const options = {
//     hour: "numeric",
//     minute: "numeric",
//     second: "numeric",
//     timeZoneName: "long",
//   };
//   const dateFormat = new Intl.DateTimeFormat("en-US", options);

//   setInterval(function () {
//     const now = new Date();

//     console.log(dateFormat.format(now));
//     console.log(
//       `Clock started ${Math.floor((now - startTime) / 1000)} seconds ago.`
//     );
//   }, 1000);
// };
// clock();
