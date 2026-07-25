/* ==========================================================
   LOJA PROMO BABY
   Desenvolvedor: Andrius Lopes
   Versão 2.1
========================================================== */


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


        alert("Pesquisando por: " + texto);


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
