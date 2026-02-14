console.log('Hello Game started Medium level')

const cardsImages = [
'../Medium/1.jpg',
'../Medium/2.jpg',
'../Medium/3.jpg',
'../Medium/4.jpg',
'../Medium/5.jpg',
'../Medium/6.jpg',
]

let firstCard = null
let secondCard = null
let moves = 0
let matches = 0
let score = 0
let seconds = 0
let timer = null
let cardFlip = true
let gameStarted = false 

const board = document.getElementById('gameBoard')
const movesE = document.getElementById('Moves')
const timeE = document.getElementById('Time')
const matchesE = document.getElementById('Matches')
const scoreE = document.getElementById('Score')
const startBtn = document.getElementById('startBtn')
const resetBtn = document.getElementById('resetBtn')
const winModel = document.getElementById('winModel')
const lastMove = document.getElementById('lastMove')
const finishTime = document.getElementById('finishTime')
const lastScore = document.getElementById('lastScore')

function startGame(){

    // clear game from any prev memoryCard
    board.innerHTML=''

    // reset slected card 
    firstCard = null
    secondCard = null

    // reset game value
    moves = 0
    matches = 0
    score = 0
    seconds = 0

    // to card flip
    cardFlip = true

    // to game start
    gameStarted = true

    // reset timer
    clearInterval(timer)

    // start new timer 
    timer = setInterval(updateTimer,1000)

    // duplicate cardImage , card shuffle randomly
    let memoryCards = [cardsImages , cardsImages]
    memoryCards.sort(()=> Math.random()-0.5)

    // loop to create , store and two side of card 
    memoryCards.forEach((imgCard)=>{
        const memoryCard = document.createElement('div')
        memoryCard.className = 'memoryCard'
        memoryCard.dataset.image = imgCard

        memoryCard.innerHTML=`
        <div class="cardFront"></div>
        <div class="cardBack"><img src="${imgCard}"></div>`

        memoryCard.addEventListener('click',flipCard)
        board.appendChild(memoryCard)
    })

    updateCard()

}

function flipMCard(){

    if (!gameStarted) return
    if(!canCFlip) return

    // if the card already flip
    if(this.classList.contains('MCardflipped')) return

    // to flip select card
    this.classList.add('MCardflipped')

    // to store the card and wait 
    if(!firstCard){
        firstCard = this
        return
    }

    // to set the card , lock flip and count moves
    secondCard = this
    canCFlip = false
    moves++

    checkCardMatch()
    updateCard()

}

function checkCardMatch(){

    // two card match
    if(firstCard.dataset.image === secondCard.dataset.image){
        matches++
        score += 10
        resetCard()

        // to end game if all mathched
        if(matches==cardsImages.length){
            endGame()
        }
    }
    else {
        // subtract point "not below 0" and flip back after
        score = Math.max(0 , score-2)
        setTimeout(()=>{
            firstCard.classList.remove('MCardflipped')
            secondCard.classList.remove('MCardflipped')
            resetCard()
        },800)
    }
}
function resetCard(){
    firstCard = null
    secondCard = null
    cardFlip = true
    updateCard()
}

function updateTimer(){
    seconds++
    updateCard()
}

function updateCard(){
    movesE.textContent = moves
    matchesE.textContent = matches + ' / ' + cardsImages.length
    scoreE.textContent = score

    const minute = Math.floor(seconds/60)
    const second = seconds % 60 

    timeE.textContent = minute + ':' + (second<10 ? '0':'') +second
}

function endGame(){
    clearInterval(timer)
    gameStarted = false

    if(!lastMove || !finishTime || !lastScore || !winModel) return
    lastMove.textContent = moves
    finishTime.textContent = timeE.textContent
    lastScore.textContent = score

    winModel.style.display='block'

}

function resetGame(){
    clearInterval(timer)

    seconds = 0
    moves = 0
    matches = 0
    score = 0

    updateCard()

    winModel.style.display = 'none'
    startGame()
}

function nextLevel(){
    window.location.href='../HTML/Hard.html'
}