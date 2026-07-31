/* ==========================================================
   LOJA PROMO BABY
   Desenvolvedor: Andrius Lopes
   Arquivo: js/script.js
   Versão: 3.0 (Integração HTML + CSS v3.0 + ViaCEP)
========================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================
    // 1. CONTADOR DO CARRINHO DE COMPRAS
    // ==========================================================
    let totalCarrinho = 0;
    const badgeCart = document.querySelector('.badge-cart');

    // Seleciona tanto os botões com a classe genérica quanto os de estilo Bootstrap do seu CSS
    const botoesComprar = document.querySelectorAll('.btn-comprar, .product-card .btn-primary, .buy-btn');

    botoesComprar.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            totalCarrinho++;
            
            if (badgeCart) {
                badgeCart.textContent = totalCarrinho;
                
                // Animação simples de pulse no badge do carrinho
                badgeCart.style.transform = 'scale(1.2)';
                setTimeout(() => {
                    badgeCart.style.transform = 'scale(1)';
                }, 200);
            }

            // Exibe mensagem de feedback rápido (opcional/pode remover se usar tela própria)
            alert('Produto adicionado ao seu carrinho!');
        });
    });

    // ==========================================================
    // 2. TOGGLE DE FAVORITOS (CORAÇÃO DENTRO DOS CARDS E CABEÇALHO)
    // ==========================================================
    // Suporta tanto .wishlist-btn quanto .btn-favorite
    const botoesFavorito = document.querySelectorAll('.wishlist-btn, .btn-favorite');

    botoesFavorito.forEach(botao => {
        botao.addEventListener('click', (event) => {
            event.preventDefault();
            
            // Ativa/Desativa classe do CSS
            botao.classList.toggle('ativo');

            const icone = botao.querySelector('i');
            if (icone) {
                if (icone.classList.contains('fa-regular')) {
                    icone.classList.remove('fa-regular');
                    icone.classList.add('fa-solid');
                    icone.classList.add('text-danger');
                } else {
                    icone.classList.remove('fa-solid', 'text-danger');
                    icone.classList.add('fa-regular');
                }
            }
        });
    });

    // ==========================================================
    // 3. BARRA DE PESQUISA INTELIGENTE (FILTRO EM TEMPO REAL)
    // ==========================================================
    const inputPesquisa = document.getElementById('pesquisa');
    const btnBuscar = document.getElementById('btnBuscar');
    const produtos = document.querySelectorAll('.produto');

    function executarBusca() {
        if (!inputPesquisa) return;

        const termo = inputPesquisa.value.toLowerCase().trim();

        produtos.forEach(produto => {
            // Busca dados do atributo data-* ou do texto visível do card
            const nome = (produto.dataset.nome || produto.innerText || '').toLowerCase();
            const categoria = (produto.dataset.categoria || '').toLowerCase();
            const loja = (produto.dataset.loja || '').toLowerCase();

            if (nome.includes(termo) || categoria.includes(termo) || loja.includes(termo)) {
                produto.style.display = '';
            } else {
                produto.style.display = 'none';
            }
        });
    }

    if (btnBuscar) {
        btnBuscar.addEventListener('click', (e) => {
            e.preventDefault();
            executarBusca();
        });
    }

    if (inputPesquisa) {
        inputPesquisa.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                executarBusca();
            }
        });
    }

    // ==========================================================
    // 4. SCROLL SUAVE PARA BOTAO DE PROMOÇÕES E SAIBA MAIS
    // ==========================================================
    const btnPromo = document.getElementById('btnPromo');
    const btnSaibaMais = document.getElementById('btnSaibaMais');
    const secaoPromocoes = document.getElementById('promocoes');
    const secaoContato = document.getElementById('contato');

    if (btnPromo && secaoPromocoes) {
        btnPromo.addEventListener('click', () => {
            secaoPromocoes.scrollIntoView({ behavior: 'smooth' });
        });
    }

    if (btnSaibaMais && secaoContato) {
        btnSaibaMais.addEventListener('click', () => {
            secaoContato.scrollIntoView({ behavior: 'smooth' });
        });
    }

    // ==========================================================
    // 5. INJEÇÃO DO FORMULÁRIO DE CONTATO COM API VIACEP
    // ==========================================================
    const formContato = document.getElementById('formContato');

    if (formContato && formContato.children.length === 0) {
        formContato.innerHTML = `
            <div class="row g-3 text-start">
                <div class="col-md-6">
                    <label for="nome" class="form-label fw-bold">Nome Completo</label>
                    <input type="text" class="form-control" id="nome" required placeholder="Digite seu nome">
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label fw-bold">E-mail</label>
                    <input type="email" class="form-control" id="email" required placeholder="seu@email.com">
                </div>
                <div class="col-md-4">
                    <label for="cep" class="form-label fw-bold">CEP</label>
                    <input type="text" class="form-control" id="cep" maxlength="8" placeholder="Digite apenas números">
                </div>
                <div class="col-md-8">
                    <label for="endereco" class="form-label fw-bold">Endereço (ViaCEP)</label>
                    <input type="text" class="form-control" id="endereco" readonly placeholder="Preenchido automaticamente pelo CEP">
                </div>
                <div class="col-12">
                    <label for="mensagem" class="form-label fw-bold">Mensagem</label>
                    <textarea class="form-control" id="mensagem" rows="3" required placeholder="Como podemos te ajudar?"></textarea>
                </div>
                <div class="col-12 text-center mt-4">
                    <button type="submit" class="btn btn-warning btn-orange text-white fw-bold px-5 py-2 rounded-pill">
                        <i class="fa-solid fa-paper-plane me-2"></i>Enviar Mensagem
                    </button>
                </div>
            </div>
            <div id="feedbackContato" class="mt-3"></div>
        `;
    }

    // Requisição Fetch da API ViaCEP
    const inputCep = document.getElementById('cep');
    const inputEndereco = document.getElementById('endereco');

    if (inputCep && inputEndereco) {
        inputCep.addEventListener('blur', async () => {
            const cepLimpo = inputCep.value.replace(/\D/g, ''); // Garante só números

            if (cepLimpo.length === 8) {
                inputEndereco.value = 'Buscando endereço...';
                
                try {
                    const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
                    const data = await response.json();

                    if (data.erro) {
                        inputEndereco.value = 'CEP não encontrado.';
                    } else {
                        inputEndereco.value = `${data.logradouro}, ${data.bairro} - ${data.localidade}/${data.uf}`;
                    }
                } catch (error) {
                    inputEndereco.value = 'Erro ao consultar o CEP.';
                }
            } else if (cepLimpo.length > 0) {
                inputEndereco.value = 'CEP inválido (deve conter 8 dígitos).';
            }
        });
    }

    // Submissão do Formulário de Contato com Agradecimento
    if (formContato) {
        formContato.addEventListener('submit', (e) => {
            e.preventDefault();
            const feedback = document.getElementById('feedbackContato');
            const nomeUser = document.getElementById('nome').value;

            if (feedback) {
                feedback.className = 'alert alert-success mt-3 shadow-sm';
                feedback.innerHTML = `<strong>Obrigado, ${nomeUser}!</strong> Sua mensagem foi enviada com sucesso. Em breve retornaremos o contato.`;
            }

            formContato.reset();
        });
    }

    // ==========================================================
    // 6. GESTÃO DO MODAL DE LOGIN
    // ==========================================================
    const btnLogin = document.getElementById('btnLogin');
    const modalElement = document.getElementById('loginModal');

    if (btnLogin && modalElement) {
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            // Utiliza a API do Bootstrap 5 para abrir o modal
            const modalInstance = new bootstrap.Modal(modalElement);
            modalInstance.show();
        });
    }
});
