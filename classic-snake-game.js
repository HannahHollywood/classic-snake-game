const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headX = 10;
let headY = 10;
// make the snake body constant because we don't remove it, we just make it bigger
const snakeParts = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;

// Apple Image
// const img = new Image();
// img.src = ".media/apple.jpeg";

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

// const gulpSound = new Audio("gulp.mp3");

// Game Loop
function drawGame() {
    changeSnakePosition();
    let result = isGameOver();
        if (result) {
            return;
        }

    clearScreen();

    checkAppleCollision();
    drawApple();
    drawSnake();

    drawScore();

    if (score > 2) {
        speed = 11;
    }
    if (score > 10) {
        speed = 15;
    }


    setTimeout(drawGame, 1000 /speed);
}

function isGameOver() {
    let gameOver = false;

    if (yVelocity === 0 && xVelocity === 0) {
        return false;
    }

    // check walls
    if (headX < 0) {
        gameOver = true;
    }
    else if (headX == tileCount) {
        gameOver = true;
    }
    else if (headY < 0) {
        gameOver = true;
    }
    else if (headY == tileCount) {
        gameOver = true;
    }

    // Stopping snake from eating itself
    for (let i=0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    // Game Over Text
    if (gameOver) {
        ctx.fillStyle = "white";
        ctx.font = "50px Verdana";

        // var gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        // gradient.addColorStop("0", "magenta");
        // gradient.addColorStop("0.5", "blue");
        // gradient.addColorStop("1.0", "red");
        // // Fill with gradient
        // ctx.fillStyle = gradient;

        ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height /2);
    }

    return gameOver;
}

function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score " + score, canvas.width - 50, 10);
}

function clearScreen() {
    ctx.fillStyle = '#8246AF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'green';
    for (let i =0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    // Put item at end of the list, next to the head
    snakeParts.push(new SnakePart(headX, headY));
    while (snakeParts.length > tailLength) {
        // remove the furthest item from the snake parts if we have more than our tail length
        snakeParts.shift();
    }

    ctx.fillStyle = '#FF9900';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
}

function changeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function drawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
}

// Collision detection (apple/snake)
function checkAppleCollision() {
    if (appleX == headX && appleY == headY) {
        appleX = Math.floor(Math.random() * tileCount);
        appleY = Math.floor(Math.random() * tileCount);
        // if there is a collision, increase tail length
        tailLength++;
        score++;
        // gulpSound.play();
    }
}

// The KeyBoard Function (to move snake around)
document.body.addEventListener('keydown', keyDown);

function keyDown(event) {
    // Up
    if (event.keyCode == 38) {
        // if I'm moving down and try to move up, it won't work!
        if (yVelocity == 1)
            return;
        // when up arrow is pressed it moves up by 1
        yVelocity = -1;
        xVelocity = 0;
    }
    // Down
    if (event.keyCode == 40) {
        if (yVelocity == -1)
            return;
        yVelocity = 1;
        xVelocity = 0;
    }
    // Left
    if (event.keyCode == 37) {
        if (xVelocity == 1)
            return;
        yVelocity = 0;
        xVelocity = -1;
    }
    // Right
    if (event.keyCode == 39) {
        if (xVelocity == -1)
            return;
        yVelocity = 0;
        xVelocity = 1;
    }
}

drawGame();