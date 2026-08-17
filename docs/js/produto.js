// ==========================================================
// LOJA PROMO BABY
// Arquivo: produto.js
// Função: carregar produto individual
// ==========================================================

const params = new URLSearchParams(window.location.search);
const idProduto = Number(params.get("id"));

const produtoDetalhes = document.getElementById("produtoDetalhes");

fetch("dados/produtos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error("Não foi possível carregar os produtos.");
        }

        return response.json();
    })
    .then(produtos => {

        const produto = produtos.find(
    item => item.id === idProduto
);

        if (!produto) {
            produtoDetalhes.innerHTML = `
                <div class="alert alert-warning">
                    Produto não encontrado.
                </div>
            `;
            return;
        }

        produtoDetalhes.innerHTML = `
            <div class="row g-4">

                <div class="col-md-6">
                    <img
                        src="${produto.imagem}"
                        alt="${produto.nome}"
                        class="img-fluid rounded"
                    >
                </div>

                <div class="col-md-6">

                    <h1>${produto.nome}</h1>

                    <p>
                        <strong>Categoria:</strong>
                        ${produto.categoria}
                    </p>

                    <p>
                        <strong>Loja:</strong>
                        ${produto.loja}
                    </p>

                    <p>
                        ⭐ ${produto.avaliacao}
                    </p>

                    <p class="text-decoration-line-through text-muted">
                        R$ ${produto.precoAntigo.toFixed(2)}
                    </p>

                    <h2>
                        R$ ${produto.preco.toFixed(2)}
                    </h2>

                    <p>
                        <strong>${produto.desconto}% OFF</strong>
                    </p>

                    <button class="btn btn-primary">
                        Adicionar ao carrinho
                    </button>

                </div>

            </div>
        `;
    })
    .catch(error => {

        console.error("Erro:", error);

        produtoDetalhes.innerHTML = `
            <div class="alert alert-danger">
                Erro ao carregar o produto.
            </div>
        `;
    });