import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  emoji: string;
}

interface CartProps {
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}

const Cart = ({ items, onUpdateQty, onRemove, onCheckout }: CartProps) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
        <ShoppingCart className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Current Order</h2>
        <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
          {items.reduce((s, i) => s + i.quantity, 0)} items
        </span>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2">
        {items.length === 0 && (
          <p className="text-muted-foreground text-sm text-center py-8">No items yet</p>
        )}
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 bg-secondary/50 rounded-lg p-2.5">
            <span className="text-xl">{item.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => onUpdateQty(item.id, -1)}
                className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-border transition-colors"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-bold w-6 text-center">{item.quantity}</span>
              <button
                onClick={() => onUpdateQty(item.id, 1)}
                className="w-6 h-6 rounded bg-muted flex items-center justify-center hover:bg-border transition-colors"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <button onClick={() => onRemove(item.id)} className="text-destructive/70 hover:text-destructive transition-colors">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="border-t border-border px-4 py-3 space-y-2">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tax (8%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold text-foreground pt-1 border-t border-border">
          <span>Total</span>
          <span className="text-primary">${total.toFixed(2)}</span>
        </div>
        <Button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full mt-2"
          size="lg"
        >
          Charge ${total.toFixed(2)}
        </Button>
      </div>
    </div>
  );
};

export default Cart;
