// CONTROLE DE ACESSO: Mude para 'false' para ver o visitante e 'true' para ver logado
const usuarioLogado = true; 

// Captura o elemento do banner do HTML
const bannerContainer = document.getElementById('main-banner');

// Executa a lógica de troca baseada no status do usuário
if (usuarioLogado) {
    // Aplica o design do usuário logado (Usa a classe do CSS com a imagem 2.jpg)
    bannerContainer.className = "banner-logado";
    bannerContainer.innerHTML = `
        <div class="banner-content">
            <h1>Olá, que bom ver você de volta!</h1>
            <p>Preparamos uma seleção exclusiva com os maiores descontos do dia.</p>
            <a href="#promocoes" class="btn-cta">🛒 Ver Minhas Ofertas</a>
        </div>
    `;
} else {
    // Aplica o design de visitante (Usa a classe do CSS com a imagem 1.jpg)
    bannerContainer.className = "banner-visitante";
    bannerContainer.innerHTML = ""; // Fica limpo pois a imagem 1 já possui os textos fixos nela
}
