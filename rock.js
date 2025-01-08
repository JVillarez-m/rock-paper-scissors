let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0,
}

updateScore()

let isAutoPlaying = false
let intervalID


document.querySelector('.js-btn-auto')
    .addEventListener('click', () => {
        let autoPlayClick = document.querySelector('.js-btn-auto')
    
        if (!isAutoPlaying) {
            intervalID = setInterval(() => {
                const playerMove = pickComputerMove()
                playGame(playerMove)
            }, 1000);
            isAutoPlaying = true
            autoPlayClick.innerText = 'Stop Play'
        } else {
            clearInterval(intervalID)
            isAutoPlaying = false
            autoPlayClick.innerText = 'Auto Play'
        }

    })


document.querySelectorAll('.js-btn')
    .forEach(btn => {
        btn.addEventListener('click', (event) => {
            let _class = event.currentTarget.classList
            
            if (_class.contains('js-btn-rock')) {
                playGame('rock')
            } else if (_class.contains('js-btn-paper')) {
                playGame('paper')
            } else if (_class.contains('js-btn-scissors')) {
                playGame('scissors')
            }
        })
    })


document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r') {
        playGame('rock')
    } else if (event.key === 'p') {
        playGame('paper')
    } else if (event.key === 's') {
        playGame('scissors')
    }
})


function playGame(playerMove) {
    const computerMove = pickComputerMove()
        
        let result = ''

        if (playerMove === 'rock') {
            if (computerMove === 'rock') {
                result = 'Tie.'
            } else if (computerMove === 'paper') {
                result = 'You lose.'
            } else if (computerMove === 'scissors') {
                result = 'You win.'
            }
             
        } else if (playerMove === 'paper') {
            if (computerMove === 'rock') {
                result = 'You win.'
            } else if (computerMove === 'paper') {
                result = 'Tie.'
            } else if (computerMove === 'scissors') {
                result = 'You lose.'
            }
        } else if (playerMove === 'scissors'){
            if (computerMove === 'rock') {
                result = 'You lose.'
            } else if (computerMove === 'paper') {
                result = 'You win.'
            } else if (computerMove === 'scissors') {
                result = 'Tie.'
            }
        }

        if (result === 'You win.'){
            score.wins++
        } else if (result === 'You lose.'){
            score.losses++
        } else if (result === 'Tie.'){
            score.ties++
        }

        localStorage.setItem('score', JSON.stringify(score))

        updateScore()

        document.querySelector('.js-result').innerHTML = result
        document.querySelector('.js-moves').innerHTML = `You
        <img class="move-icon" src="./img/${playerMove}-emoji.png" alt="Rock emoji">
        <img class="move-icon" src="./img/${computerMove}-emoji.png" alt="Rock emoji">
        Computer`
}

document.querySelector('.js-reset-btn')
    .addEventListener('click', () => {
        score.wins = 0
        score.losses = 0
        score.ties = 0
        localStorage.removeItem('score')
        updateScore()
    })


function updateScore() {
    document.querySelector('.js-score')
        .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`
}

function pickComputerMove(){
    const randomNumber = Math.random()

    let computerMove = ''

    if(randomNumber >= 0 && randomNumber < 1 / 3){
        computerMove = 'rock'
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3){
        computerMove = 'paper'
    } else if (randomNumber >= 2 / 3 && randomNumber < 1){
        computerMove = 'scissors'
    }

    return computerMove
}