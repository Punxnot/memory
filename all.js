(function() {
  var allCards, blub, boo, botsScore, botsScoreContainer, card1, card2, cardsContainer, createCards, endList, exposed, getRandom, list1, list2, messageContainer, myInterval, newList, playersScore, playersScoreContainer, playersTurn, shuffle, startBtn, state, yeah,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  list1 = [0, 1, 2, 3, 4, 5, 6, 7];

  list2 = [0, 1, 2, 3, 4, 5, 6, 7];

  endList = list1.concat(list2);

  cardsContainer = document.getElementById("cardsContainer");

  allCards = [];

  messageContainer = document.getElementById("messageContainer");

  botsScoreContainer = document.getElementById("botsScore");

  playersScoreContainer = document.getElementById("playersScore");

  startBtn = document.getElementById("startBtn");

  exposed = [];

  state = 0;

  card1 = 33;

  card2 = 33;

  blub = new Audio('blub.wav');

  yeah = new Audio('yeah.wav');

  boo = new Audio('boo.wav');

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
    var card, cln, i, j, k, len, len1, results;
    card = document.querySelector(".card");
    for (j = 0, len = newList.length; j < len; j++) {
      i = newList[j];
      cln = card.cloneNode(true);
      cln.dataset.number = i;
      cln.querySelector(".back").style.backgroundImage = "url(img/" + i + ".png)";
      cardsContainer.appendChild(cln);
    }
    results = [];
    for (k = 0, len1 = endList.length; k < len1; k++) {
      i = endList[k];
      results.push(exposed.push(false));
    }
    return results;
  };

  window.onload = function() {
    var allCardsList, botPlay, i, j, len;
    createCards();
    allCards = cardsContainer.querySelectorAll(".card");
    for (j = 0, len = allCards.length; j < len; j++) {
      i = allCards[j];
      i.classList.add("closed-card");
    }
    allCardsList = Array.prototype.slice.call(allCards, 0);
    messageContainer.innerHTML = "Ваша очередь";
    playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore;
    botsScoreContainer.innerHTML = "Счёт бота: " + botsScore;
    botPlay = function() {
      var botNum, cardToClick, closedCards, closedCardsList, k, len1;
      closedCards = document.querySelectorAll(".closed-card");
      closedCardsList = Array.prototype.slice.call(closedCards, 0);
      if (closedCards.length > 0) {
        messageContainer.innerHTML = "Очередь бота";
        botNum = getRandom(0, closedCards.length);
        cardToClick = closedCardsList[botNum];
        if (state === 1) {
          for (k = 0, len1 = closedCardsList.length; k < len1; k++) {
            i = closedCardsList[k];
            if ((i.dataset.number === allCardsList[card1].dataset.number) && (i.dataset.times > 0)) {
              cardToClick = i;
            }
          }
        }
        botNum = getRandom(0, closedCards.length);
        return cardToClick.querySelector(".front").click();
      }
    };
    startBtn.addEventListener("click", function() {
      var k, len1;
      cardsContainer.innerHTML = '';
      exposed = [];
      newList = shuffle(endList);
      createCards();
      allCards = cardsContainer.querySelectorAll(".card");
      for (k = 0, len1 = allCards.length; k < len1; k++) {
        i = allCards[k];
        i.classList.add("closed-card");
      }
      allCardsList = Array.prototype.slice.call(allCards, 0);
      playersTurn = true;
      playersScore = 0;
      botsScore = 0;
      clearInterval(myInterval);
      state = 0;
      card1 = 33;
      return card2 = 33;
    });
    return cardsContainer.addEventListener("click", function(e) {
      var card, closeCards, ind, showMessage;
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
            state = 1;
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
              closeCards = setTimeout(function() {
                allCardsList[card1].querySelector(".flip-container").classList.remove("animate");
                allCardsList[card2].querySelector(".flip-container").classList.remove("animate");
                allCardsList[card1].classList.add("closed-card");
                return allCardsList[card2].classList.add("closed-card");
              }, 700);
              if (playersTurn === true) {
                playersTurn = false;
                cardsContainer.classList.add("not-clickable");
                myInterval = setInterval(function() {
                  if (!playersTurn) {
                    return botPlay();
                  }
                }, 1000);
              } else if (playersTurn === false) {
                playersTurn = true;
                cardsContainer.classList.remove("not-clickable");
                clearInterval(myInterval);
                showMessage = setTimeout(function() {
                  return messageContainer.innerHTML = "Ваша очередь";
                }, 500);
              }
            } else {
              if (playersTurn) {
                playersScore += 1;
              } else {
                botsScore += 1;
              }
              playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore;
              botsScoreContainer.innerHTML = "Счёт бота: " + botsScore;
            }
          }
        }
      }
      if ((indexOf.call(exposed, false) < 0)) {
        if (botsScore > playersScore) {
          messageContainer.innerHTML = "Выиграл бот";
          return boo.play();
        } else if (playersScore > botsScore) {
          messageContainer.innerHTML = "Вы выиграли";
          return yeah.play();
        } else {
          messageContainer.innerHTML = "Ничья!";
          return yeah.play();
        }
      }
    }, false);
  };

}).call(this);
