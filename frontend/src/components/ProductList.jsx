import products from "../data/products";
import ProductCard from "./ProductCard";

function ProductList() {
  return (
    <section>
      <h2>Produtos em destaque</h2>

      <div>
        {products.map((produto) => (
          <ProductCard
            key={produto.id}
            produto={produto}
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;