/* ==========================================================
   LOJA PROMO BABY
   Desenvolvedor: Andrius Lopes

   Arquivo:
   script.js

   Versão:
   3.0

   Projeto:
   Comparador Inteligente de Ofertas

========================================================== */


/* ==========================================================
   ELEMENTOS DO DOM
========================================================== */

const campoPesquisa =
document.getElementById("pesquisa");

const cardsProdutos =
document.querySelectorAll(".produto");

const badgeCarrinho =
document.querySelector(".badge-cart");

const formulario =
document.getElementById("formContato");

const btnLogin =
document.getElementById("btnLogin");

const btnCadastrar =
document.getElementById("btnCadastrar");

const btnEntrar =
document.getElementById("entrarSistema");


/* ==========================================================
   ESTADO DA APLICAÇÃO
========================================================== */

let carrinho =
Number(localStorage.getItem("carrinho")) || 0;


/* ==========================================================
   UTILITÁRIOS
========================================================== */

function mostrarMensagem(texto){

    alert(texto);

}


function salvarLocal(chave,valor){

    localStorage.setItem(

        chave,

        JSON.stringify(valor)

    );

}


function lerLocal(chave){

    return JSON.parse(

        localStorage.getItem(chave)

    );

}


/* ==========================================================
   PESQUISA DE PRODUTOS
========================================================== */

function pesquisarProdutos(){

    if(!campoPesquisa) return;

    const texto =
    campoPesquisa.value
    .toLowerCase()
    .trim();

    cardsProdutos.forEach(produto=>{

        const nome =
        produto.dataset.nome.toLowerCase();

        const categoria =
        produto.dataset.categoria.toLowerCase();

        const loja =
        produto.dataset.loja.toLowerCase();

        const encontrado =

            nome.includes(texto) ||

            categoria.includes(texto) ||

            loja.includes(texto);

        produto.style.display =

            encontrado

            ? ""

            : "none";

    });

}


if(campoPesquisa){

    campoPesquisa.addEventListener(

        "input",

        pesquisarProdutos

    );

}


/* ==========================================================
   ATUALIZA BADGE DO CARRINHO
========================================================== */

function atualizarBadgeCarrinho(){

    if(badgeCarrinho){

        badgeCarrinho.textContent =
        carrinho;

    }

}

atualizarBadgeCarrinho();
// =======================================
// FAVORITOS ❤️
// =======================================


// Recupera favoritos salvos
let favoritos = JSON.parse(
    localStorage.getItem("favoritos")
) || [];


// Seleciona todos os botões favoritos
const botoesFavoritos = document.querySelectorAll(".btn-favorito");


// Evento de clique
botoesFavoritos.forEach((botao) => {


    const idProduto = botao.dataset.id;


    // Verifica se já está salvo
    if(favoritos.includes(idProduto)){

        botao.classList.add("ativo");

    }



    botao.addEventListener("click",()=>{


        if(favoritos.includes(idProduto)){


            // Remove dos favoritos
            favoritos = favoritos.filter(
                id => id !== idProduto
            );


            botao.classList.remove("ativo");



        }else{


            // Adiciona favorito
            favoritos.push(idProduto);


            botao.classList.add("ativo");


        }



        // Salva no navegador
        localStorage.setItem(
            "favoritos",
            JSON.stringify(favoritos)
        );



    });



});

// =======================================
// CARRINHO 🛒
// =======================================



// Recupera carrinho salvo
let carrinho = JSON.parse(
    localStorage.getItem("carrinho")
) || [];




// Atualiza contador do carrinho

function atualizarCarrinho(){


    const contador = document.querySelector(
        ".badge-cart"
    );


    if(contador){


        contador.textContent =
        carrinho.length;


    }


}



// Executa ao carregar página

atualizarCarrinho();






// =======================================
// ADICIONAR PRODUTO AO CARRINHO
// =======================================


const botoesComprar =
document.querySelectorAll(".btn-comprar");




botoesComprar.forEach((botao)=>{


    botao.addEventListener("click",()=>{


        const produto =
        botao.closest(".produto");



        const item = {


            id:
            produto.dataset.id,


            nome:
            produto.querySelector(".nome-produto").textContent,


           preco:
produto.querySelector(".preco").textContent,


valor:
Number(
produto.querySelector(".preco")
.dataset.valor
),

            quantidade:1


        };



        carrinho.push(item);



        salvarCarrinho();



        atualizarCarrinho();



        alert(
            "Produto adicionado ao carrinho!"
        );



    });



});





// =======================================
// SALVAR CARRINHO
// =======================================


function salvarCarrinho(){


    localStorage.setItem(

        "carrinho",

        JSON.stringify(carrinho)

    );


}






// =======================================
// REMOVER PRODUTO
// ESTRUTURA PREPARADA
// =======================================


function removerProduto(id){


    carrinho =
    carrinho.filter(
        produto =>
        produto.id !== id
    );


    salvarCarrinho();


    atualizarCarrinho();



}




console.log(
"Loja Promo Baby carregada com sucesso!"
);
// =======================================
// PÁGINA DO CARRINHO
// =======================================


const listaCarrinho =
document.querySelector("#listaCarrinho");



const totalCompra =
document.querySelector("#totalCompra");





function carregarCarrinho(){


if(!listaCarrinho) return;



listaCarrinho.innerHTML = "";



let total = 0;



carrinho.forEach((produto,index)=>{



total +=
produto.valor * produto.quantidade;




listaCarrinho.innerHTML += `


<div class="item-carrinho">


<h3>
${produto.nome}
</h3>


<p>
Preço: ${produto.preco}
</p>



<button onclick="diminuirQuantidade(${index})">
➖
</button>


<span>
${produto.quantidade}
</span>


<button onclick="aumentarQuantidade(${index})">
➕
</button>



<button onclick="removerProdutoCarrinho(${index})">

🗑️ Remover

</button>



</div>



`;



});




totalCompra.textContent =
"R$ " + total.toFixed(2);



}




// aumentar quantidade

function aumentarQuantidade(index){


carrinho[index].quantidade++;


salvarCarrinho();


carregarCarrinho();


}



function diminuirQuantidade(index){



if(carrinho[index].quantidade > 1){


carrinho[index].quantidade--;


}else{


carrinho.splice(index,1);


}



salvarCarrinho();


carregarCarrinho();


}




function removerProdutoCarrinho(index){


carrinho.splice(index,1);


salvarCarrinho();


carregarCarrinho();


}




carregarCarrinho();