// ==========================================================
// LOJA PROMO BABY
// Arquivo: links-produtos.js
// Função: links dos títulos para a página individual
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {

    const links = {
        "Almofada de Maternidade": 4,
        "Babá Eletrônica": 3,
        "Kit Bodies Infantil": 8,
        "Bolsa de Maternidade": 6,
        "Copo Antivazamento": 7,
        "fone bluetooth": 2,
        "smartwatch": 1,
        "Mordedor de Silicone": 5
    };

    document.querySelectorAll(".produto .card-title").forEach(titulo => {

        const nome = titulo.textContent.trim();
        const id = links[nome];

        if (!id) return;

        titulo.innerHTML = `
            <a href="produto.html?id=${id}" class="text-decoration-none text-dark">
                ${nome}
            </a>
        `;
    });

});
