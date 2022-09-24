const containerGame = document.querySelector('.container__game');


const animacoes = {
    piscarSequencia: (tempoFicarAceso, tempoPausaEntre) => {
            podeApertar = false;
            sequencia.forEach((btn, i) => {
                setTimeout(() => {
                    btnsJogo[btn].classList.add("brilhar");
                }, tempoPausaEntre * i + tempoFicarAceso * i);
                setTimeout(() => {
                    btnsJogo[btn].classList.remove("brilhar");
                }, tempoPausaEntre * i + tempoFicarAceso * (i + 1));
            });
            setTimeout(() => {
                podeApertar = true;
            }, tempoPausaEntre * (sequencia.length - 1) + tempoFicarAceso * sequencia.length);
    },

    piscarSequenciaLentamente: () => {
        if (podeApertar)
            animacoes.piscarSequencia(1300, 400);
    },

    repetir: () => {
        if (podeApertar) 
            animacoes.piscarSequencia(tempoFicarAceso, tempoPausaEntre);
    },

    click: (btn) => {
        btnsJogo[btn].classList.add('click');
        setTimeout (() => {
            btnsJogo[btn].classList.remove('click');
        }, 300);
    },

    acertou: () => {
        setTimeout(()=> {
            containerGame.classList.add('acertou');
        }, 500);
        setTimeout(()=> {
            containerGame.classList.remove('acertou');
        }, 1200);
    }
};