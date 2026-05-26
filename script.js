// ELEMENTOS

const playButton = document.getElementById("playButton");

const menu = document.getElementById("menu");

const game = document.getElementById("game");

const hud = document.getElementById("hud");

const player = document.getElementById("player");

const scoreText = document.getElementById("score");

// ESTADO

let gameRunning = false;

let score = 0;

let playerY = 50;

let velocity = 0;

const gravity = 0.8;

let jumping = false;

let objects = [];

// BOTÃO JOGAR

playButton.addEventListener("click", startGame);

// START

function startGame() {

    menu.classList.add("hidden");

    game.classList.remove("hidden");

    hud.classList.remove("hidden");

    gameRunning = true;

    gameLoop();

    spawnLoop();
}

// PULO

document.addEventListener("keydown", function(event) {

    if (
        event.code === "Space" &&
        !jumping &&
        gameRunning
    ) {

        velocity = -15;

        jumping = true;
    }

});

// LOOP PRINCIPAL

function gameLoop() {

    if (!gameRunning) return;

    updatePlayer();

    updateObjects();

    requestAnimationFrame(gameLoop);
}

// PLAYER

function updatePlayer() {

    velocity += gravity;

    playerY -= velocity;

    if (playerY <= 50) {

        playerY = 50;

        velocity = 0;

        jumping = false;
    }

    player.style.bottom = playerY + "px";
}

// CRIAR OBJETOS

function createObject(type) {

    const object = document.createElement("div");

    object.classList.add(type);

    object.style.left = "900px";

    game.appendChild(object);

    objects.push({
        element: object,
        x: 900,
        type: type
    });

}

// SPAWN

function spawnLoop() {

    if (!gameRunning) return;

    const randomType =
        Math.random() > 0.6
        ? "item"
        : "obstacle";

    createObject(randomType);

    const randomTime =
        1200 + Math.random() * 1000;

    setTimeout(
        spawnLoop,
        randomTime
    );

}

// UPDATE OBJETOS

function updateObjects() {

    objects.forEach((object, index) => {

        object.x -= 6;

        object.element.style.left =
            object.x + "px";

        if (checkCollision(object)) {

            if (object.type === "item") {

                score += 10;

                scoreText.innerText = score;

            } else {

                gameOver();

            }

            object.element.remove();

            objects.splice(index, 1);

        }

        if (object.x < -50) {

            object.element.remove();

            objects.splice(index, 1);

        }

    });

}

// COLISÃO

function checkCollision(object) {

    const playerX = 100;

    const objectX = object.x;

    const objectY =
        object.type === "item"
        ? 120
        : 50;

    return (

        playerX < objectX + 40 &&
        playerX + 50 > objectX &&

        playerY < objectY + 40 &&
        playerY + 50 > objectY

    );

}

// GAME OVER

function gameOver() {

    gameRunning = false;

    alert(
        "🌍 Game Over! Pontos: " + score
    );

    location.reload();

}
