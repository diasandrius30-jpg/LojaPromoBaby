/* ==========================================================
   LOJA PROMO BABY
   Desenvolvedor: Andrius Lopes
   Arquivo: js/script.js
   Versão: 3.1
========================================================== */

    // ==========================================================
    // 1. CONTADOR DO CARRINHO
    // ==========================================================

    let totalCarrinho = Number(localStorage.getItem("carrinho")) || 0;

    const badgeCart = document.querySelector(".badge-cart");

    if (badgeCart) {
        badgeCart.textContent = totalCarrinho;
    }

    const botoesComprar = document.querySelectorAll(
        ".btn-comprar, .product-card .btn-primary, .buy-btn"
    );

    botoesComprar.forEach(botao => {

        botao.addEventListener("click", (event) => {

            event.preventDefault();

            totalCarrinho++;

            localStorage.setItem("carrinho", totalCarrinho);

            if (badgeCart) {

                badgeCart.textContent = totalCarrinho;

                badgeCart.style.transform = "scale(1.2)";

                setTimeout(() => {

                    badgeCart.style.transform = "scale(1)";

                }, 200);

            }

            alert("Produto adicionado ao carrinho!");

        });

    });


    // ==========================================================
    // 2. FAVORITOS
    // ==========================================================

    const botoesFavorito = document.querySelectorAll(
        ".wishlist-btn, .btn-favorite"
    );

    botoesFavorito.forEach((botao, indice) => {

        const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

        if (favoritos.includes(indice)) {

            botao.classList.add("ativo");

            const icone = botao.querySelector("i");

            if (icone) {

                icone.classList.remove("fa-regular");

                icone.classList.add("fa-solid");

                icone.classList.add("text-danger");

            }

        }

        botao.addEventListener("click", (event) => {

            event.preventDefault();

            botao.classList.toggle("ativo");

            const icone = botao.querySelector("i");

            if (icone) {

                if (icone.classList.contains("fa-regular")) {

                    icone.classList.remove("fa-regular");

                    icone.classList.add("fa-solid");

                    icone.classList.add("text-danger");

                } else {

                    icone.classList.remove("fa-solid");

                    icone.classList.remove("text-danger");

                    icone.classList.add("fa-regular");

                }

            }

            let listaFavoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

            if (listaFavoritos.includes(indice)) {

                listaFavoritos = listaFavoritos.filter(item => item !== indice);

            } else {

                listaFavoritos.push(indice);

            }

            localStorage.setItem(
                "favoritos",
                JSON.stringify(listaFavoritos)
            );

        });

    });
    // ==========================================================
    // 3. BARRA DE PESQUISA
    // ==========================================================

    const inputPesquisa = document.getElementById("inputBusca");
    const btnBuscar = document.getElementById("btnBuscar");
    const produtos = document.querySelectorAll(".produto");

    function executarBusca() {

        if (!inputPesquisa) return;

        const termo = inputPesquisa.value.toLowerCase().trim();

        let encontrados = 0;

        produtos.forEach(produto => {

            const nome = (produto.dataset.nome || "").toLowerCase();

            const categoria = (produto.dataset.categoria || "").toLowerCase();

            const loja = (produto.dataset.loja || "").toLowerCase();

            if (

                termo === "" ||

                nome.includes(termo) ||

                categoria.includes(termo) ||

                loja.includes(termo)

            ) {

                produto.style.display = "";

                encontrados++;

            }

            else {

                produto.style.display = "none";

            }

        });

        let mensagem = document.getElementById("mensagemBusca");

        if (!mensagem) {

            mensagem = document.createElement("div");

            mensagem.id = "mensagemBusca";

            mensagem.className = "text-center fw-bold mt-4";

            const secao = document.getElementById("resultadoBusca");

            if (secao) {

                secao.appendChild(mensagem);

            }

        }

        if (encontrados === 0 && termo !== "") {

            mensagem.innerHTML = "❌ Nenhum produto encontrado.";

        }

        else {

            mensagem.innerHTML = "";

        }

    }


    if (btnBuscar) {

        btnBuscar.addEventListener("click", function (e) {

            e.preventDefault();

            executarBusca();

        });

    }


    if (inputPesquisa) {

        inputPesquisa.addEventListener("keyup", executarBusca);

        inputPesquisa.addEventListener("keypress", function (e) {

            if (e.key === "Enter") {

                e.preventDefault();

                executarBusca();

            }

        });

    }



    // ==========================================================
    // 4. BOTÕES DA HERO
    // ==========================================================

    const btnPromo = document.getElementById("btnPromo");

    const btnSaibaMais = document.getElementById("btnSaibaMais");

    const secaoPromocoes = document.getElementById("promocoes");

    const secaoContato = document.getElementById("contato");


    if (btnPromo && secaoPromocoes) {

        btnPromo.addEventListener("click", function () {

            secaoPromocoes.scrollIntoView({

                behavior: "smooth"

            });

        });

    }


    if (btnSaibaMais && secaoContato) {

        btnSaibaMais.addEventListener("click", function () {

            secaoContato.scrollIntoView({

                behavior: "smooth"

            });

        });

    }
        // ==========================================================
    // 5. FORMULÁRIO DE CONTATO
    // ==========================================================

    const formContato = document.getElementById("formContato");

    if (formContato && formContato.children.length === 0) {

        formContato.innerHTML = `

            <div class="row g-3 text-start">

                <div class="col-md-6">

                    <label class="form-label fw-bold">
                        Nome Completo
                    </label>

                    <input
                        type="text"
                        id="nome"
                        class="form-control"
                        placeholder="Digite seu nome"
                        required>

                </div>

                <div class="col-md-6">

                    <label class="form-label fw-bold">
                        E-mail
                    </label>

                    <input
                        type="email"
                        id="email"
                        class="form-control"
                        placeholder="Digite seu e-mail"
                        required>

                </div>

                <div class="col-md-4">

                    <label class="form-label fw-bold">
                        CEP
                    </label>

                    <input
                        type="text"
                        id="cep"
                        maxlength="8"
                        class="form-control"
                        placeholder="Somente números">

                </div>

                <div class="col-md-8">

                    <label class="form-label fw-bold">
                        Endereço
                    </label>

                    <input
                        type="text"
                        id="endereco"
                        class="form-control"
                        readonly>

                </div>

                <div class="col-12">

                    <label class="form-label fw-bold">

                        Mensagem

                    </label>

                    <textarea
                        id="mensagem"
                        rows="4"
                        class="form-control"
                        required></textarea>

                </div>

                <div class="col-12 text-center">

                    <button
                        type="submit"
                        class="btn btn-warning text-white rounded-pill px-5">

                        <i class="fa-solid fa-paper-plane me-2"></i>

                        Enviar Mensagem

                    </button>

                </div>

            </div>

            <div id="feedbackContato" class="mt-3"></div>

        `;

    }
    // ==========================================================
    // 6. CONSULTA CEP (VIACEP)
    // ==========================================================

    const inputCep = document.getElementById("cep");

    const inputEndereco = document.getElementById("endereco");

    if (inputCep && inputEndereco) {

        inputCep.addEventListener("blur", async () => {

            const cep = inputCep.value.replace(/\D/g, "");

            if (cep.length !== 8) {

                inputEndereco.value = "";

                return;

            }

            inputEndereco.value = "Buscando endereço...";

            try {

                const resposta = await fetch(

                    `https://viacep.com.br/ws/${cep}/json/`

                );

                const dados = await resposta.json();

                if (dados.erro) {

                    inputEndereco.value = "CEP não encontrado.";

                }

                else {

                    inputEndereco.value =
                        `${dados.logradouro}, ${dados.bairro} - ${dados.localidade}/${dados.uf}`;

                }

            }

            catch {

                inputEndereco.value =

                    "Erro ao consultar o CEP.";

            }

        });

    }



    // ==========================================================
    // 7. ENVIO DO FORMULÁRIO
    // ==========================================================

    if (formContato) {

        formContato.addEventListener("submit", function (e) {

            e.preventDefault();

            const feedback = document.getElementById("feedbackContato");

            const nome = document.getElementById("nome").value;

            feedback.className =

                "alert alert-success mt-3";

            feedback.innerHTML =

                `<strong>Obrigado, ${nome}!</strong>
                Sua mensagem foi enviada com sucesso.`;

            formContato.reset();

            if (inputEndereco) {

                inputEndereco.value = "";

            }

        });

    }
        // ==========================================================
    // 8. LOGIN DO USUÁRIO
    // ==========================================================

    const btnLogin = document.getElementById("btnLogin");

    if (btnLogin) {

        btnLogin.addEventListener("click", function (e) {

            e.preventDefault();

            window.location.href = "login.html";

        });

    }


    // ==========================================================
    // 9. INICIALIZAÇÃO DO CARRINHO
    // ==========================================================

    if (badgeCart) {

        badgeCart.textContent = totalCarrinho;

    }


    // ==========================================================
    // 10. LIMPEZA DA BUSCA AO RECARREGAR
    // ==========================================================

    if (inputPesquisa) {

        inputPesquisa.value = "";

    }

    produtos.forEach(produto => {

        produto.style.display = "";

    });


    // ==========================================================
    // 11. VERIFICAÇÃO DOS BOTÕES
    // ==========================================================

    console.log("====================================");

    console.log("LOJA PROMO BABY");

    console.log("Versão 3.1 carregada.");

    console.log("Carrinho:", totalCarrinho);

    console.log("Produtos encontrados:", produtos.length);

    console.log("====================================");


    // ==========================================================
    // FIM DO DOMContentLoaded
    // ==========================================================
    