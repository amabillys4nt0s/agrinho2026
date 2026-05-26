// Projeto Agrinho: interações simples com DOM, variáveis e eventos.

const botaoTema = document.getElementById("botaoTema");
const pontosElement = document.getElementById("pontos");
const pontosHeroElement = document.getElementById("pontosHero");
const mensagemElement = document.getElementById("mensagem");
const botoesAcao = document.querySelectorAll(".acao");
const reiniciarBotao = document.getElementById("reiniciar");
const aguaInput = document.getElementById("agua");
const valorAgua = document.getElementById("valorAgua");
const nivelAgua = document.getElementById("nivelAgua");
const textoAgua = document.getElementById("textoAgua");
const dicaTexto = document.getElementById("dicaTexto");
const novaDicaBotao = document.getElementById("novaDica");

const dicas = [
  "Faça o manejo da água com planejamento e observe o solo antes de irrigar.",
  "Use cobertura vegetal para manter a umidade e proteger a terra.",
  "Aposte na rotação de culturas para fortalecer o solo ao longo do tempo.",
  "Reaproveite resíduos orgânicos com compostagem e reduza o desperdício.",
  "Escolha equipamentos eficientes para gastar menos energia e produzir melhor."
];

const textosAgua = [
  {
    limite: 25,
    texto: "Uso muito baixo. Ótimo para economizar água, mas talvez a lavoura precise de mais atenção em dias secos."
  },
  {
    limite: 60,
    texto: "Nível equilibrado. A produção segue bem, com uso consciente de recursos."
  },
  {
    limite: 100,
    texto: "Uso muito alto. Vale rever a irrigação para evitar desperdício e impacto ambiental."
  }
];

let pontos = 0;
let indiceDica = 0;

function atualizarPlacar() {
  pontosElement.textContent = pontos;
  pontosHeroElement.textContent = pontos;
}

function atualizarMensagem(mensagem) {
  mensagemElement.textContent = mensagem;
}

function classificarPontos(valor) {
  if (valor >= 40) return "Excelente! Seu agro está forte e sustentável.";
  if (valor >= 20) return "Muito bom! Você já faz escolhas bem conscientes.";
  if (valor > 0) return "Você começou bem. Continue somando boas práticas!";
  return "Comece escolhendo uma ação.";
}

function aplicarAcao(evento) {
  const botao = evento.currentTarget;
  const pontosGanhos = Number(botao.dataset.pontos);
  const mensagem = botao.dataset.mensagem;

  pontos += pontosGanhos;
  atualizarPlacar();
  atualizarMensagem(`${mensagem} ${classificarPontos(pontos)}`);
}

function reiniciarPlacar() {
  pontos = 0;
  atualizarPlacar();
  atualizarMensagem("Placar reiniciado. Escolha uma ação sustentável.");
}

function alternarTema() {
  const modoEscuroAtivo = document.body.classList.toggle("dark");
  botaoTema.textContent = modoEscuroAtivo ? "Modo claro" : "Modo escuro";
  botaoTema.setAttribute("aria-pressed", String(modoEscuroAtivo));
}

function atualizarAgua() {
  const valor = Number(aguaInput.value);
  valorAgua.textContent = `${valor}%`;
  nivelAgua.style.width = `${valor}%`;

  const faixaEncontrada = textosAgua.find((faixa) => valor <= faixa.limite);

  if (faixaEncontrada) {
    textoAgua.textContent = faixaEncontrada.texto;
  }
}

function mostrarProximaDica() {
  indiceDica = (indiceDica + 1) % dicas.length;
  dicaTexto.textContent = dicas[indiceDica];
}

botoesAcao.forEach((botao) => {
  botao.addEventListener("click", aplicarAcao);
});

botaoTema.addEventListener("click", alternarTema);
reiniciarBotao.addEventListener("click", reiniciarPlacar);
aguaInput.addEventListener("input", atualizarAgua);
novaDicaBotao.addEventListener("click", mostrarProximaDica);

atualizarPlacar();
atualizarAgua();
atualizarMensagem("Comece escolhendo uma ação.");