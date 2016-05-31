(function() {
  var allCards, blub, boo, botType, botsScore, botsScoreContainer, card1, card2, cardsContainer, cardsMaxNum, chooseBotRadios, chooseNumRadios, chooseThemeRadios, createCards, endList, exposed, gameContainer, getRandom, j, k, list1, list2, messageContainer, myInterval, newList, num, playersScore, playersScoreContainer, playersTurn, results, results1, shuffle, startBtn, state, theme, yeah,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  cardsMaxNum = 7;

  list1 = (function() {
    results = [];
    for (var j = 0; 0 <= cardsMaxNum ? j <= cardsMaxNum : j >= cardsMaxNum; 0 <= cardsMaxNum ? j++ : j--){ results.push(j); }
    return results;
  }).apply(this);

  list2 = (function() {
    results1 = [];
    for (var k = 0; 0 <= cardsMaxNum ? k <= cardsMaxNum : k >= cardsMaxNum; 0 <= cardsMaxNum ? k++ : k--){ results1.push(k); }
    return results1;
  }).apply(this);

  endList = list1.concat(list2);

  cardsContainer = document.getElementById("cardsContainer");

  allCards = [];

  gameContainer = document.getElementById("gameContainer");

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

  newList = shuffle(endList);

  createCards = function() {
    var card, cln, i, l, len, len1, m, results2;
    card = document.querySelector(".card");
    theme = document.querySelector(".theme-radio:checked").id;
    for (l = 0, len = newList.length; l < len; l++) {
      i = newList[l];
      cln = card.cloneNode(true);
      cln.dataset.number = i;
      cln.querySelector(".back").style.backgroundImage = "url(img/" + theme + "/" + i + ".png)";
      cardsContainer.appendChild(cln);
    }
    results2 = [];
    for (m = 0, len1 = endList.length; m < len1; m++) {
      i = endList[m];
      results2.push(exposed.push(false));
    }
    return results2;
  };

  window.onload = function() {
    var allCardsList, botPlay, i, l, len, len1, len2, len3, m, n, newGame, o;
    createCards();
    allCards = cardsContainer.querySelectorAll(".card");
    num = 0;
    for (l = 0, len = allCards.length; l < len; l++) {
      i = allCards[l];
      i.classList.add("closed-card");
      i.setAttribute("id", "card" + num);
      num++;
    }
    allCardsList = Array.prototype.slice.call(allCards, 0);
    messageContainer.innerHTML = "Ваша очередь";
    playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore;
    botsScoreContainer.innerHTML = "Счёт бота: " + botsScore;
    botPlay = function() {
      var botNum, cardToClick, closedCards, closedCardsList, len1, m;
      closedCards = document.querySelectorAll(".closed-card");
      closedCardsList = Array.prototype.slice.call(closedCards, 0);
      if (closedCards.length > 0) {
        messageContainer.innerHTML = "Очередь бота";
        botNum = getRandom(0, closedCards.length);
        cardToClick = closedCardsList[botNum];
        if (state === 1) {
          for (m = 0, len1 = closedCardsList.length; m < len1; m++) {
            i = closedCardsList[m];
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
        cardToClick.querySelector(".front").click();
        return console.log(botType);
      }
    };
    newGame = function() {
      var len1, m, n, o, results2, results3;
      cardsContainer.innerHTML = '';
      exposed = [];
      num = 0;
      cardsMaxNum = parseInt(document.querySelector(".choose-num:checked").id);
      list1 = (function() {
        results2 = [];
        for (var m = 0; 0 <= cardsMaxNum ? m <= cardsMaxNum : m >= cardsMaxNum; 0 <= cardsMaxNum ? m++ : m--){ results2.push(m); }
        return results2;
      }).apply(this);
      list2 = (function() {
        results3 = [];
        for (var n = 0; 0 <= cardsMaxNum ? n <= cardsMaxNum : n >= cardsMaxNum; 0 <= cardsMaxNum ? n++ : n--){ results3.push(n); }
        return results3;
      }).apply(this);
      endList = list1.concat(list2);
      newList = shuffle(endList);
      botType = document.querySelector(".choose-bot:checked").id;
      createCards();
      allCards = cardsContainer.querySelectorAll(".card");
      for (o = 0, len1 = allCards.length; o < len1; o++) {
        i = allCards[o];
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
    for (m = 0, len1 = chooseThemeRadios.length; m < len1; m++) {
      i = chooseThemeRadios[m];
      i.addEventListener("change", newGame);
    }
    for (n = 0, len2 = chooseBotRadios.length; n < len2; n++) {
      i = chooseBotRadios[n];
      i.addEventListener("change", newGame);
    }
    for (o = 0, len3 = chooseNumRadios.length; o < len3; o++) {
      i = chooseNumRadios[o];
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
