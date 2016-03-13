list1 = [0..7]
list2 = [0..7]
endList = list1.concat(list2)
cardsContainer = document.getElementById("cardsContainer")
allCards = []
messageContainer = document.getElementById("messageContainer")
botsScoreContainer = document.getElementById("botsScore")
playersScoreContainer = document.getElementById("playersScore")
startBtn = document.getElementById("startBtn")
exposed = []
state = 0
card1 = 33
card2 = 33
blub = new Audio('blub.wav')
yeah = new Audio('yeah.wav')
boo = new Audio('boo.wav')
playersTurn = true
playersScore = 0
botsScore = 0
myInterval = null

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

newList = shuffle(endList)

createCards = ->
  card = document.querySelector(".card")
  for i in newList
    cln = card.cloneNode(true)
    cln.dataset.number = i
    cln.querySelector(".back").style.backgroundImage = "url(img/#{i}.png)"
    cardsContainer.appendChild(cln)
  for i in endList
    exposed.push(false)

window.onload = ->
  createCards()
  allCards = cardsContainer.querySelectorAll(".card")
  for i in allCards
    i.classList.add("closed-card")
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
          if (i.dataset.number == allCardsList[card1].dataset.number) && (i.dataset.times > 0)
            cardToClick = i
      botNum = getRandom(0, closedCards.length)
      cardToClick.querySelector(".front").click()

  startBtn.addEventListener("click", ->
    cardsContainer.innerHTML = ''
    exposed = []
    newList = shuffle(endList)
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
    # clearTimeout(closeCards)
    # clearTimeout(showMessage)
    state = 0
    card1 = 33
    card2 = 33
    playersScoreContainer.innerHTML = "Ваш счёт: " + playersScore
    botsScoreContainer.innerHTML = "Счёт бота: " + botsScore
    messageContainer.innerHTML = "Ваша очередь"
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
