function restartGame() {
    document.location.reload()
}

function continueGame() {
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,widht,height)
    let interval = 4
    countdown = setInterval(() => {
    interval--
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,widht,height)
    ctx.fillStyle = "white"
    ctx.font = "20px sans-serif"
    ctx.fillText(`Game Start in: ${interval}` ,80,300,300,100)
       
    if (interval === 0) {
        gameloop = setInterval(draw, 5)            
    }
    }, 1000);           
    paused = false
    let gamepause = document.getElementsByClassName("gamepause")
    gamepause[0].style.display = "none"
}
const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")

const stats = document.getElementById("stats")
const ctx_stats = stats.getContext("2d")

const canvasGameover = document.getElementById("gameover")
const ctx_gameover = canvasGameover.getContext("2d")

const canvasGamepause = document.getElementById("gameover")
const ctx_gamepause = canvasGamepause.getContext("2d")


const widht = canvas.width
const height = canvas.height

const urlString = document.location.search
const params = new URLSearchParams(urlString)
const player = params.get("player")
console.log(player);

const virusSize = {x: 75, y:75}
let virusPostion1 = {x: 0, y: 0}
let virusPostion2 = {x: 75, y: 0}
let virusPostion3 = {x: 150, y: 0}
let virusPostion4 = {x: 225, y: 0}
const img_virus = new Image()
img_virus.src = "./img/virus.png"

const button = new Image()
button.src = "./img/button.png"

const tolerance = 500
const canHit = 270 
let second = 0
let minute = 0
let interval = 4
let countdown
let gameloop
let fails = 0
let score = 0

let timeMinute
let timeSecond

let paused = false
window.onload = () => {

     countdown = setInterval(() => {
        interval--
        ctx.fillStyle = "black"
        ctx.fillRect(0,0,widht,height)
        ctx.fillStyle = "white"
        ctx.font = "20px sans-serif"
        ctx.fillText(`Game Start in: ${interval}` ,80,300,300,100)
        
        if (interval === 0) {
            gameloop = setInterval(draw, 5)            
        }
    }, 1000);

    document.onkeydown = controller
    timeMinute = setInterval(() => {
        if (second === 59) {
            second = 0
        }else{
            second++
        }
    }, 1000);

    timeSecond = setInterval(() => {
            minute++
    }, 60000);
}

function draw() {
    drawBackground()
    virus1()
    virus2()
    virus3()
    virus4()
    collision()
    drawButton()
    drawLine()
    drawStats()
    // stop countdown
    clearInterval(countdown)
    
    // gameover
    if (fails >= 5) {
        clearInterval(gameloop)
        let gameover = document.getElementsByClassName("gameover")
        gameover[0].style.display = "block"
        clearInterval(timeMinute)
        clearInterval(timeSecond)
        drawGameover()       
    }
}

function drawGameover() {
    ctx_gameover.fillStyle = "black"
    ctx_gameover.fillRect(0,0,500,200)

    ctx_gameover.fillStyle = "white"
    ctx_gameover.font = "20px sans-serif"
    ctx_gameover.fillText("Game Over", 200, 30,100,100)
    ctx_gameover.fillText(`Time: ${minute}:${second}`, 200, 70, 100, 100)
    ctx_gameover.fillText(`Score: ${score}`, 200, 90, 100, 30)
    ctx_gameover.fillText(`Player: ${player}`, 200, 110, 100, 30)
}


function drawStats() {
    ctx_stats.fillStyle = "black"
    ctx_stats.fillRect(0,0,200, 250)

    ctx_stats.fillStyle = "white"
    ctx_stats.font = "15px sans-serif"
    ctx_stats.fillText(`Time: ${minute}:${second}`, 10, 20, 100, 100)
    ctx_stats.fillText(`Score: ${score}`, 10, 40, 100, 30)
    ctx_stats.fillText(`Fails: ${fails}`, 10, 60, 100, 30)
    ctx_stats.fillText(`Player: ${player}`, 10, 80, 100, 30)
}

function drawBackground() {
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,widht,height)


    ctx.fillStyle = "#cc4f4f54"
    ctx.fillRect(0,300,300,300)
}

function virus1() {
    virusPostion1.y++
    ctx.drawImage(img_virus,virusPostion1.x,virusPostion1.y,virusSize.x,virusSize.y)
}

function virus2() {
    virusPostion2.y++
    ctx.drawImage(img_virus,virusPostion2.x,virusPostion2.y,virusSize.x,virusSize.y)
}
function virus3() {
    virusPostion3.y++
    ctx.drawImage(img_virus,virusPostion3.x,virusPostion3.y,virusSize.x,virusSize.y)
}
function virus4() {
    virusPostion4.y++
    ctx.drawImage(img_virus,virusPostion4.x,virusPostion4.y,virusSize.x,virusSize.y)
}

function drawButton() {
    // Button D
    ctx.fillStyle = "#1474e0"
    ctx.fillRect(0,tolerance,75,100)

    // Button F
    ctx.fillStyle = "#1474e0"
    ctx.fillRect(75,tolerance,75,100)

    // Button J
    ctx.fillStyle = "#1474e0"
    ctx.fillRect(150,tolerance,75,100)

    // Button K
    ctx.fillStyle = "#1474e0"
    ctx.fillRect(225,tolerance,75,100)



    ctx.drawImage(button, 10,tolerance, 280, 100)

}

function collision() {
    if (virusPostion1.y > tolerance) {
        virusPostion1.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
        virusPostion1.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        fails++
    }
    if (virusPostion2.y > tolerance) {
        virusPostion2.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
        virusPostion2.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        fails++
    }
    if (virusPostion3.y > tolerance) {
        virusPostion3.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
        virusPostion3.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        fails++
    }
    if (virusPostion4.y > tolerance) {
        virusPostion4.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
        virusPostion4.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        fails++
    }
}

function drawLine() {
    // Line 1
    ctx.beginPath()
    ctx.moveTo(75, 0)
    ctx.lineTo(75, height)
    ctx.strokeStyle = "white"
    ctx.stroke()

    // Line 2
    ctx.beginPath()
    ctx.moveTo(150, 0)
    ctx.lineTo(150, height)
    ctx.strokeStyle = "white"
    ctx.stroke()

    // Line 3
    ctx.beginPath()
    ctx.moveTo(225, 0)
    ctx.lineTo(225, height)
    ctx.strokeStyle = "white"
    ctx.stroke()

    // Line 4 horizontal
    ctx.beginPath()
    ctx.moveTo(0, tolerance)
    ctx.lineTo(widht, tolerance)
    ctx.strokeStyle = "white"
    ctx.stroke()

    // Line 5 Horizontal
    ctx.beginPath()
    ctx.moveTo(0, 300)
    ctx.lineTo(widht, 300)
    ctx.strokeStyle = "white"
    ctx.stroke()
}

function controller(e) {
    // Key D 
    if (e.key === "d") {
        // Button D
        if (virusPostion1.y > canHit && virusPostion1.x === 0) {
            // virusPostion1.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion1.y = -100
            score++
            virusPostion1.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion2.y > canHit && virusPostion2.x === 0) {
            // virusPostion2.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion2.y = -100
            score++
            virusPostion2.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion3.y > canHit && virusPostion3.x === 0) {
            virusPostion3.y = -100
            score++
            // virusPostion3.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion3.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion4.y > canHit && virusPostion4.x === 0) {
            virusPostion4.y = -100
            score++
            // virusPostion4.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion4.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
    }

    // Key F
    if (e.key === "f") {
        if (virusPostion1.y > canHit && virusPostion1.x === 75) {
            // virusPostion1.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion1.y = -100
            score++
            virusPostion1.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion2.y > canHit && virusPostion2.x === 75) {
            // virusPostion2.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion2.y = -100
            score++
            virusPostion2.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion3.y > canHit && virusPostion3.x === 75) {
            // virusPostion3.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion3.y = -100
            score++
            virusPostion3.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x

        }
        if (virusPostion4.y > canHit && virusPostion4.x === 75) {
            virusPostion4.y = -100
            score++
            // virusPostion4.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion4.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
    }

    // Key J
    if (e.key === "j") {
        if (virusPostion1.y > canHit && virusPostion1.x === 150) {
            // virusPostion1.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion1.y = -100
            score++
            virusPostion1.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion2.y > canHit && virusPostion2.x === 150) {
            // virusPostion2.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion2.y = -100
            score++
            virusPostion2.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion3.y > canHit && virusPostion3.x === 150) {
            // virusPostion3.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion3.y = -100
            score++

            virusPostion3.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion4.y > canHit && virusPostion4.x === 150) {
            virusPostion4.y = -100
            score++

            // virusPostion4.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion4.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
    }

    // Key J
    if (e.key === "k") {
        if (virusPostion1.y > canHit && virusPostion1.x === 225) {
            // virusPostion1.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion1.y = -100
            score++
            virusPostion1.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion2.y > canHit && virusPostion2.x === 225) {
            // virusPostion2.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion2.y = -100
            score++
            virusPostion2.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion3.y > canHit && virusPostion3.x === 225) {
            // virusPostion3.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion3.y = -100
            score++
            virusPostion3.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }
        if (virusPostion4.y > canHit && virusPostion4.x === 225) {
            // virusPostion4.y = Math.floor(Math.random() * (widht / virusSize.y)) * virusSize.y -75
            virusPostion4.y = -100
            score++
            virusPostion4.x = Math.floor(Math.random() * (widht / virusSize.x)) * virusSize.x
        }

        // Key ESC
    }
    if (e.key === "Escape") {
        if (paused) {
            ctx.fillStyle = "black"
            ctx.fillRect(0,0,widht,height)
            interval = 4
            countdown = setInterval(() => {
            interval--
            ctx.fillStyle = "black"
            ctx.fillRect(0,0,widht,height)
            ctx.fillStyle = "white"
            ctx.font = "20px sans-serif"
            ctx.fillText(`Game Start in: ${interval}` ,80,300,300,100)
               
            if (interval === 0) {
                gameloop = setInterval(draw, 5)            
            }
            }, 1000);           
            paused = false
            let gamepause = document.getElementsByClassName("gamepause")
            gamepause[0].style.display = "none"

        }else{
            clearInterval(gameloop)
            paused = true
            let gamepause = document.getElementsByClassName("gamepause")
            gamepause[0].style.display = "block"
        }
    }
}