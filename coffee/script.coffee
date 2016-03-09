list1 = [0..7]
list2 = [0..7]
endList = list1.concat(list2)
cardsContainer = document.getElementById("cardsContainer")
allCards = []
messageContainer = document.getElementById("messageContainer")
exposed = []
for i in endList
  exposed.push(false)
state = 0
card1 = 33
card2 = 33
turns = 0
blub = new Audio('blub.wav')
yeah = new Audio('yeah.wav')

shuffle = (array) ->
  currentIndex = array.length
  while 0 != currentIndex
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  return array

newList = shuffle(endList)

createCards = ->
  card = document.querySelector(".card")
  for i in newList
    cln = card.cloneNode(true)
    cln.dataset.number = i
    # cln.querySelector(".back").innerHTML = cln.dataset.number
    cln.querySelector(".back").style.backgroundImage = "url(img/#{i}.png)"
    cardsContainer.appendChild(cln)

window.onload = ->
  createCards()
  allCards = cardsContainer.querySelectorAll(".card")
  allCardsList = Array.prototype.slice.call(allCards, 0)
  messageContainer.innerHTML = "Turns = " + turns
  cards = document.querySelectorAll(".card")
  for card in cards
    card.addEventListener("click", ->
      ind = allCardsList.indexOf(this)
      if exposed[ind] == false
        exposed[ind] = true
        allCardsList[ind].querySelector(".flip-container").classList.add("animate")
        blub.play()
        if state == 0
          card1 = ind
          state = 1
          turns += 1
          messageContainer.innerHTML = "Turns = " + turns
        else if state == 1
          card2 = ind
          state = 2
        else
          turns += 1
          messageContainer.innerHTML = "Turns = " + turns
          if newList[card1] != newList[card2]
            exposed[card1] = false
            exposed[card2] = false
            allCardsList[card1].querySelector(".flip-container").classList.remove("animate")
            allCardsList[card2].querySelector(".flip-container").classList.remove("animate")
            card1 = ind
            state = 1
          else
            card1 = ind
            state = 1
      if !(false in exposed)
        yeah.play()
    )
