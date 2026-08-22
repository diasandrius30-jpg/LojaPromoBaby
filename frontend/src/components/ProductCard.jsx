function ProductCard({ produto }) {
  return (
    <article>
      <img
        src={produto.imagem}
        alt={produto.nome}
      />

      <h3>{produto.nome}</h3>

      <p>{produto.categoria}</p>

      <p>
        De: R$ {produto.precoAntigo.toFixed(2)}
      </p>

      <strong>
        R$ {produto.preco.toFixed(2)}
      </strong>

      <button>
        Comprar
      </button>
    </article>
  );
}

export default ProductCard;