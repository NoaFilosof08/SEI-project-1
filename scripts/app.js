// change score count on winning outro page to reflect the right number 
function init() {
  // * DOM ELEMENTS
  const grid = document.querySelector('.grid')
  const start = document.querySelectorAll('.startgame')
  const startAudio = document.querySelector('#audio')
  const looseAudio = document.querySelector('#audio2')
  const mainGameAudio = document.querySelector('#main-game-audio')
  const winAudio = document.querySelector('#condragulations-audio')
  const scoreDisplay = document.querySelector('#score-display')
  const introPageBtn = document.querySelector('.startgame')
  const introPage = document.querySelector('.intro')
  const outroLostPage = document.querySelector('#outro-lost')
  const outroWonPage = document.querySelector('#outro-won')
  const finalScore = document.querySelector('.final-score')
  const timeLeft = document.querySelector('#time-left')
  const restart = document.querySelectorAll('.reset')
  const cells = []

  // * GRID VARIABLES
  const width = 15
  const numOfCells = width * width

  // * GAME VARIABLES 
  let ruPosition = 202
  let michellePosition = width
  let michelleStart = [15, 16]
    // , 17, 19, 20, 21, 22, 24, 25, 26, 30, 31, 32, 34, 35 ,36, 37, 39, 40, 41, 45, 46, 47, 49, 50, 51, 52, 54, 55, 56, 60, 61, 62, 64, 65, 66, 67, 69, 70, 71, 75, 76, 77, 79, 80, 81, 82, 84, 85, 86]
  let laserPosition = ruPosition - width
  // let michelleLaserPosition = michellePosition + (width * 3)
  let laserAvail = true
  let timerID = null
  let numberOfMoves = 0
  let score = 0
  // let countdownTimerID = null 
  // let count = 5

  // * FUNCTIONS
  function resetButton() {
    console.log('Button is being clicked')
  }


  function removeIntroPage() {
    const delayMichelle = setTimeout(() => {
      introPage.style.zIndex = '-99'
      introPage.style.opacity = '0'
    }, 4000)
  }

  function addOutroLostPage() {
    outroLostPage.style.opacity = '1'
    finalScore.innerHTML = score
    const delayLoose = setTimeout(() => {
      looseAudio.src = 'assets/sashayaway2 (1).m4a'
      looseAudio.play()
    }, 500);
  }

  function addOutroWonPage() {
    outroWonPage.style.opacity = '1'
    finalScore.innerHTML = score
    const delayWin = setTimeout(() => {
      winAudio.src = 'assets/condragulations.m4a'
    winAudio.play()
    }, 500);
  
  }

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

  //write a function which counts down the time left in the game

  function countdownTimer() {
    let countdownTimerID = null
    let count = 31
    countdownTimerID = setInterval(() => {
      count --
      if (count < 0) {
        clearInterval(countdownTimerID)
      } else {
        timeLeft.innerHTML = count
      }  
    }, 1000);
  }

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

function moveMichelle() {
    countdownTimer()
    mainGameAudio.src = 'assets/maingame.m4a'
    mainGameAudio.play()
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
      if (michellePosition === 105) {
        clearInterval(timerID)
        mainGameAudio.pause()
        addOutroLostPage()
      }
    }, 200)
  }

  function delayMoveMichelle() {
    const delayMichelle = setTimeout(() => {
      moveMichelle()
    }, 4500);
  }

  // Laser Shooting Function 
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

  function removeExplosion() {
    const remove = setTimeout(() => {
      cells[laserPosition].classList.remove('explosion')
      clearInterval(remove)
    }, 50);
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
        cells[laserPosition].classList.add('explosion')
        clearInterval(laserTimerID)
        laserAvail = true
        cells[laserPosition].classList.remove('michelle')
        michelleStart = michelleStart.filter(m => {
          return m !== (laserPosition - michellePosition)
        })
        removeLaser()
        removeExplosion()
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
        mainGameAudio.pause()
        clearInterval(timerID)
        addOutroWonPage()
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

  function playIntroMusic() {
    startAudio.src = 'assets/rupaul start your engines.1.m4a'
    startAudio.play() 
  }

  function beginGame() {
    playIntroMusic()
    delayMoveMichelle()
    
  }

  // * EVENT LISTENERS
  start.forEach(button => {
    button.addEventListener('click', beginGame)
  })
  document.addEventListener('keyup', handleKeyUp)
  document.addEventListener('keydown', handleKeyDown)
  introPageBtn.addEventListener('click', removeIntroPage)
  restart.forEach(btn => {
    btn.addEventListener('click', resetButton)
  })
}

window.addEventListener('DOMContentLoaded', init)