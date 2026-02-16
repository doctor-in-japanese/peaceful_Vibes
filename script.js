document.addEventListener("DOMContentLoaded", setupGame);

//add event listener to button
//create an element
//give the element id

let canvas, ctx;
let ballX, ballY, ballSpeedX, ballSpeedY, ballSize = 13;

let paddleWidth = 85;
let paddleHeight = 10;
let paddleX;

let keys = {left: false, right: false};
let gameRunning = false;

function setupGame(){
    canvas = document.getElementById("pongCanvas");
    ctx = canvas.getContext("2d");

    const startButton = document.getElementById("startButton");
    startButton.addEventListener("click", startGame);

    setupControls();
} 

function setupControls(){
    document.addEventListener("keydown", (e) => {
        if(e.key=== "ArrowLeft"){
            paddleX -= 30;
        }
        if (e.key === "ArrowRight"){
            paddleX += 30;
        }

        if(paddleX < 0) paddleX = 0;
        if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;
    });
}

function startGame(){
    document.getElementById("pongCanvas").style.display = "block";

    resetGame();
    if(!gameRunning){
        gameRunning = true;
        updateGame();
    }
}

function resetGame(){
    ballX = canvas.width/2;
    ballY = canvas.height/4;
    ballSpeedX = 2.8;
    ballSpeedY = 2.8;

    paddleX = canvas.width/2 - paddleWidth/2;
}

function movePaddle(){
    if(keys.left) paddleX -= 10;
    if(keys.right) paddleX += 10;
    if (paddleX < 0) paddleX = 0;
    if(paddleX + paddleWidth > canvas.width)
        paddleX = canvas.width - paddleWidth;
} 

function drawPaddle() { 
    ctx.fillStyle = "black";
    ctx.fillRect(paddleX, canvas.height - paddleHeight - 5,
                    paddleWidth, paddleHeight);
}

function drawBall(){
    ctx.fillStyle = "black";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
}

function moveBall(){
    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function checkHits(){
    if(ballX <= 0 || ballX + ballSize >= canvas.width){
        ballSpeedX = -ballSpeedX;
    }
    if(ballY <= 0){
        ballSpeedY = -ballSpeedY;
    }

    const paddleY = canvas.height - paddleHeight - 5;

    if(
        ballY + ballSize >= paddleY && ballX + ballSize >= paddleX 
                            && ballX <= paddleX + paddleWidth
    ) {
        ballSpeedY = -ballSpeedY;
    }

    if(ballY + ballSize > canvas.height){
        gameRunning = false;
        alert("Nah ur a fricking bum");
        resetGame();
    }
}

function updateGame() {
    if(!gameRunning) return;

    ctx.clearRect(0,0,canvas.width, canvas.height);

    movePaddle();
    moveBall();
    checkHits();
    drawPaddle();
    drawBall();

    requestAnimationFrame(updateGame);
}
