(function() {
  var allCards, blub, botsScore, card1, card2, cardsContainer, createCards, endList, exposed, getRandom, i, j, len, list1, list2, messageContainer, myInterval, newList, playersScore, playersTurn, shuffle, state, yeah;

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

  blub = new Audio('blub.wav');

  yeah = new Audio('yeah.wav');

  playersTurn = true;

  playersScore = 0;

  botsScore = 0;

  myInterval = null;

  shuffle = function(array) {
    var currentIndex, randomIndex, temporaryValue;
    currentIndex = array.length;
    while (currentIndex !== 0) {
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
    messageContainer.innerHTML = "Your turn";
    botPlay = function() {
      var botNum, cardToClick, closedCards, closedCardsList, l, len2;
      messageContainer.innerHTML = "Bot's turn";
      closedCards = document.querySelectorAll(".closed-card");
      closedCardsList = Array.prototype.slice.call(closedCards, 0);
      if (closedCards.length > 0) {
        botNum = getRandom(0, closedCards.length);
        cardToClick = closedCardsList[botNum];
        if (state === 1) {
          for (l = 0, len2 = closedCardsList.length; l < len2; l++) {
            i = closedCardsList[l];
            if ((i.dataset.number === allCardsList[card1].dataset.number) && (i.dataset.times > 0)) {
              cardToClick = i;
              console.log("Seen this card!");
            }
          }
        }
        botNum = getRandom(0, closedCards.length);
        return cardToClick.querySelector(".front").click();
      }
    };
    return cardsContainer.addEventListener("click", function(e) {
      var card, ind;
      if (e.target.parentNode.parentNode.parentNode.classList.contains("card")) {
        card = e.target.parentNode.parentNode.parentNode;
        ind = allCardsList.indexOf(card);
        if (exposed[ind] === false) {
          exposed[ind] = true;
          card.dataset.open = true;
          card.dataset.times = parseInt(card.dataset.times) + 1;
          allCardsList[ind].querySelector(".flip-container").classList.add("animate");
          allCardsList[ind].classList.remove("closed-card");
          blub.play();
          if (state === 0) {
            card1 = ind;
            return state = 1;
          } else if (state === 1) {
            card2 = ind;
            state = 0;
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
                clearInterval(myInterval);
                return setTimeout(function() {
                  return messageContainer.innerHTML = "Your turn";
                }, 500);
              }
            } else {
              if (playersTurn) {
                return playersScore += 1;
              } else {
                return botsScore += 1;
              }
            }
          }
        }
      }
    }, false);
  };

}).call(this);
