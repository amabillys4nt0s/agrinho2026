// PERGUNTAS
const questions = [
    {
        q: "O que é sustentabilidade?",
        options: [
            "Cuidar do meio ambiente",
            "Poluir mais",
            "Gastar recursos sem pensar"
        ],
        correct: 0
    },
    {
        q: "Qual é energia limpa?",
        options: [
            "Carvão",
            "Solar",
            "Petróleo"
        ],
        correct: 1
    },
    {
        q: "O que ajuda o planeta?",
        options: [
            "Desmatamento",
            "Reciclagem",
            "Poluição"
        ],
        correct: 1
    }
];

let current = 0;
let score = 0;

// carregar pergunta
function loadQuestion() {
    let q = questions[current];

    document.getElementById("question").innerText = q.q;

    let buttons = document.querySelectorAll("#answers button");

    buttons.forEach((btn, i) => {
        btn.innerText = q.options[i];
    });
}

// responder
function answer(index) {
    let q = questions[current];

    if (index === q.correct) {
        score++;
        moveCat();
    }

    current++;

    if (current < questions.length) {
        loadQuestion();
    } else {
        endGame();
    }

    document.getElementById("score").innerText = "Acertos: " + score;
}

// mover gatinho
function moveCat() {
    let cat = document.getElementById("cat");

    let position = score * 100; // desce

    cat.style.top = position + "px";
}

// final
function endGame() {
    document.getElementById("question").innerText = "Fim! 🌍";

    if (score === questions.length) {
        document.getElementById("question").innerText =
            "Parabéns! Você salvou o planeta 🌈";
    }
}

// iniciar
loadQuestion();
const questions = [
    {
        question: "Qual atitude ajuda o meio ambiente?",
        options: ["Jogar lixo no rio", "Reciclar", "Poluir"],
        answer: "Reciclar"
    },
    {
        question: "O que é sustentável?",
        options: ["Desmatar", "Preservar natureza", "Poluir"],
        answer: "Preservar natureza"
    }
];

function askQuestion(object, index) {

    const q = questions[Math.floor(Math.random() * questions.length)];

    let userAnswer = prompt(
        q.question + "\n\n" +
        q.options.map((opt, i) => `${i + 1} - ${opt}`).join("\n")
    );

    let chosen = q.options[userAnswer - 1];

    if (chosen === q.answer) {

        alert("✅ Acertou! Você avançou!");

        score += 20;
        scoreText.innerText = score;

    } else {

        alert("❌ Errou! Tente melhorar suas escolhas sustentáveis.");

    }

    object.element.remove();
    objects.splice(index, 1);

    gameRunning = true;
    gameLoop();
    spawnLoop();
}
