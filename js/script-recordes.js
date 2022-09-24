const storage = {
    fromStorage: () =>
        JSON.parse(localStorage.getItem("recordes-genius")) || [],
    toStorage: (recordes) =>
        localStorage.setItem("recordes-genius", JSON.stringify(recordes)),
};

var arrRecordes = storage.fromStorage();

const modalRecordes    = document.querySelector("#modal__recordes");
const modalColocarNome = document.querySelector("#modal__colocar_nome");

const listaRecordes = document.querySelector("#lista__recordes");
const inputNome     = document.querySelector("#nome");

const recordes = {
    abrir: () => {
        recordes.atualizarListaRecordes();
        modalRecordes.classList.remove("invisivel");
    },

    fechar: () => {
        modalRecordes.classList.add("invisivel");
    },

    abrirColocarNome: () => {
        modalColocarNome.classList.remove("invisivel");
    },

    fecharColocarNome: () => {
        modalColocarNome.classList.add("invisivel");
    },

    salvarRecorde: () => {
        modalColocarNome.classList.add("invisivel");
        arrRecordes.push({
            nome: inputNome.value,
            pontos: pontos,
        });
        pontos = 0;
        inputNome.value = "";
        recordes.fecharColocarNome();
        storage.toStorage(arrRecordes);
    },

    atualizarListaRecordes: () => {
        listaRecordes.innerHTML = "";
        if (arrRecordes.length > 0) {
            recordes.ordernarRecordes();
            arrRecordes.forEach((recorde) => {
                let li, nome, pontos;
                li = document.createElement("li");
                li.classList.add("recorde");
                listaRecordes.appendChild(li);

                nome = document.createElement("p");
                nome.textContent = recorde.nome;
                li.appendChild(nome);

                pontos = document.createElement("p");
                pontos.textContent = recorde.pontos;
                li.appendChild(pontos);
            });
        } else {
            let li, text;
            li = document.createElement("li");
            listaRecordes.appendChild(li);

            text = document.createElement("p");
            text.textContent = "Não há nenhum recorde disponivel, que tal jogar?";
            li.appendChild(text);
        }
    },

    ordernarRecordes: () => {
        let newArr;
        newArr = [];
        arrRecordes.forEach((recorde) => {
            if (newArr.length === 0) {
                newArr.push(recorde);
            } else {
                let encaixado;
                encaixado = false;
                newArr.forEach((item, i) => {
                    if (item.pontos < recorde.pontos && !encaixado) {
                        newArr.splice(i, 0, recorde);
                        encaixado = true;
                        return false;
                    }
                });
                if (!encaixado) newArr.push(recorde);
            }
        });

        arrRecordes = newArr;
    },
};
