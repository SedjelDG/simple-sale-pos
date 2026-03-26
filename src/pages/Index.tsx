import { useState, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { products } from "@/data/products";
import CategoryBar from "@/components/CategoryBar";
import ProductGrid from "@/components/ProductGrid";
import Cart, { CartItem } from "@/components/Cart";
import type { Product } from "@/data/products";

const Index = () => {
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);

  const filtered = useMemo(
    () => (category === "All" ? products : products.filter((p) => p.category === category)),
    [category]
  );

  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity: 1, emoji: product.emoji }];
    });
  }, []);

  const updateQty = useCallback((id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  }, []);

  const removeItem = useCallback((id: string) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const checkout = useCallback(() => {
    const total = cart.reduce((s, i) => s + i.price * i.quantity, 0) * 1.08;
    toast.success(`Payment of $${total.toFixed(2)} processed!`);
    setCart([]);
  }, [cart]);

  return (
    <div className="flex h-screen bg-background">
      {/* Product area */}
      <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Point of Sale</h1>
          <span className="text-xs text-muted-foreground">
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" })}
          </span>
        </div>
        <CategoryBar active={category} onSelect={setCategory} />
        <div className="flex-1 overflow-y-auto">
          <ProductGrid products={filtered} onAddToCart={addToCart} />
        </div>
      </div>

      {/* Cart sidebar */}
      <div className="w-80 lg:w-96 border-l border-border bg-card flex flex-col">
        <Cart items={cart} onUpdateQty={updateQty} onRemove={removeItem} onCheckout={checkout} />
      </div>
    </div>
  );
};

export default Index;
