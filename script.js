  velocidadeY += gravidade;
  posicao.y += velocidadeY;
  noChao = false;

  plataformasDaFase.forEach((plataforma) => {
    const jogador = { x: posicao.x, y: posicao.y, w: larguraPersonagem, h: alturaPersonagem };
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
  const jogador = { x: posicao.x, y: posicao.y, w: larguraPersonagem, h: alturaPersonagem };

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
  const jogador = { x: posicao.x, y: posicao.y, w: larguraPersonagem, h: alturaPersonagem };
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

  retornoPergunta.textContent = acertou ? `Correto! ${fase.explicacao}` : `Tente de novo. Dica: ${fase.explicacao}`;

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
