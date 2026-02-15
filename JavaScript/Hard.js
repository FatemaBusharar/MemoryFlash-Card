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
'../Hard/10.jpg',

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

const winSound = new Audio('../Sounds/win.mp3')
const scoreUp = new Audio('../Sounds/scoreUp.mp3')
const scoreDown = new Audio('../Sounds/scoreDown.mp3')

winSound.volume = 0.5
scoreUp.volume = 0.5
scoreDown.volume = 0.5

startBtn.addEventListener('click',startGame)
resetBtn.addEventListener('click',resetGame)

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
    let memoryCards = [...cardsImages , ...cardsImages]
    memoryCards.sort(()=> Math.random()-0.5)

    // loop to create , store and two side of card 
    memoryCards.forEach((imgCard)=>{
        const memoryCard = document.createElement('div')
        memoryCard.className = 'memoryCard'
        memoryCard.dataset.image = imgCard

        memoryCard.innerHTML=`
        <div class="cardFront"></div>
        <div class="cardBack"><img src="${imgCard}"></div>`

        memoryCard.addEventListener('click',flipMCard)
        board.appendChild(memoryCard)
    })

    updateCard()

}

function flipMCard(){

    if (!gameStarted) return
    if(!cardFlip) return

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
    cardFlip = false
    moves++

    checkCardMatch()
    updateCard()

}

function checkCardMatch(){

    // two card match
    if(firstCard.dataset.image === secondCard.dataset.image){
        matches++
        score += 10
        scoreUp.currentTime = 0
        scoreUp.play()

        resetCard()

        // to end game if all mathched
        if(matches === cardsImages.length){
            endGame()
        }
    }
    else {
        // subtract point "not below 0" and flip back after
        score = Math.max(0 , score-2)
        scoreDown.currentTime = 0
        scoreDown.play()

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
    
    winSound.currentTime = 0
    winSound.play()
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
