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
turns = 0
myInterval = null
num = 0
botType = "smart" # smart, normal or stupid
chooseTheme = document.getElementById("chooseTheme")
theme = "programming"
mode = "singleMode" # "botMode" or "singleMode"
mainScreen = document.getElementById("mainScreen")
settingsItems = document.querySelectorAll(".settings-item")

shuffle = (array) ->
  currentIndex = array.length
  while currentIndex != 0
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  return array

newList = shuffle(list1.concat(list1.slice()))

getRandom = (min, max) ->
  return Math.floor(Math.random() * (max - min)) + min

createCards = ->
  cardsMaxNum = parseInt(document.querySelector(".choose-num:checked").dataset.cardsnum)
  list1 = [0..cardsMaxNum]
  newList = shuffle(list1.concat(list1.slice()))
  card = document.querySelector(".card")
  theme = chooseTheme.value
  mode = document.querySelector(".choose-mode:checked").dataset.mode
  for i in newList
    cln = card.cloneNode(true)
    cln.dataset.number = i
    cln.querySelector(".back").style.backgroundImage = "url(img/#{theme}/#{i}.png)"
    cardsContainer.appendChild(cln)
  for i in newList
    exposed.push(false)

window.onload = ->
  cardsMaxNum = parseInt(document.querySelector(".choose-num:checked").dataset.cardsnum)
  if cardsMaxNum == 7
    gameContainer.class = "game-container large"
  else if cardsMaxNum == 11
    gameContainer.class = "game-container"
  botType = document.querySelector(".choose-bot:checked").dataset.bottype
  createCards()
  allCards = cardsContainer.querySelectorAll(".card")
  num = 0
  for i in allCards
    i.classList.add("closed-card")
    i.setAttribute("id", "card#{num}")
    i.style.animationDelay = "#{num * 0.1}s"
    num++
  allCardsList = Array.prototype.slice.call(allCards, 0)
  if mode == "botMode"
    messageContainer.innerHTML = "Ваша очередь"
    botsScoreContainer.innerHTML = "Счёт бота: " + botsScore
  playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore

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
    list1 = [0..cardsMaxNum]
    newList = shuffle(list1.concat(list1.slice()))
    createCards()
    if cardsMaxNum == 7
      gameContainer.className = "game-container"
    else if cardsMaxNum == 11
      gameContainer.className = "game-container large"
    allCards = cardsContainer.querySelectorAll(".card")
    for i in allCards
      i.classList.add("closed-card")
    allCardsList = Array.prototype.slice.call(allCards, 0)
    playersTurn = true
    playersScore = 0
    botsScore = 0
    turns = 0
    clearInterval(myInterval)
    cardsContainer.classList.remove("not-clickable")
    state = 0
    card1 = 33
    card2 = 33
    if mode == "botMode"
      botsScoreContainer.innerHTML = "Счёт бота: " + botsScore
      messageContainer.innerHTML = "Ваша очередь"
    else if mode == "singleMode"
      botsScoreContainer.innerHTML = ""
      messageContainer.innerHTML = ""
    playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore

  startBtn.addEventListener("click", newGame)
  for item in settingsItems
    item.addEventListener("change", newGame)

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
          if mode == "singleMode"
            playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore
          if newList[card1] != newList[card2]
            exposed[card1] = false
            exposed[card2] = false
            exposed[ind] = false
            allCardsList[card1].dataset.open = false
            allCardsList[card2].dataset.open = false
            allCardsList[ind].dataset.open = false
            cardsContainer.classList.add("not-clickable")
            closeCards = setTimeout(->
              allCardsList[card1].querySelector(".flip-container").classList.remove("animate")
              allCardsList[card2].querySelector(".flip-container").classList.remove("animate")
              allCardsList[card1].classList.add("closed-card")
              allCardsList[card2].classList.add("closed-card")
              if mode != "botMode"
                cardsContainer.classList.remove("not-clickable")
            , 700)
            if mode == "botMode"
              if playersTurn == true
                playersTurn = false
                cardsContainer.classList.add("not-clickable")
                myInterval = setInterval(->
                  if !playersTurn
                    botPlay()
                , 1000)
              else if playersTurn == false
                playersTurn = true
                clearInterval(myInterval)
                showMessage = setTimeout(->
                  messageContainer.innerHTML = "Ваша очередь"
                  cardsContainer.classList.remove("not-clickable")
                , 700)
          else
            if mode == "botMode"
              if playersTurn
                playersScore += 1
                console.log playersScore
              else
                botsScore += 1
              botsScoreContainer.innerHTML = "Счёт бота: " + botsScore
            else if mode == "singleMode"
              switch allCardsList[card2].dataset.times
                when "1"
                  if false not in exposed
                    playersScore += 100
                    console.log "Last one doesn't count"
                  else
                    playersScore += 500
                    console.log "Bingo!"
                when "2" then playersScore += 300
                when "3" then playersScore += 200
                when "4" then playersScore += 100
                else playersScore += 50
            playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore
            playersScoreContainer.classList.add("score-animated")
            setTimeout(->
              playersScoreContainer.classList.remove("score-animated")
            , 500)
    if (false not in exposed)
      if botsScore > playersScore
        messageContainer.innerHTML = "Выиграл бот"
        boo.play()
      else if playersScore > botsScore
        if mode == "botMode"
          messageContainer.innerHTML = "Вы выиграли"
        yeah.play()
      else
        messageContainer.innerHTML = "Ничья!"
        yeah.play()
  , false)
