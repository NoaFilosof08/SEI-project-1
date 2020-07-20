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
  const cells = []

  // * GRID VARIABLES
  const width = 20
  const numOfCells = width * width

  // * GAME VARIABLES 
  let ruPosition = 390
  let michellePosition = [23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37]
  let alien1Position = 20
  let rossPosition = [43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57]
  let alien2Position = 20
  let carsonPosition = [63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 72, 73, 74, 75, 76, 77]
  let alien3Position = 20

  // * FUNCTIONS 
  // create a for loop to create 100 cells which will thus create the grid - when this happens - create an element called div (so this will happen each time with the loop), each loop, push the div (just created) into an array of cells, and also append the cell (div just created) to the parent grid.
  function createGrid() {
    console.log('hello')
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

  function alienGridPosition() {
    michellePosition.forEach(alien =>
      cells[alien1Position + alien].classList.add('michelle'))
    rossPosition.forEach(alien =>
      cells[alien2Position + alien].classList.add('ross'))
    carsonPosition.forEach(alien =>
      cells[alien3Position + alien].classList.add('carson'))
  }
  alienGridPosition()

  // create a function which listens to the keys to move ruPaul at the bottom of the page 
  function handleKeyUp(e) {
    console.log(e.keyCode)
    cells[ruPosition].classList.remove('rupaul')
    const x = ruPosition % width
    // const x = Math.floor(shangelaPosition / width)
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
      // case 32:
      //   if (y < width - 1) {
      //     shangelaPosition += (width - 3)
      //     cells[shangelaPosition].classList.add('shangela')
      //   }
      default:
        break
    }
    cells[ruPosition].classList.add('rupaul')
  } 

  // create a function which starts the game and initiates a timer of how long the game will last until you are 'killed'
  // write a second timer function which removes michelle/carson/ross from their places and pushes them down the grid one row after 10 seconds 
  function startGame() {
    console.log('clicked')
    let timerID = null
    let count = 0
    timerID = setInterval(() => {
      if (count > 3) {
        clearInterval(timerID)
        cells[michellePosition].classList.remove('michelle')
        window.alert('game over')
      } 
      count++
      cells[michellePosition].classList.remove('michelle')
      michellePosition += width 
      console.log(michellePosition)
      cells[michellePosition].classList.add('michelle')
    }, 1000)
  }


  // * EVENT LISTENERS
  document.addEventListener('keyup', handleKeyUp)
  start.addEventListener('click', startGame)
}

window.addEventListener('DOMContentLoaded', init)