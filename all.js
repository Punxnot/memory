(function() {
  var allCards, blub, card1, card2, cardsContainer, createCards, endList, exposed, i, j, len, list1, list2, messageContainer, newList, shuffle, state, turns, yeah,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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

  newList = shuffle(endList);

  createCards = function() {
    var card, cln, k, len1, results;
    card = document.querySelector(".card");
    results = [];
    for (k = 0, len1 = newList.length; k < len1; k++) {
      i = newList[k];
      cln = card.cloneNode(true);
      cln.dataset.number = i;
      cln.querySelector(".back").innerHTML = cln.dataset.number;
      results.push(cardsContainer.appendChild(cln));
    }
    return results;
  };

  window.onload = function() {
    var allCardsList, card, cards, k, len1, results;
    createCards();
    allCards = cardsContainer.querySelectorAll(".card");
    allCardsList = Array.prototype.slice.call(allCards, 0);
    messageContainer.innerHTML = "Turns = " + turns;
    cards = document.querySelectorAll(".card");
    results = [];
    for (k = 0, len1 = cards.length; k < len1; k++) {
      card = cards[k];
      results.push(card.addEventListener("click", function() {
        var ind;
        ind = allCardsList.indexOf(this);
        if (exposed[ind] === false) {
          exposed[ind] = true;
          allCardsList[ind].querySelector(".flip-container").classList.add("animate");
          blub.play();
          if (state === 0) {
            card1 = ind;
            state = 1;
            turns += 1;
            messageContainer.innerHTML = "Turns = " + turns;
          } else if (state === 1) {
            card2 = ind;
            state = 2;
          } else {
            turns += 1;
            messageContainer.innerHTML = "Turns = " + turns;
            if (newList[card1] !== newList[card2]) {
              exposed[card1] = false;
              exposed[card2] = false;
              allCardsList[card1].querySelector(".flip-container").classList.remove("animate");
              allCardsList[card2].querySelector(".flip-container").classList.remove("animate");
              card1 = ind;
              state = 1;
            } else {
              card1 = ind;
              state = 1;
            }
          }
        }
        if (!(indexOf.call(exposed, false) >= 0)) {
          return yeah.play();
        }
      }));
    }
    return results;
  };

}).call(this);
