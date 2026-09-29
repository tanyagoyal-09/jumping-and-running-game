// Get HTML elements

const player = document.getElementById("player");
const obstacle = document.getElementById("obstacle");

const scoreDisplay = document.getElementById("score");
const finalScore = document.getElementById("finalScore");

const gameOverScreen = document.getElementById("gameOver");


// Game variables

let score = 0;
let gameRunning = true;

let obstaclePosition = 800;

let obstacleSpeed = 6;

let isJumping = false;


// --------------------------------------
// KEYBOARD EVENT
// --------------------------------------

document.addEventListener("keydown", function(event) {

    // Space or Arrow Up

    if (
        (event.code === "Space" || event.code === "ArrowUp")
        && !isJumping
        && gameRunning
    ) {

        jump();
    }

});


// --------------------------------------
// JUMP FUNCTION
// --------------------------------------

function jump() {

    isJumping = true;

    player.classList.remove("running");

    player.classList.add("jump");


    // After jump animation finishes

    setTimeout(function() {

        player.classList.remove("jump");

        player.classList.add("running");

        isJumping = false;

    }, 800);

}


// --------------------------------------
// GAME LOOP
// --------------------------------------

function gameLoop() {

    if (!gameRunning) {
        return;
    }


    // Move obstacle

    obstaclePosition -= obstacleSpeed;


    // If obstacle leaves screen

    if (obstaclePosition < -60) {

        obstaclePosition = 800;

        score++;

        scoreDisplay.textContent = score;


        // Increase difficulty

        if (score % 5 === 0) {

            obstacleSpeed += 1;

        }

    }


    obstacle.style.left = obstaclePosition + "px";


    // Check collision

    checkCollision();


    // Continue game loop

    requestAnimationFrame(gameLoop);
}


// --------------------------------------
// COLLISION DETECTION
// --------------------------------------

function checkCollision() {

    const playerRect = player.getBoundingClientRect();

    const obstacleRect = obstacle.getBoundingClientRect();


    // Collision condition

    if (

        playerRect.left < obstacleRect.right &&
        playerRect.right > obstacleRect.left &&
        playerRect.top < obstacleRect.bottom &&
        playerRect.bottom > obstacleRect.top

    ) {

        endGame();
    }

}


// --------------------------------------
// GAME OVER
// --------------------------------------

function endGame() {

    gameRunning = false;

    finalScore.textContent = score;

    gameOverScreen.style.display = "flex";

    player.classList.remove("running");
}


// --------------------------------------
// RESTART GAME
// --------------------------------------

function restartGame() {

    score = 0;

    scoreDisplay.textContent = "0";


    obstaclePosition = 800;

    obstacleSpeed = 6;


    isJumping = false;

    gameRunning = true;


    obstacle.style.left = obstaclePosition + "px";


    gameOverScreen.style.display = "none";


    player.classList.remove("jump");

    player.classList.add("running");


    // Start game again

    requestAnimationFrame(gameLoop);
}


// --------------------------------------
// START GAME
// --------------------------------------

player.classList.add("running");

gameLoop();