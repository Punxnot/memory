(function() {
  var allCards, blub, card1, card2, cardsContainer, createCards, endList, exposed, getRandom, i, j, len, list1, list2, messageContainer, myInterval, newList, playersTurn, shuffle, state, turns, yeah;

  list1 = [0, 1, 2, 3, 4, 5, 6, 7];

  list2 = [0, 1, 2, 3, 4, 5, 6, 7];

  endList = list1.concat(list2);

  cardsContainer = document.getElementById("cardsContainer");

  allCards = [];

  messageContainer = document.getElementById("messageContainer");

  exposed = [];

  for (j = 0, len = endList.length; j < len; j++) {
    i = endList[j];
    exposed.push(false);
  }

  state = 0;

  card1 = 33;

  card2 = 33;

  turns = 0;

  blub = new Audio('blub.wav');

  yeah = new Audio('yeah.wav');

  playersTurn = true;

  myInterval = null;

  shuffle = function(array) {
    var currentIndex, randomIndex, temporaryValue;
    currentIndex = array.length;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  getRandom = function(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  newList = shuffle(endList);

  createCards = function() {
    var card, cln, k, len1, results;
    card = document.querySelector(".card");
    results = [];
    for (k = 0, len1 = newList.length; k < len1; k++) {
      i = newList[k];
      cln = card.cloneNode(true);
      cln.dataset.number = i;
      cln.querySelector(".back").style.backgroundImage = "url(img/" + i + ".png)";
      results.push(cardsContainer.appendChild(cln));
    }
    return results;
  };

  window.onload = function() {
    var allCardsList, botPlay, k, len1;
    createCards();
    allCards = cardsContainer.querySelectorAll(".card");
    for (k = 0, len1 = allCards.length; k < len1; k++) {
      i = allCards[k];
      i.classList.add("closed-card");
    }
    allCardsList = Array.prototype.slice.call(allCards, 0);
    messageContainer.innerHTML = "Turns = " + turns;
    botPlay = function() {
      var botNum, closedCards, closedCardsList;
      closedCards = document.querySelectorAll(".closed-card");
      closedCardsList = Array.prototype.slice.call(closedCards, 0);
      console.log(closedCardsList.length);
      if (closedCards.length > 0) {
        botNum = getRandom(0, closedCards.length);
        closedCardsList[botNum].querySelector(".front").click();
      }
      return console.log(closedCards);
    };
    return cardsContainer.addEventListener("click", function(e) {
      var card, ind;
      if (e.target.parentNode.parentNode.parentNode.classList.contains("card")) {
        card = e.target.parentNode.parentNode.parentNode;
        ind = allCardsList.indexOf(card);
        console.log(exposed[ind]);
        if (exposed[ind] === false) {
          exposed[ind] = true;
          this.dataset.open = true;
          allCardsList[ind].querySelector(".flip-container").classList.add("animate");
          allCardsList[ind].classList.remove("closed-card");
          blub.play();
          if (state === 0) {
            card1 = ind;
            state = 1;
            turns += 1;
            return messageContainer.innerHTML = "Turns = " + turns;
          } else if (state === 1) {
            card2 = ind;
            state = 0;
            turns += 1;
            messageContainer.innerHTML = "Turns = " + turns;
            if (newList[card1] !== newList[card2]) {
              exposed[card1] = false;
              exposed[card2] = false;
              exposed[ind] = false;
              allCardsList[card1].dataset.open = false;
              allCardsList[card2].dataset.open = false;
              allCardsList[ind].dataset.open = false;
              setTimeout(function() {
                allCardsList[card1].querySelector(".flip-container").classList.remove("animate");
                allCardsList[card2].querySelector(".flip-container").classList.remove("animate");
                allCardsList[card1].classList.add("closed-card");
                return allCardsList[card2].classList.add("closed-card");
              }, 700);
              if (playersTurn === true) {
                playersTurn = false;
                cardsContainer.classList.add("not-clickable");
                return myInterval = setInterval(function() {
                  if (!playersTurn) {
                    return botPlay();
                  }
                }, 1000);
              } else if (playersTurn === false) {
                playersTurn = true;
                cardsContainer.classList.remove("not-clickable");
                return clearInterval(myInterval);
              }
            }
          }
        }
      }
    }, false);
  };

}).call(this);
