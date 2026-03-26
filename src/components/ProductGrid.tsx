import { Product } from "@/data/products";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {products.map((product) => (
        <button
          key={product.id}
          onClick={() => onAddToCart(product)}
          className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-secondary transition-all duration-150 active:scale-95"
        >
          <span className="text-3xl">{product.emoji}</span>
          <span className="text-sm font-medium text-card-foreground">{product.name}</span>
          <span className="text-sm font-bold text-primary">${product.price.toFixed(2)}</span>
        </button>
      ))}
    </div>
  );
};

export default ProductGrid;
