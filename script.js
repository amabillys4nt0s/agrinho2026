// ELEMENTOS
const player = document.getElementById("player");
const game = document.getElementById("game");

const scoreEl = document.getElementById("score");
const lifeEl = document.getElementById("life");
const faseEl = document.getElementById("fase");

const gameOverScreen = document.getElementById("gameOverScreen");
const finalScore = document.getElementById("finalScore");

// SONS
const jumpSound = new Audio("assets/jump.mp3");
const coinSound = new Audio("assets/coin.mp3");
const hitSound = new Audio("assets/hit.mp3");

// ESTADO
let state = {
    y: 50,
    velocity: 0,
    gravity: 0.8,
    jumping: false,
    running: false,
    score: 0,
    life: 3,
    fase: 1,
    speed: 6
};

let objects = [];

// CONTROLES
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !state.jumping && state.running) {
        state.velocity = -15;
        state.jumping = true;
        jumpSound.play();
    }
});

// LOOP
function gameLoop() {
    if (!state.running) return;

    updatePlayer();
    updateObjects();
    updateFase();
    animatePlayer();

    requestAnimationFrame(gameLoop);
}

// PLAYER
function updatePlayer() {
    state.velocity += state.gravity;
    state.y -= state.velocity;

    if (state.y <= 50) {
        state.y = 50;
        state.velocity = 0;
        state.jumping = false;
    }

    player.style.bottom = state.y + "px";
}

// ANIMAÇÃO
function animatePlayer() {
    player.classList.toggle("running");
}

// OBJETOS
function createObject(type) {
    let el = document.createElement("div");
    el.classList.add(type);

    el.style.left = "900px";
    el.style.bottom = type === "item" ? "120px" : "50px";

    game.appendChild(el);

    objects.push({
        el: el,
        x: 900,
        type: type
    });
}

function updateObjects() {
    objects.forEach((obj, index) => {
        obj.x -= state.speed;
        obj.el.style.left = obj.x + "px";

        if (collision(obj)) {
            if (obj.type === "item") {
                state.score += 10;
                coinSound.play();
                scoreEl.innerText = state.score;
            } else {
                state.life--;
                hitSound.play();
                lifeEl.innerText = state.life;

                if (state.life <= 0) return gameOver();
            }

            obj.el.remove();
            objects.splice(index, 1);
        }

        if (obj.x < -50) {
            obj.el.remove();
            objects.splice(index, 1);
        }
    });
}

// COLISÃO
function collision(obj) {
    let px = 100;
    let py = state.y;

    let ox = obj.x;
    let oy = obj.type === "item" ? 120 : 50;

    return (
        px < ox + 40 &&
        px + 50 > ox &&
        py < oy + 40 &&
        py + 50 > oy
    );
}

// SPAWN
function spawnLoop() {
    if (!state.running) return;

    let type = Math.random() > 0.6 ? "item" : "enemy";
    createObject(type);

    let delay = 1000 + Math.random() * 800;
    setTimeout(spawnLoop, delay);
}

// FASES + DIA/NOITE
function updateFase() {
    if (state.score > 50 && state.fase === 1) {
        state.fase = 2;
        faseEl.innerText = "Cidade";
        game.classList.add("noite");
        state.speed = 8;
    }

    if (state.score > 120 && state.fase === 2) {
        state.fase = 3;
        faseEl.innerText = "Floresta";
        game.classList.remove("noite");
        state.speed = 10;
    }
}

// START
function startGame() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");

    state.running = true;
    gameLoop();
    spawnLoop();
}

// TELAS
function showTutorial() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("tutorial").classList.remove("hidden");
}

function backMenu() {
    document.getElementById("tutorial").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");
}

// GAME OVER
function gameOver() {
    state.running = false;

    document.getElementById("gameContainer").classList.add("hidden");
    gameOverScreen.classList.remove("hidden");

    finalScore.innerText = "Pontuação: " + state.score;
}

// RESTART
function restartGame() {
    location.reload();
}
