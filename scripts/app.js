// CREATE AN OUTLINE  - this will encompass all the different needs of the JS: 
  // DOM elements: what is to be caputered from HTML
  // GIRD variables: what will reference the grid: declare these so that they can be changed further down the line if needed
  // GAME variables: moving elements on the screen e.g. aliens will be declared here
  // Functions: both event functions and logic functions here; first one to create will be the button click (to start the game) and creation of the grid 
    // button click: this will set off a timer and 'start' the game (start game function first will work on timer later)
    // create grid: use the grid variables to create a for loop which will append the grid to the child (cells) and also push into an array - this will also greate an element called 'div' which will be styled in css for sizing
  // EVENT listeners - make most of these later - but these will listen out for start button, and key movements on keyboard (space, left/right arrows)

function init() {
  // * DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const start = document.querySelector('#start')
  const audio = document.querySelector('#audio')
  const cells = []

  // * GRID VARIABLES
  const width = 15
  const numOfCells = width * width

  // * GAME VARIABLES 
  let ruPosition = 217
  let michellePosition = width
  const michelleStart = [15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 30, 31, 32,33, 34, 35 ,36, 37, 38, 39, 40, 41, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56]
  let timerID = null
  let numberOfMoves = 0

  // * FUNCTIONS 
  // Functions for beginning of game
  function createGrid() {
    for (let i = 0; i < numOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      // cell.innerHTML = i
      grid.appendChild(cell)
    }
  }
  createGrid()

  function addImages() {
    cells[ruPosition].classList.add('rupaul')
  }
  addImages()

  function createMichelles() {
    michelleStart.forEach(alien =>
      cells[michellePosition + alien].classList.add('michelle'))
  }
  createMichelles()

  // Functions for movement of Aliens 
  
  function removeMichelles() {
    michelleStart.forEach(alien =>
      cells[michellePosition + alien].classList.remove('michelle'))
  }

  function moveMichelleRight() {
    removeMichelles()
    michellePosition = michellePosition + 1
    createMichelles()
  }

  function moveMichelleLeft() {
    removeMichelles()
    michellePosition = michellePosition - 1
    createMichelles()
  }
  function moveMichelleDown() {
    removeMichelles()
    michellePosition += width
    createMichelles()
  }
// need to debug to say that when michelle position reaches 300 it will clear interval 
  function moveMichelle() {
    let michelleIsMovingRight = true
    timerID = setInterval(() => {
      if (michelleIsMovingRight) {
        moveMichelleRight()
      } else {
        moveMichelleLeft()
      }
      numberOfMoves++
      if (numberOfMoves === 4) {
        numberOfMoves = 0
        michelleIsMovingRight = !michelleIsMovingRight
        moveMichelleDown()
      } 
      if (michellePosition === 135) {
        clearInterval(timerID)
      }
    }, 100)
  }

  // EXECUTIONS which handle event listeners
  function handleKeyUp(e) {
    cells[ruPosition].classList.remove('rupaul')
    const x = ruPosition % width
    switch (e.keyCode) {
      case 39: 
        if (x < width - 1) {
          ruPosition++
        }
        break
      case 37:
        if (x > 0) {
          ruPosition--
        }  
        break  
      default:
        break
    }
    cells[ruPosition].classList.add('rupaul')
  } 

  function playIntroMusic() {
    audio.src = 'https://www.youtube.com/embed/aIG97MuVao8'
    audio.play() 
  }

  function startGame() {
    playIntroMusic()
    moveMichelle()
  }

  // * EVENT LISTENERS
  document.addEventListener('keyup', handleKeyUp)
  start.addEventListener('click', startGame)
}

window.addEventListener('DOMContentLoaded', init)