const btnIniciar   = document.querySelector("#btn-iniciar");
const btnRepetir   = document.querySelector("#btn-repetir");
const btnMaisLongo = document.querySelector("#btn-mais-longo");
const contador     = document.querySelector("#contador");

const btnsJogo = document.querySelectorAll(".btn__game");

var jogoEstaAcontecendo, sequencia, sequenciaJogada, podeApertar, pontos;
jogoEstaAcontecendo = false;
sequencia       = [];
sequenciaJogada = [];
podeApertar     = true;

var tempoFicarAceso, tempoPausaEntre;
tempoFicarAceso = 800; //milesegundos
tempoPausaEntre = 200; //milesegundos

const jogo = {
    comecar: () => {
        if (podeApertar) {
            jogo.reset();
            jogo.addSequencia();
        }
    },

    addSequencia: () => {
        sequencia.push(Math.floor(Math.random() * 4));
        if (sequencia.length > 3) {
            tempoFicarAceso*=0.9;
            tempoPausaEntre*=0.9;
        }
        animacoes.piscarSequencia(tempoFicarAceso, tempoPausaEntre);
    },

    apertar: (btn) => {
        if (sequencia.length != 0 && podeApertar) {
            animacoes.click(btn)
            sequenciaJogada.push(btn);
            if (!jogo.sequenciaEstaCorreta()) {
                jogo.perdeu();
            } else if (sequencia.length == sequenciaJogada.length) {
                podeApertar = false;
                sequenciaJogada = [];
                jogo.atualizarContador();
                animacoes.acertou();
                setTimeout(() => {jogo.addSequencia()}, 1750);
            }
        }
    },

    sequenciaEstaCorreta: () => {
        let idVerificar;
        idVerificar = sequenciaJogada.length - 1;
        return sequencia[idVerificar] === sequenciaJogada[idVerificar];
    },

    perdeu: () => {
        pontos = sequencia.length - 1;
        pontos < 0 ? (pontos = 0) : (pontos = pontos);
        recordes.abrirColocarNome();
        jogo.reset();
    },

    reset: () => {
        jogoEstaAcontecendo = false;
        sequencia = [];
        sequenciaJogada = [];
        podeApertar = true;
        tempoFicarAceso = 800;
        tempoPausaEntre = 200;
        jogo.atualizarContador();
    },

    atualizarContador: () => {
        contador.textContent = sequencia.length;
    },
};
