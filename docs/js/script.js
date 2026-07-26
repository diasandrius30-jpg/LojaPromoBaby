/* ==========================================================
   LOJA PROMO BABY
   Desenvolvedor: Andrius Lopes
   Versão 2.1
========================================================== */

/* ==========================================================
   BANCO DE PRODUTOS
========================================================== */

const produtos = [

    {
        nome: "Smartwatch Ultra 8",
        loja: "Shopee",
        preco: "R$ 579,90",
        categoria: "Eletrônicos"
    },

    {
        nome: "Fone Bluetooth JBL",
        loja: "Amazon",
        preco: "R$ 249,90",
        categoria: "Áudio"
    },

    {
        nome: "Notebook Gamer",
        loja: "Mercado Livre",
        preco: "R$ 3.499,90",
        categoria: "Informática"
    },

    {
        nome: "Celular Samsung Galaxy",
        loja: "TikTok Shop",
        preco: "R$ 1.899,90",
        categoria: "Celulares"
    }

];
/* ==========================================================
   PESQUISA
========================================================== */

const campoPesquisa = document.getElementById("pesquisa");
const botaoBuscar = document.getElementById("btnBuscar");


if(botaoBuscar && campoPesquisa){

    botaoBuscar.addEventListener("click",()=>{

        const texto = campoPesquisa.value.trim();


        if(texto === ""){

            alert("Digite um produto para pesquisar.");

            return;

        }
        
       const resultado = produtos.filter(produto =>
    produto.nome.toLowerCase().includes(texto.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(texto.toLowerCase())
);


if(resultado.length === 0){

    const areaResultado = document.getElementById("resultadoBusca");

    areaResultado.innerHTML = `
    
    <div class="alert alert-warning">
        Nenhum produto encontrado.
    </div>

    `;

}else{

    const areaResultado = document.getElementById("resultadoBusca");

    areaResultado.innerHTML = `
    
    <h3 class="fw-bold mb-3">
        🔎 Resultado da busca
    </h3>

    `;


    resultado.forEach(produto=>{


        areaResultado.innerHTML += `

        <div class="card shadow-sm mb-3 p-3">

            <h4 class="fw-bold">
                ${produto.nome}
            </h4>

            <p class="mb-1">
                🏪 Loja: ${produto.loja}
            </p>

            <p class="mb-1">
                📂 Categoria: ${produto.categoria}
            </p>

            <p class="text-success fw-bold">
                💰 ${produto.preco}
            </p>


            <button class="btn btn-primary rounded-pill">

                Comprar Agora

            </button>

        </div>

        `;

    });

}

    });

}


/* ==========================================================
   FAVORITOS
========================================================== */


const favoritos = document.querySelectorAll(".fa-heart");


favoritos.forEach((icone)=>{


    icone.addEventListener("click",()=>{


        icone.classList.toggle("fa-regular");

        icone.classList.toggle("fa-solid");


        icone.style.color="red";


    });


});



/* ==========================================================
   CARRINHO
========================================================== */


let carrinho = 0;


const badge = document.querySelector(".badge-cart");


const botoesComprar =
document.querySelectorAll(".btn-comprar");



botoesComprar.forEach(botao=>{


    botao.addEventListener("click",()=>{


        carrinho++;


        if(badge){

            badge.textContent=carrinho;

        }


        alert("Produto adicionado ao carrinho!");


    });


});



/* ==========================================================
   FORMULÁRIO
========================================================== */


const formulario =
document.getElementById("formContato");



if(formulario){


    formulario.addEventListener("submit",(e)=>{


        e.preventDefault();


        alert("Mensagem enviada com sucesso!");


        formulario.reset();


    });


}




/* ==========================================================
   VIA CEP
========================================================== */


const cep =
document.getElementById("cep");



if(cep){


    cep.addEventListener("blur",()=>{


        let valorCep =
        cep.value.replace(/\D/g,"");



        if(valorCep.length !== 8){

            alert("Digite um CEP válido.");

            return;

        }



        fetch(`https://viacep.com.br/ws/${valorCep}/json/`)


        .then(resposta=>resposta.json())


        .then(dados=>{


            if(dados.erro){

                alert("CEP não encontrado.");

                return;

            }



            const cidade =
            document.getElementById("cidade");


            const estado =
            document.getElementById("estado");


            const rua =
            document.getElementById("rua");



            if(cidade){

                cidade.value=dados.localidade;

            }


            if(estado){

                estado.value=dados.uf;

            }


            if(rua){

                rua.value=dados.logradouro;

            }



        })


        .catch(()=>{


            alert("Erro ao consultar CEP.");

        });



    });


}
