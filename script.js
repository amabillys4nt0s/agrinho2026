// ELEMENTOS
let player = document.getElementById("player");
let game = document.getElementById("game");
let scoreEl = document.getElementById("score");

// ESTADO
let y = 40;
let velocity = 0;
let gravity = 0.8;
let jumping = false;

let score = 0;
let running = false;

let objects = [];

// BOTÃO JOGAR (AGORA FUNCIONA)
function startGame() {
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("gameContainer").classList.remove("hidden");

    running = true;
    gameLoop();
    spawnLoop();
}

// PULO
document.addEventListener("keydown", function(e) {
    if (e.code === "Space" && !jumping && running) {
        velocity = -15;
        jumping = true;
    }
});

// LOOP
function gameLoop() {
    if (!running) return;

    updatePlayer();
    updateObjects();

    requestAnimationFrame(gameLoop);
}

// PLAYER
function updatePlayer() {
    velocity += gravity;
    y -= velocity;

    if (y <= 40) {
        y = 40;
        velocity = 0;
        jumping = false;
    }

    player.style.bottom = y + "px";
}

// CRIAR OBJETOS
function createObject(type) {
    let el = document.createElement("div");
    el.classList.add(type);
    el.style.left = "800px";

    game.appendChild(el);

    objects.push({
        el: el,
        x: 800,
        type: type
    });
}

// ATUALIZAR OBJETOS
function updateObjects() {
    objects.forEach((obj, index) => {
        obj.x -= 6;
        obj.el.style.left = obj.x + "px";

        if (checkCollision(obj)) {
            if (obj.type === "item") {
                score += 10;
                scoreEl.innerText = score;
            } else {
                gameOver();
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
function checkCollision(obj) {
    let px = 100;
    let py = y;

    let ox = obj.x;
    let oy = obj.type === "item" ? 120 : 40;

    return (
        px < ox + 40 &&
        px + 50 > ox &&
        py < oy + 40 &&
        py + 50 > oy
    );
}

// SPAWN
function spawnLoop() {
    if (!running) return;

    let type = Math.random() > 0.6 ? "item" : "obstacle";
    createObject(type);

    let delay = 1200 + Math.random() * 800;
    setTimeout(spawnLoop, delay);
}

// GAME OVER
function gameOver() {
    running = false;
    alert("Game Over! Pontos: " + score);
    location.reload();
}
