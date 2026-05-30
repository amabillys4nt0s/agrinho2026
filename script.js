const mundo = document.getElementById("mundo");
const personagem = document.getElementById("personagem");
const camadaItens = document.getElementById("camadaItens");
const camadaPlataformas = document.getElementById("camadaPlataformas");
const bandeira = document.getElementById("bandeira");
const faseAtual = document.getElementById("faseAtual");
const sementesTexto = document.getElementById("sementes");
const pontosTexto = document.getElementById("pontos");
const tituloFase = document.getElementById("tituloFase");
const descricaoFase = document.getElementById("descricaoFase");
const modalPergunta = document.getElementById("modalPergunta");
const etiquetaPergunta = document.getElementById("etiquetaPergunta");
const textoPergunta = document.getElementById("textoPergunta");
const opcoesPergunta = document.getElementById("opcoesPergunta");
const retornoPergunta = document.getElementById("retornoPergunta");
const botaoContinuar = document.getElementById("botaoContinuar");

const larguraPersonagem = 42;
const alturaPersonagem = 52;
const gravidade = 0.72;
const impulsoPulo = -13.8;
const velocidade = 5.4;

const fases = [
  {
    nome: "Fase 1: Solo Vivo",
    descricao: "A plantação começa pelo solo. Colete sementes e descubra uma prática que protege a terra.",
    pergunta: "Qual atitude ajuda a conservar o solo na agricultura?",
    opcoes: [
      "Fazer rotação de culturas",
      "Retirar toda vegetação das margens",
      "Usar água sem controle"
    ],
    correta: 0,
    explicacao: "A rotação de culturas reduz o desgaste do solo e melhora sua fertilidade.",
    plataformas: [
      { x: 0, y: 332, w: 260 },
      { x: 320, y: 278, w: 150 },
      { x: 540, y: 226, w: 150 },
      { x: 760, y: 290, w: 260 }
    ],
    sementes: [
      { x: 350, y: 230 },
      { x: 590, y: 178 },
      { x: 830, y: 242 }
    ],
    bandeira: { x: 900, y: 194 }
  },
  {
    nome: "Fase 2: Água Inteligente",
    descricao: "A água precisa chegar à lavoura sem desperdício. Pule entre plataformas e responda ao desafio.",
    pergunta: "Por que a irrigação planejada é importante?",
    opcoes: [
      "Porque economiza água e mantém a produção",
      "Porque aumenta o desperdício",
      "Porque elimina a necessidade de cuidar do solo"
    ],
    correta: 0,
    explicacao: "Planejar a irrigação ajuda a produzir mais com menos desperdício de água.",
    plataformas: [
      { x: 0, y: 332, w: 210 },
      { x: 270, y: 292, w: 130 },
      { x: 468, y: 245, w: 130 },
      { x: 670, y: 205, w: 120 },
      { x: 850, y: 298, w: 170 }
    ],
    sementes: [
      { x: 292, y: 244 },
      { x: 502, y: 197 },
      { x: 704, y: 157 },
      { x: 890, y: 250 }
    ],
    bandeira: { x: 930, y: 202 }
  },
  {
    nome: "Fase 3: Futuro Sustentável",
    descricao: "Equilíbrio é combinar tecnologia, preservação e alimento na mesa.",
    pergunta: "O que representa um agro forte e sustentável?",
    opcoes: [
      "Produzir respeitando água, solo, pessoas e biodiversidade",
      "Produzir sem observar impactos ambientais",
      "Parar toda produção de alimentos"
    ],
    correta: 0,
    explicacao: "Sustentabilidade busca equilíbrio entre produção, renda, ambiente e qualidade de vida.",
    plataformas: [
      { x: 0, y: 332, w: 180 },
      { x: 250, y: 285, w: 110 },
      { x: 430, y: 240, w: 125 },
      { x: 630, y: 210, w: 120 },
      { x: 800, y: 254, w: 110 },
      { x: 975, y: 302, w: 150 }
    ],
    sementes: [
      { x: 270, y: 237 },
      { x: 460, y: 192 },
      { x: 660, y: 162 },
      { x: 820, y: 206 },
      { x: 990, y: 254 }
    ],
    bandeira: { x: 1030, y: 206 }
  }
];

let faseIndice = 0;
let pontos = 0;
let sementesColetadas = 0;
let posicao = { x: 30, y: 0 };
let velocidadeY = 0;
let noChao = false;
let travado = false;
let teclas = { esquerda: false, direita: false };
let sementesDaFase = [];
let plataformasDaFase = [];
let escalaX = 1;
let escalaY = 1;

function converterX(valor) {
  return valor * escalaX;
}

function converterY(valor) {
  return valor * escalaY;
}

function desenharFase() {
  const fase = fases[faseIndice];
  const larguraMundo = mundo.clientWidth;
  const alturaMundo = mundo.clientHeight;

  escalaX = larguraMundo / 1120;
  escalaY = alturaMundo / 390;

  tituloFase.textContent = fase.nome;
  descricaoFase.textContent = fase.descricao;
  faseAtual.textContent = faseIndice + 1;
  sementesColetadas = 0;
  sementesTexto.textContent = sementesColetadas;

  camadaItens.innerHTML = "";
  camadaPlataformas.innerHTML = "";

  plataformasDaFase = fase.plataformas.map((plataforma) => ({
    x: converterX(plataforma.x),
    y: converterY(plataforma.y),
    w: converterX(plataforma.w),
    h: 26
  }));

  plataformasDaFase.forEach((plataforma) => {
    const bloco = document.createElement("div");
    bloco.className = "plataforma";
    bloco.style.left = `${plataforma.x}px`;
    bloco.style.top = `${plataforma.y}px`;
    bloco.style.width = `${plataforma.w}px`;
    camadaPlataformas.appendChild(bloco);
  });

  sementesDaFase = fase.sementes.map((semente, indice) => {
    const item = document.createElement("div");
    item.className = "semente";
    item.dataset.indice = indice;
    item.style.left = `${converterX(semente.x)}px`;
    item.style.top = `${converterY(semente.y)}px`;
    camadaItens.appendChild(item);

    return {
      elemento: item,
      coletada: false,
      x: converterX(semente.x),
      y: converterY(semente.y),
      w: 26,
      h: 34
    };
  });

  bandeira.style.left = `${converterX(fase.bandeira.x)}px`;
  bandeira.style.top = `${converterY(fase.bandeira.y)}px`;

  posicao = { x: 30, y: plataformasDaFase[0].y - alturaPersonagem };
  velocidadeY = 0;
  travado = false;

  atualizarPersonagem();
  mundo.focus();
}

function atualizarPersonagem() {
  personagem.style.left = `${posicao.x}px`;
  personagem.style.top = `${posicao.y}px`;
}

function colidiu(a, b) {
  return (
    a.x < b.x + b.w &&
    a.x + a.w > b.x &&
    a.y < b.y + b.h &&
    a.y + a.h > b.y
  );
}

function aplicarMovimento() {
  if (travado) {
    requestAnimationFrame(aplicarMovimento);
    return;
  }

  const larguraMundo = mundo.clientWidth;
  const alturaMundo = mundo.clientHeight;
  const yAnterior = posicao.y;

  if (teclas.esquerda) {
    posicao.x -= velocidade;
  }

  if (teclas.direita) {
    posicao.x += velocidade;
  }

  posicao.x = Math.max(0, Math.min(posicao.x, larguraMundo - larguraPersonagem));

  velocidadeY += gravidade;
  posicao.y += velocidadeY;
  noChao = false;

  plataformasDaFase.forEach((plataforma) => {
    const jogador = {
      x: posicao.x,
      y: posicao.y,
      w: larguraPersonagem,
      h: alturaPersonagem
    };

    const cruzouTopo = yAnterior + alturaPersonagem <= plataforma.y;

    if (colidiu(jogador, plataforma) && velocidadeY >= 0 && cruzouTopo) {
      posicao.y = plataforma.y - alturaPersonagem;
      velocidadeY = 0;
      noChao = true;
    }
  });

  if (posicao.y > alturaMundo) {
    posicao = { x: 30, y: plataformasDaFase[0].y - alturaPersonagem };
    velocidadeY = 0;
  }

  verificarSementes();
  verificarBandeira();
  atualizarPersonagem();

  requestAnimationFrame(aplicarMovimento);
}

function verificarSementes() {
  const jogador = {
    x: posicao.x,
    y: posicao.y,
    w: larguraPersonagem,
    h: alturaPersonagem
  };

  sementesDaFase.forEach((semente) => {
    if (!semente.coletada && colidiu(jogador, semente)) {
      semente.coletada = true;
      semente.elemento.remove();
      sementesColetadas += 1;
      pontos += 10;
      sementesTexto.textContent = sementesColetadas;
      pontosTexto.textContent = pontos;
    }
  });
}

function verificarBandeira() {
  const jogador = {
    x: posicao.x,
    y: posicao.y,
    w: larguraPersonagem,
    h: alturaPersonagem
  };

  const alvo = {
    x: bandeira.offsetLeft,
    y: bandeira.offsetTop,
    w: 52,
    h: 96
  };

  if (colidiu(jogador, alvo)) {
    travado = true;
    abrirPergunta();
  }
}

function abrirPergunta() {
  const fase = fases[faseIndice];

  etiquetaPergunta.textContent = `Desafio da ${faseIndice + 1}ª fase`;
  textoPergunta.textContent = fase.pergunta;
  retornoPergunta.textContent = "";
  botaoContinuar.classList.add("oculto");
  opcoesPergunta.innerHTML = "";

  fase.opcoes.forEach((opcao, indice) => {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = opcao;
    botao.addEventListener("click", () => responder(indice));
    opcoesPergunta.appendChild(botao);
  });

  modalPergunta.showModal();
}

function responder(indice) {
  const fase = fases[faseIndice];
  const acertou = indice === fase.correta;

  retornoPergunta.textContent = acertou
    ? `Correto! ${fase.explicacao}`
    : `Tente de novo. Dica: ${fase.explicacao}`;

  if (acertou) {
    pontos += 30;
    pontosTexto.textContent = pontos;
    botaoContinuar.classList.remove("oculto");

    Array.from(opcoesPergunta.children).forEach((botao) => {
      botao.disabled = true;
    });
  }
}

function proximaFase() {
  modalPergunta.close();

  if (faseIndice < fases.length - 1) {
    faseIndice += 1;
    desenharFase();
    return;
  }

  tituloFase.textContent = "Missão concluída";
  descricaoFase.textContent = "Você mostrou que produção forte combina com cuidado ambiental. Reinicie para jogar novamente.";
  travado = true;
}

function pular() {
  if (noChao && !travado) {
    velocidadeY = impulsoPulo;
    noChao = false;
  }
}

function reiniciarJogo() {
  faseIndice = 0;
  pontos = 0;
  pontosTexto.textContent = pontos;
  desenharFase();
}

function ativarBotaoMovimento(botao, direcao) {
  botao.addEventListener("pointerdown", () => {
    teclas[direcao] = true;
    mundo.focus();
  });

  botao.addEventListener("pointerup", () => {
    teclas[direcao] = false;
  });

  botao.addEventListener("pointerleave", () => {
    teclas[direcao] = false;
  });
}

document.addEventListener("keydown", (evento) => {
  if (evento.key === "ArrowLeft" || evento.key.toLowerCase() === "a") {
    teclas.esquerda = true;
  }

  if (evento.key === "ArrowRight" || evento.key.toLowerCase() === "d") {
    teclas.direita = true;
  }

  if (evento.key === "ArrowUp" || evento.key === " ") {
    evento.preventDefault();
    pular();
  }
});

document.addEventListener("keyup", (evento) => {
  if (evento.key === "ArrowLeft" || evento.key.toLowerCase() === "a") {
    teclas.esquerda = false;
  }

  if (evento.key === "ArrowRight" || evento.key.toLowerCase() === "d") {
    teclas.direita = false;
  }
});

document.getElementById("botaoPular").addEventListener("click", pular);
document.getElementById("botaoReiniciar").addEventListener("click", reiniciarJogo);

document.getElementById("botaoTema").addEventListener("click", () => {
  document.body.classList.toggle("noite");
});

document.getElementById("botaoFonte").addEventListener("click", () => {
  document.body.classList.toggle("fonte-grande");
});

botaoContinuar.addEventListener("click", proximaFase);

ativarBotaoMovimento(document.getElementById("botaoEsquerda"), "esquerda");
ativarBotaoMovimento(document.getElementById("botaoDireita"), "direita");

window.addEventListener("resize", desenharFase);

desenharFase();
aplicarMovimento();
