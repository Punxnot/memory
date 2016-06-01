(function() {
  var blub, boo, botType, botsScore, botsScoreContainer, card1, card2, cardsContainer, cardsMaxNum, chooseBotRadios, chooseNumRadios, chooseThemeRadios, createCards, exposed, gameContainer, getRandom, j, list1, messageContainer, myInterval, newList, num, playersScore, playersScoreContainer, playersTurn, results, shuffle, startBtn, state, theme, yeah,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  cardsMaxNum = 7;

  list1 = (function() {
    results = [];
    for (var j = 0; 0 <= cardsMaxNum ? j <= cardsMaxNum : j >= cardsMaxNum; 0 <= cardsMaxNum ? j++ : j--){ results.push(j); }
    return results;
  }).apply(this);

  cardsContainer = document.getElementById("cardsContainer");

  gameContainer = document.getElementById("gameContainer");

  messageContainer = document.getElementById("messageContainer");

  botsScoreContainer = document.getElementById("botsScore");

  playersScoreContainer = document.getElementById("playersScore");

  startBtn = document.getElementById("startBtn");

  exposed = [];

  state = 0;

  card1 = 33;

  card2 = 33;

  blub = new Audio('audio/blub.wav');

  yeah = new Audio('audio/yeah.wav');

  boo = new Audio('audio/boo.wav');

  playersTurn = true;

  playersScore = 0;

  botsScore = 0;

  myInterval = null;

  num = 0;

  theme = "cars";

  botType = "smart";

  chooseThemeRadios = document.querySelectorAll(".choose-theme .theme-radio");

  chooseNumRadios = document.querySelectorAll(".choose-num");

  chooseBotRadios = document.querySelectorAll(".choose-bot");

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

  newList = shuffle(list1.concat(list1.slice()));

  createCards = function() {
    var card, cln, i, k, l, len, len1, results1;
    card = document.querySelector(".card");
    theme = document.querySelector(".theme-radio:checked").id;
    for (k = 0, len = newList.length; k < len; k++) {
      i = newList[k];
      cln = card.cloneNode(true);
      cln.dataset.number = i;
      cln.querySelector(".back").style.backgroundImage = "url(img/" + theme + "/" + i + ".png)";
      cardsContainer.appendChild(cln);
    }
    results1 = [];
    for (l = 0, len1 = newList.length; l < len1; l++) {
      i = newList[l];
      results1.push(exposed.push(false));
    }
    return results1;
  };

  window.onload = function() {
    var allCards, allCardsList, botPlay, i, k, l, len, len1, len2, len3, m, n, newGame;
    createCards();
    allCards = cardsContainer.querySelectorAll(".card");
    num = 0;
    for (k = 0, len = allCards.length; k < len; k++) {
      i = allCards[k];
      i.classList.add("closed-card");
      i.setAttribute("id", "card" + num);
      num++;
    }
    allCardsList = Array.prototype.slice.call(allCards, 0);
    messageContainer.innerHTML = "Ваша очередь";
    playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore;
    botsScoreContainer.innerHTML = "Счёт бота: " + botsScore;
    botPlay = function() {
      var botNum, cardToClick, closedCards, closedCardsList, l, len1;
      closedCards = document.querySelectorAll(".closed-card");
      closedCardsList = Array.prototype.slice.call(closedCards, 0);
      if (closedCards.length > 0) {
        messageContainer.innerHTML = "Очередь бота";
        botNum = getRandom(0, closedCards.length);
        cardToClick = closedCardsList[botNum];
        if (state === 1) {
          for (l = 0, len1 = closedCardsList.length; l < len1; l++) {
            i = closedCardsList[l];
            if (botType === "smart") {
              if ((i.dataset.number === allCardsList[card1].dataset.number) && (i.dataset.times > 0)) {
                cardToClick = i;
              }
            } else if (botType === "normal") {
              if ((i.dataset.number === allCardsList[card1].dataset.number) && (i.dataset.times > 1)) {
                cardToClick = i;
              }
            } else {
              if ((i.dataset.number === allCardsList[card1].dataset.number) && (i.dataset.times > 2)) {
                cardToClick = i;
              }
            }
          }
        }
        botNum = getRandom(0, closedCards.length);
        return cardToClick.querySelector(".front").click();
      }
    };
    newGame = function() {
      var l, len1, m, results1;
      cardsContainer.innerHTML = '';
      exposed = [];
      num = 0;
      cardsMaxNum = parseInt(document.querySelector(".choose-num:checked").id);
      list1 = (function() {
        results1 = [];
        for (var l = 0; 0 <= cardsMaxNum ? l <= cardsMaxNum : l >= cardsMaxNum; 0 <= cardsMaxNum ? l++ : l--){ results1.push(l); }
        return results1;
      }).apply(this);
      newList = shuffle(list1.concat(list1.slice()));
      botType = document.querySelector(".choose-bot:checked").id;
      createCards();
      allCards = cardsContainer.querySelectorAll(".card");
      for (m = 0, len1 = allCards.length; m < len1; m++) {
        i = allCards[m];
        i.classList.add("closed-card");
      }
      allCardsList = Array.prototype.slice.call(allCards, 0);
      playersTurn = true;
      playersScore = 0;
      botsScore = 0;
      clearInterval(myInterval);
      cardsContainer.classList.remove("not-clickable");
      state = 0;
      card1 = 33;
      card2 = 33;
      playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore;
      botsScoreContainer.innerHTML = "Счёт бота: " + botsScore;
      return messageContainer.innerHTML = "Ваша очередь";
    };
    startBtn.addEventListener("click", newGame);
    for (l = 0, len1 = chooseThemeRadios.length; l < len1; l++) {
      i = chooseThemeRadios[l];
      i.addEventListener("change", newGame);
    }
    for (m = 0, len2 = chooseBotRadios.length; m < len2; m++) {
      i = chooseBotRadios[m];
      i.addEventListener("change", newGame);
    }
    for (n = 0, len3 = chooseNumRadios.length; n < len3; n++) {
      i = chooseNumRadios[n];
      i.addEventListener("change", function() {
        newGame();
        if (cardsMaxNum === 7) {
          return gameContainer.classList.remove("large");
        } else if (cardsMaxNum === 11) {
          return gameContainer.classList.add("large");
        }
      });
    }
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
