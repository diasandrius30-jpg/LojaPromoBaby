```javascript
/* ==========================================================
   LOJA PROMO BABY
   Arquivo: js/produtos.js
   Função: Ícones das lojas nos cards existentes
========================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("====================================");
    console.log("PRODUTOS.JS CARREGADO");
    console.log("====================================");


    // ======================================================
    // LOCALIZA OS CARDS QUE JÁ EXISTEM NO INDEX.HTML
    // ======================================================

    const produtos =
        document.querySelectorAll(".produto");


    console.log(
        "CARDS ENCONTRADOS:",
        produtos.length
    );


    if (!produtos.length) {

        console.warn(
            "Nenhum card .produto encontrado."
        );

        return;
    }


    // ======================================================
    // ÍCONES DAS LOJAS
    // ======================================================

    const lojas = {

        "Shopee": {
            imagem: "imagens/icones/shopee.png",
            nome: "Shopee",
            classe: "shopee"
        },

        "Mercado Livre": {
            imagem: "imagens/icones/mercado-livre.png",
            nome: "Mercado Livre",
            classe: "mercado-livre"
        },

        "Amazon": {
            imagem: "imagens/icones/amazon.png",
            nome: "Amazon",
            classe: "amazon"
        },

        "TikTok Shop": {
            imagem: "imagens/icones/tiktok.png",
            nome: "TikTok Shop",
            classe: "tiktok"
        }

    };


    // ======================================================
    // PERCORRE OS CARDS EXISTENTES
    // ======================================================

    produtos.forEach((produto, indice) => {


        const loja =
            produto.dataset.loja;


        console.log(
            "CARD:",
            indice + 1,
            "| LOJA:",
            loja
        );


        const dadosLoja =
            lojas[loja];


        if (!dadosLoja) {

            console.warn(
                "Ícone não encontrado para:",
                loja
            );

            return;
        }


        // ==================================================
        // LOCALIZA O BADGE EXISTENTE DA LOJA
        // ==================================================

        const badge =
            produto.querySelector(
                ".badge.bg-primary"
            );


        if (!badge) {

            console.warn(
                "Badge da loja não encontrado:",
                loja
            );

            return;
        }


        // ==================================================
        // COLOCA O ÍCONE DENTRO DO BADGE EXISTENTE
        // ==================================================

        badge.innerHTML = `

            <img
                src="${dadosLoja.imagem}"
                alt="${dadosLoja.nome}"
                class="icone-loja"
            >

            <span>
                ${dadosLoja.nome}
            </span>

        `;


        // Remove o estilo azul do Bootstrap
        // para podermos usar as cores das lojas.

        badge.classList.remove(
            "bg-primary"
        );


        badge.classList.add(
            "loja",
            dadosLoja.classe
        );


    });


    console.log(
        "ÍCONES DAS LOJAS APLICADOS."
    );

});
```
