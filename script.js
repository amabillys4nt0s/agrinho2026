const player = document.getElementById("player");
const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const lifeEl = document.getElementById("life");
const message = document.getElementById("message");

let playerY = 0;
let velocity = 0;
let gravity = 0.8;
let isJumping = false;

let score = 0;
let life = 3;

let gameRunning = false;

// movimento
document.addEventListener("keydown", (e) => {
    if (!gameRunning) return;

    if (e.code === "Space" && !isJumping) {
        velocity = -15;
        isJumping = true;
    }
});

// loop principal
function gameLoop() {
    if (!gameRunning) return;

    velocity += gravity;
    playerY -= velocity;

    if (playerY <= 0) {
        playerY = 0;
        isJumping = false;
    }

    player.style.bottom = playerY + "px";

    requestAnimationFrame(gameLoop);
}

// criar itens
function spawnItem(type) {
    const el = document.createElement("div");
    el.classList.add(type);
    el.style.left = "800px";

    game.appendChild(el);

    let posX = 800;

    function move() {
        if (!gameRunning) return;

        posX -= 5;
        el.style.left = posX + "px";

        checkCollision(el, type);

        if (posX > -50) {
            requestAnimationFrame(move);
        } else {
            el.remove();
        }
    }

    move();
}

// colisão
function checkCollision(el, type) {
    const playerRect = player.getBoundingClientRect();
    const rect = el.getBoundingClientRect();

    if (
        playerRect.left < rect.right &&
        playerRect.right > rect.left &&
        playerRect.top < rect.bottom &&
        playerRect.bottom > rect.top
    ) {
        el.remove();

        if (type === "item") {
            score += 10;
            scoreEl.innerText = score;
        } else {
            life--;
            lifeEl.innerText = life;

            if (life <= 0) endGame();
        }
    }
}

// spawn automático
function spawnLoop() {
    if (!gameRunning) return;

    const rand = Math.random();

    if (rand > 0.5) {
        spawnItem("item");
    } else {
        spawnItem("enemy");
    }

    setTimeout(spawnLoop, 1500);
}

// fim de jogo
function endGame() {
    gameRunning = false;

    message.classList.remove("hidden");
    message.innerHTML = `
    🌍 Você fez ${score} pontos!<br>
    Precisamos cuidar do meio ambiente para garantir um futuro sustentável!
    `;
}

// iniciar jogo
document.getElementById("startBtn").addEventListener("click", () => {
    gameRunning = true;
    gameLoop();
    spawnLoop();
});
