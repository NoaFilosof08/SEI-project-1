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
  const scoreDisplay = document.querySelector('#score-display')
  const introPageBtns = document.querySelectorAll('.startgame')
  const introPage = document.querySelector('.intro')
  const cells = []

  // * GRID VARIABLES
  const width = 15
  const numOfCells = width * width

  // * GAME VARIABLES 
  let ruPosition = 202
  let michellePosition = 0
  let michelleStart = [15, 16, 17]
    // 19, 20, 21, 22, 24, 25, 26, 30, 31, 32, 34, 35 ,36, 37, 39, 40, 41, 45, 46, 47, 49, 50, 51, 52, 54, 55, 56, 60, 61, 62, 64, 65, 66, 67, 69, 70, 71, 75, 76, 77, 79, 80, 81, 82, 84, 85, 86]
  let laserPosition = ruPosition - width
  // let michelleLaserPosition = michellePosition + (width * 3)
  let laserAvail = true
  let timerID = null
  let numberOfMoves = 0
  let score = 0

  // * FUNCTIONS 
  // Functions for beginning of game
  function removeIntroPage() {
    console.log('hello')
    introPage.style.zIndex = '-99'
    // introPage.classList.add('hide-page')
    introPage.style.opacity = '0'
  }

  function createGrid() {
    for (let i = 0; i < numOfCells; i++) {
      const cell = document.createElement('div')
      cells.push(cell)
      cell.innerHTML = i
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

  // write a function for the michelles to randomly shoot at the player 
  // function createMichelleLaser() {
  //   cells[michelleLaserPosition].classList.add('michelle-laser')
  // }

  // function removeMichelleLaser() {
  //   cells[michelleLaserPosition].classList.remove('michelle-laser')
  // }

  // function moveMichelleLaser() {
  //   removeMichelleLaser()
  //   michelleLaserPosition = michelleLaserPosition + width 
  //   createMichelleLaser()
  // }

  // function shootingMichelleLaser() {
  //   michelleLaserPosition = michellePosition + width 
  //   let michelleWillShoot = true
  //   const michelleLaserTimerID = setInterval(() => {
  //     if (michelleWillShoot) {
  //       moveMichelleLaser()
  //     } else {
  //       clearInterval(michelleLaserTimerID)
  //     }
  //     michelleLaserPosition = Math.floor(Math.random() * michelleStart)
  //     moveMichelleLaser()
  //     if (cells[michelleLaserPosition].classList.contains('rupaul')) {
  //       clearInterval(michelleLaserTimerID)
  //       cells[ruPosition].classList.remove('rupaul')
  //     }
  //   }, 300)
  // }

// need to debug to say that when michelle position reaches 300 it will clear interval 
  function moveMichelle() {
    let michelleIsMovingRight = true
    timerID = setInterval(() => {
      
      if (michelleIsMovingRight) {
        moveMichelleRight()
      } else {
        moveMichelleLeft()
      }
      // shootingMichelleLaser()
      numberOfMoves++
      if (numberOfMoves === 3) {
        numberOfMoves = 0
        michelleIsMovingRight = !michelleIsMovingRight
        moveMichelleDown()
      } 
      if (michellePosition === 135) {
        clearInterval(timerID)
        window.alert('game over! You Scored:', score)
      }
    }, 1000)
  }

  // function to shoot laser from ru image. Start by creating 3 functions which are a) laser being fired, b) laser being created and c) laser being moved 
  function createLaser() {
    cells[laserPosition].classList.add('laser')
  }

  function removeLaser() {
    cells[laserPosition].classList.remove('laser')
  }

  function moveLaser() {
    removeLaser()
    laserPosition = laserPosition - width
    createLaser()
  }

  function shootingLaser() {
    if (!laserAvail) {
      return 
    }
    laserAvail = false
    laserPosition = ruPosition - width
    let moveLaserVertically = true
    const laserTimerID = setInterval(() => {
      removeLaser()
      if (moveLaserVertically) {
        moveLaser()
      } else {
        removeLaser()
      }

      if (cells[laserPosition].classList.contains('michelle')) {
        console.log(michelleStart.length)
        clearInterval(laserTimerID)
        laserAvail = true
        cells[laserPosition].classList.remove('michelle')
        michelleStart = michelleStart.filter(m => {
          return m !== (laserPosition - michellePosition)
        })
        removeLaser()
        score += 1000
        scoreDisplay.innerHTML = score
      } else if (laserPosition < width) {
        clearInterval(laserTimerID)
        laserAvail = true 
        removeLaser()
      }

      if (michelleStart.length === 0) {
        cells[laserPosition].classList.remove('michelle')
        removeLaser()
        cells[ruPosition].classList.remove('rupaul')
        clearInterval(timerID)
        window.alert('you have won!')
      }
    }, 50)
  }

  // EXECUTIONS which handle event listeners
  
  function handleKeyDown(e) {
    let keyDown = e.keyCode 
    if (keyDown === 32) {
      e.preventDefault()
    }
  }

  function handleKeyUp(e) {
    cells[ruPosition].classList.remove('rupaul')
    const x = ruPosition % width
    const y = Math.floor(ruPosition / width)
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
      case 32: 
        if (y > 0) {
          shootingLaser()
        }
      default:
        break
    }
    cells[ruPosition].classList.add('rupaul')
  } 

  // function playIntroMusic() {
  //   audio.src = ''
  //   audio.play() 
  // }

  function beginGame() {
    // playIntroMusic()
    moveMichelle()
  }

  // * EVENT LISTENERS
  start.addEventListener('click', beginGame)
  document.addEventListener('keyup', handleKeyUp)
  document.addEventListener('keydown', handleKeyDown)
  introPageBtns.forEach(btn => {
    btn.addEventListener('click', removeIntroPage)
  })
  
}

window.addEventListener('DOMContentLoaded', init)