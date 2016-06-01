cardsMaxNum = 7
list1 = [0..cardsMaxNum]
cardsContainer = document.getElementById("cardsContainer")
gameContainer = document.getElementById("gameContainer")
messageContainer = document.getElementById("messageContainer")
botsScoreContainer = document.getElementById("botsScore")
playersScoreContainer = document.getElementById("playersScore")
startBtn = document.getElementById("startBtn")
exposed = []
state = 0
card1 = 33
card2 = 33
blub = new Audio('audio/blub.wav')
yeah = new Audio('audio/yeah.wav')
boo = new Audio('audio/boo.wav')
playersTurn = true
playersScore = 0
botsScore = 0
myInterval = null
num = 0
theme = "cars"
botType = "smart" # or normal, or stupid
chooseThemeRadios = document.querySelectorAll(".choose-theme .theme-radio")
chooseNumRadios = document.querySelectorAll(".choose-num")
chooseBotRadios = document.querySelectorAll(".choose-bot")

shuffle = (array) ->
  currentIndex = array.length
  while currentIndex != 0
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  return array

getRandom = (min, max) ->
  return Math.floor(Math.random() * (max - min)) + min

# Create random array of cards numbers
newList = shuffle(list1.concat(list1.slice()))

createCards = ->
  card = document.querySelector(".card")
  theme = document.querySelector(".theme-radio:checked").id
  for i in newList
    cln = card.cloneNode(true)
    cln.dataset.number = i
    cln.querySelector(".back").style.backgroundImage = "url(img/#{theme}/#{i}.png)"
    cardsContainer.appendChild(cln)
  for i in newList
    exposed.push(false)

window.onload = ->
  createCards()
  allCards = cardsContainer.querySelectorAll(".card")
  num = 0
  for i in allCards
    i.classList.add("closed-card")
    i.setAttribute("id", "card#{num}")
    num++
  allCardsList = Array.prototype.slice.call(allCards, 0)
  messageContainer.innerHTML = "Ваша очередь"
  playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore
  botsScoreContainer.innerHTML = "Счёт бота: " + botsScore

  # Bot
  botPlay = ->
    closedCards = document.querySelectorAll(".closed-card")
    closedCardsList = Array.prototype.slice.call(closedCards, 0)
    if closedCards.length > 0
      messageContainer.innerHTML = "Очередь бота"
      botNum = getRandom(0, closedCards.length)
      cardToClick = closedCardsList[botNum]
      if state == 1
        for i in closedCardsList
          if botType == "smart"
            if (i.dataset.number == allCardsList[card1].dataset.number) && (i.dataset.times > 0)
              cardToClick = i
          else if botType == "normal"
            if (i.dataset.number == allCardsList[card1].dataset.number) && (i.dataset.times > 1)
              cardToClick = i
          else
            if (i.dataset.number == allCardsList[card1].dataset.number) && (i.dataset.times > 2)
              cardToClick = i
      botNum = getRandom(0, closedCards.length)
      cardToClick.querySelector(".front").click()

  newGame = ->
    cardsContainer.innerHTML = ''
    exposed = []
    num = 0
    cardsMaxNum = parseInt(document.querySelector(".choose-num:checked").id)
    list1 = [0..cardsMaxNum]
    newList = shuffle(list1.concat(list1.slice()))
    botType = document.querySelector(".choose-bot:checked").id
    createCards()
    allCards = cardsContainer.querySelectorAll(".card")
    for i in allCards
      i.classList.add("closed-card")
    allCardsList = Array.prototype.slice.call(allCards, 0)
    playersTurn = true
    playersScore = 0
    botsScore = 0
    clearInterval(myInterval)
    cardsContainer.classList.remove("not-clickable")
    state = 0
    card1 = 33
    card2 = 33
    playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore
    botsScoreContainer.innerHTML = "Счёт бота: " + botsScore
    messageContainer.innerHTML = "Ваша очередь"

  startBtn.addEventListener("click", newGame)

  for i in chooseThemeRadios
    i.addEventListener("change", newGame)

  for i in chooseBotRadios
    i.addEventListener("change", newGame)

  for i in chooseNumRadios
    i.addEventListener("change", ->
      newGame()
      if cardsMaxNum == 7
        gameContainer.classList.remove("large")
      else if cardsMaxNum == 11
        gameContainer.classList.add("large")
    )

  cardsContainer.addEventListener("click", (e)->
    if e.target.parentNode.parentNode.parentNode.classList.contains("card")
      card = e.target.parentNode.parentNode.parentNode
      ind = allCardsList.indexOf(card)
      if exposed[ind] == false
        exposed[ind] = true
        card.dataset.open = true
        card.dataset.times = parseInt(card.dataset.times) + 1
        allCardsList[ind].querySelector(".flip-container").classList.add("animate")
        allCardsList[ind].classList.remove("closed-card")
        blub.play()
        if state == 0
          card1 = ind
          state = 1
        else if state == 1
          card2 = ind
          state = 0
          if newList[card1] != newList[card2]
            exposed[card1] = false
            exposed[card2] = false
            exposed[ind] = false
            allCardsList[card1].dataset.open = false
            allCardsList[card2].dataset.open = false
            allCardsList[ind].dataset.open = false
            closeCards = setTimeout(->
              allCardsList[card1].querySelector(".flip-container").classList.remove("animate")
              allCardsList[card2].querySelector(".flip-container").classList.remove("animate")
              allCardsList[card1].classList.add("closed-card")
              allCardsList[card2].classList.add("closed-card")
            , 700)
            if playersTurn == true
              playersTurn = false
              cardsContainer.classList.add("not-clickable")
              myInterval = setInterval(->
                if !playersTurn
                  botPlay()
              , 1000)
            else if playersTurn == false
              playersTurn = true
              cardsContainer.classList.remove("not-clickable")
              clearInterval(myInterval)
              showMessage = setTimeout(->
                messageContainer.innerHTML = "Ваша очередь"
              , 500)
          else
            if playersTurn
              playersScore += 1
            else
              botsScore += 1
            playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore
            botsScoreContainer.innerHTML = "Счёт бота: " + botsScore
    if (false not in exposed)
      if botsScore > playersScore
        messageContainer.innerHTML = "Выиграл бот"
        boo.play()
      else if playersScore > botsScore
        messageContainer.innerHTML = "Вы выиграли"
        yeah.play()
      else
        messageContainer.innerHTML = "Ничья!"
        yeah.play()
  , false)
