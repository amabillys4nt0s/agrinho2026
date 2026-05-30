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
    opcoes: ["Fazer rotação de culturas", "Retirar toda vegetação das margens", "Usar água sem controle"],
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
    opcoes: ["Porque economiza água e mantém a produção", "Porque aumenta o desperdício", "Porque elimina a necessidade de cuidar do solo"],
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
    opcoes: ["Produzir respeitando água, solo, pessoas e biodiversidade", "Produzir sem observar impactos ambientais", "Parar toda produção de alimentos"],
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
