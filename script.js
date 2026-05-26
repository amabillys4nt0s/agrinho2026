let eco = 50;
let prod = 50;
let nivel = 1;

const ecoEl = document.getElementById("eco");
const prodEl = document.getElementById("prod");
const nivelEl = document.getElementById("nivel");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const botoes = document.querySelectorAll(".opcao");
const historico = document.getElementById("historico");

const cenarios = [
  {
    titulo: "Uso de água",
    descricao: "Sua plantação precisa de irrigação.",
    opcoes: [
      { texto: "Usar irrigação inteligente", eco: +15, prod: +10 },
      { texto: "Usar água sem controle", eco: -20, prod: +15 },
      { texto: "Não irrigar", eco: +5, prod: -20 }
    ]
  },
  {
    titulo: "Uso de agrotóxicos",
    descricao: "Pragas estão atacando sua plantação.",
    opcoes: [
      { texto: "Controle biológico", eco: +15, prod: +5 },
      { texto: "Muito agrotóxico", eco: -25, prod: +20 },
      { texto: "Nada", eco: +5, prod: -15 }
    ]
  },
  {
    titulo: "Solo",
    descricao: "Seu solo está desgastado.",
    opcoes: [
      { texto: "Rotação de culturas", eco: +20, prod: +10 },
      { texto: "Ignorar", eco: -15, prod: +5 },
      { texto: "Descansar solo", eco: +10, prod: -10 }
    ]
  }
];

let atual = 0;

function atualizarTela() {
  ecoEl.textContent = eco;
  prodEl.textContent = prod;
  nivelEl.textContent = nivel;

  const c = cenarios[atual];
  titulo.textContent = c.titulo;
  descricao.textContent = c.descricao;

  c.opcoes.forEach((op, i) => {
    botoes[i].textContent = op.texto;
  });
}

function escolher(i) {
  const escolha = cenarios[atual].opcoes[i];

  eco += escolha.eco;
  prod += escolha.prod;

  adicionarHistorico(escolha.texto);

  atual = (atual + 1) % cenarios.length;

  if (eco > 80 && prod > 80) {
    nivel++;
  }

  verificarFim();
  atualizarTela();
}

function adicionarHistorico(texto) {
  const li = document.createElement("li");
  li.textContent = texto;
  historico.appendChild(li);
}

function verificarFim() {
  if (eco <= 0) {
    alert("💀 Você destruiu o meio ambiente!");
    reiniciar();
  }
  if (prod <= 0) {
    alert("💸 Sua fazenda faliu!");
    reiniciar();
  }
}

function reiniciar() {
  eco = 50;
  prod = 50;
  nivel = 1;
  historico.innerHTML = "";
}

atualizarTela();
