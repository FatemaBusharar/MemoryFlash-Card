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
