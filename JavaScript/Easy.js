console.log('Hello Game started')

const cardsImages = [
'../Easy/1.jpg',
'../Easy/2.jpg',
'../Easy/3.jpg' ,
'../Easy/4.jpg' ]

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
