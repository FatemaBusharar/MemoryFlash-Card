console.log('Hello Game started Hard level')

const cardsImages = [
'../Hard/1.jpg',
'../Hard/2.jpg',
'../Hard/3.jpg',
'../Hard/4.jpg',
'../Hard/5.jpg',
'../Hard/6.jpg',
'../Hard/7.jpg',
'../Hard/8.jpg',
'../Hard/9.jpg',
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
