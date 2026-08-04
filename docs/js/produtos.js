document.addEventListener("DOMContentLoaded", async () => {

    const listaProdutos = document.getElementById("listaProdutos");

    try {

        const resposta = await fetch("dados/produtos.json");
        const produtos = await resposta.json();

        produtos.forEach(produto => {

            listaProdutos.innerHTML += `
                <div class="col produto"
                     data-nome="${produto.nome}"
                     data-categoria="${produto.categoria}"
                     data-loja="${produto.loja}">

                    <div class="card product-card h-100 border rounded-3 p-2 position-relative shadow-sm">

                        <span class="badge bg-danger position-absolute top-0 start-0 m-2">
                            -${produto.desconto}%
                        </span>

                        <button class="btn btn-favorite position-absolute top-0 end-0 m-2 p-0 border-0 bg-transparent text-muted">
                            <i class="fa-regular fa-heart"></i>
                        </button>

                        <div class="text-center py-3 bg-light rounded mb-2">
                            <img src="${produto.imagem}"
                                 class="img-fluid"
                                 alt="${produto.nome}">
                        </div>

                        <div class="card-body p-1 d-flex flex-column">

                            <span class="badge bg-primary align-self-start mb-2">
                                ${produto.loja}
                            </span>

                            <h3 class="fs-6 fw-bold">
                                ${produto.nome}
                            </h3>

                            <div class="text-warning mb-2">
                                ⭐⭐⭐⭐⭐
                                <span class="text-muted">(${produto.avaliacao})</span>
                            </div>

                            <p class="text-decoration-line-through text-muted mb-0">
                                R$ ${produto.precoAntigo.toFixed(2)}
                            </p>

                            <p class="text-success fw-bold fs-5">
                                R$ ${produto.preco.toFixed(2)}
                            </p>

                            <button class="btn btn-primary rounded-pill mt-auto btn-comprar">
                                <i class="fa-solid fa-cart-shopping me-1"></i>
                                Comprar Agora
                            </button>

                        </div>

                    </div>

                </div>
            `;

        });

    } catch (erro) {

        console.error("Erro ao carregar produtos:", erro);

    }

});