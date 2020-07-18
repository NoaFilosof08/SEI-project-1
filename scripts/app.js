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
  console.log(grid)
  const cells = []

  // * GRID VARIABLES
  const width = 10
  const numOfCells = width * width

  // * GAME VARIABLES 
  let ruPosition = 90


  // * FUNCTIONS 
  // create a for loop to create 100 cells which will thus create the grid - when this happens - create an element called div (so this will happen each time with the loop), each loop, push the div (just created) into an array of cells, and also append the cell (div just created) to the parent grid.
  function createGrid() {
    console.log('hello')
    for (let i = 0; i < numOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      cell.innerHTML = i
      grid.appendChild(cell)
    }
    cells[ruPosition].classList.add('rupaul')
  }
  createGrid()

  // create a function which listens to the keys to move ruPaul at the bottom of the page 
  function handleKeyUp(e) {
    console.log(e.keyCode)
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


  // * EVENT LISTENERS
  document.addEventListener('keyup', handleKeyUp)

}

window.addEventListener('DOMContentLoaded', init)