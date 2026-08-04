// ==========================================
// LOGIN - LOJA PROMO BABY
// ==========================================

const formLogin = document.getElementById("formLogin");

if (formLogin) {

    formLogin.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();

        // Usuário salvo no navegador
        const usuario = JSON.parse(localStorage.getItem("usuario"));

        if (!usuario) {
            alert("Nenhum usuário cadastrado.");
            return;
        }

        if (usuario.email === email && usuario.senha === senha) {

            localStorage.setItem("logado", "true");

            alert(`Bem-vindo, ${usuario.nome}!`);

            window.location.href = "index.html";

        } else {

            alert("Email ou senha inválidos.");

        }

    });

}