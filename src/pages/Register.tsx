import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Plus, Minus, Search, Trash2, Trash, Lock, Percent, RotateCcw,
  CreditCard, Pause, Hash, Wallet, DoorOpen, PiggyBank, User,
  Gift, X, Power, ChevronLeft, ChevronRight, Clock, CalendarDays
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

const mockCart: CartItem[] = [
  { id: "1", name: "Lait 1L", quantity: 2, price: 100 },
  { id: "2", name: "Pain", quantity: 3, price: 50 },
  { id: "3", name: "Eau 1.5L", quantity: 6, price: 25 },
  { id: "4", name: "Sucre 1kg", quantity: 1, price: 100 },
  { id: "5", name: "Fromage (0.5kg)", quantity: 1, price: 400 },
];

const actionButtons = [
  { label: "AJOUTER", shortcut: "F3", icon: Plus, color: "bg-register-btn-green", textColor: "text-register-btn-green" },
  { label: "DÉDUIRE", shortcut: "F2", icon: Minus, color: "bg-register-btn-salmon", textColor: "text-register-btn-salmon" },
  { label: "RECHERCHE", shortcut: "F4", icon: Search, color: "bg-register-btn-red", textColor: "text-register-btn-red" },
  { label: "ENLEVER", shortcut: "F5", icon: Trash2, color: "bg-register-btn-olive", textColor: "text-register-btn-olive" },
  { label: "ENLEVER TOUS", shortcut: "F6", icon: Trash, color: "bg-register-btn-salmon", textColor: "text-register-btn-salmon" },
  { label: "VERROUILLER", shortcut: "Ctrl+V", icon: Lock, color: "bg-register-btn-gray", textColor: "text-register-btn-gray" },
  { label: "REMISE", shortcut: "Ctrl+A", icon: Percent, color: "bg-register-btn-yellow", textColor: "text-register-btn-yellow" },
  { label: "RETOURE", shortcut: "Ctrl+R", icon: RotateCcw, color: "bg-register-btn-gold", textColor: "text-register-btn-gold" },
  { label: "PAIEMENT", shortcut: "F9", icon: CreditCard, color: "bg-register-btn-pink", textColor: "text-register-btn-pink" },
  { label: "ATTENTE", shortcut: "F1", icon: Pause, color: "bg-register-btn-lightblue", textColor: "text-register-btn-lightblue" },
  { label: "QUANTITÉ", shortcut: "F11", icon: Hash, color: "bg-register-btn-blue", textColor: "text-register-btn-blue" },
  { label: "VERSEMENT", shortcut: "F7", icon: Wallet, color: "bg-register-btn-teal", textColor: "text-register-btn-teal" },
  { label: "TIROIR", shortcut: "Ctrl+T", icon: DoorOpen, color: "bg-register-btn-purple", textColor: "text-register-btn-purple" },
  { label: "TRÉSORERIE", shortcut: "Ctrl+Z", icon: PiggyBank, color: "bg-register-btn-purple", textColor: "text-register-btn-purple" },
  { label: "CLIENT", shortcut: "Ctrl+C", icon: User, color: "bg-register-btn-blue", textColor: "text-register-btn-blue" },
  { label: "OFFERT", shortcut: "Ctrl+Z", icon: Gift, color: "bg-register-btn-teal", textColor: "text-register-btn-teal" },
  { label: "FERMER", shortcut: "Ctrl+Z", icon: X, color: "bg-register-btn-darkred", textColor: "text-register-btn-darkred" },
  { label: "ARRÊTER", shortcut: "", icon: Power, color: "bg-register-btn-dark", textColor: "text-register-btn-dark" },
];

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart] = useState<CartItem[]>(mockCart);
  const [activeClient, setActiveClient] = useState(1);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const total = cart.reduce((s, i) => s + i.quantity * i.price, 0);
  const dateStr = now.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const handleAction = (label: string) => {
    if (label === "ARRÊTER") {
      navigate("/");
      return;
    }
    toast({ title: label, description: "Action en cours de développement..." });
  };

  return (
    <div className="h-[calc(100vh-3.5rem)] flex bg-register-bg overflow-hidden select-none">
      {/* LEFT PANEL - Branding & Shortcuts */}
      <div className="w-[260px] flex flex-col border-r border-register-border bg-card">
        {/* DS Branding */}
        <div className="flex flex-col items-center py-5 border-b border-register-border">
          <motion.div
            className="flex items-center gap-0.5 mb-1"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <motion.span
              initial={{ x: -20, opacity: 0, rotateY: 90 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-black text-primary tracking-tight"
            >
              D
            </motion.span>
            <motion.span
              initial={{ x: 20, opacity: 0, rotateY: -90 }}
              animate={{ x: 0, opacity: 1, rotateY: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-4xl font-black text-accent tracking-tight"
            >
              S
            </motion.span>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="text-[10px] font-bold tracking-[0.35em] uppercase text-primary"
          >
            Software
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            className="text-[8px] tracking-[0.2em] uppercase text-muted-foreground mt-0.5"
          >
            Logiciel de gestion
          </motion.p>
        </div>

        {/* Store name */}
        <div className="px-3 py-2 border-b border-register-border">
          <p className="text-xs font-bold text-foreground uppercase tracking-wide text-center">
            SUPÉRETTE ERRAHMA
          </p>
        </div>

        {/* Raccourci header */}
        <div className="px-3 py-2 border-b border-register-border flex items-center gap-2">
          <ChevronRight className="h-3.5 w-3.5 text-primary" />
          <span className="text-xs font-semibold text-foreground uppercase tracking-wide">Raccourci</span>
        </div>

        {/* Shortcut grid */}
        <div className="flex-1 overflow-auto p-2">
          <div className="grid grid-cols-2 gap-1.5">
            {Array.from({ length: 20 }).map((_, i) => (
              <button
                key={i}
                className="flex items-center gap-2 px-2 py-2.5 rounded border border-register-border bg-card hover:bg-muted transition-colors text-xs text-muted-foreground"
              >
                <ChevronRight className="h-3 w-3 text-primary" />
              </button>
            ))}
          </div>
        </div>

        {/* Back button */}
        <div className="p-2 border-t border-register-border">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 w-full px-3 py-2 rounded text-xs font-medium text-accent hover:bg-muted transition-colors"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
            Retour à l'accueil
          </button>
        </div>
      </div>

      {/* CENTER PANEL - Total, Summary, Items */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Grand Total */}
        <div className="bg-card border-b border-register-border px-6 py-4 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-center"
          >
            <span className="text-6xl font-black text-primary tracking-tight">
              {total.toFixed(2).replace(".", ",")}
            </span>
            <span className="text-3xl font-black text-primary ml-2">DA</span>
          </motion.div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-4 gap-2 px-4 py-2 bg-card border-b border-register-border">
          {[
            { label: "TOTAL HT", value: `${total.toFixed(2)} DA` },
            { label: "TOTAL TVA", value: `${(total * 0).toFixed(2)} DA` },
            { label: "REMISE", value: "0,00 DA" },
            { label: "TOTAL TTC", value: `${total.toFixed(2)} DA` },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <div className="bg-primary text-primary-foreground rounded px-2 py-1 mt-0.5">
                <p className="text-xs font-bold">{s.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Tabs */}
        <div className="flex px-4 py-1.5 gap-1 bg-card border-b border-register-border">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <button
              key={n}
              onClick={() => setActiveClient(n)}
              className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                activeClient === n
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              CLIENT N°{n}
            </button>
          ))}
        </div>

        {/* Items Table */}
        <div className="flex-1 overflow-auto bg-card">
          <table className="w-full text-sm">
            <thead className="sticky top-0">
              <tr className="bg-primary text-primary-foreground">
                <th className="px-4 py-2 text-left text-xs font-semibold">Produit</th>
                <th className="px-4 py-2 text-center text-xs font-semibold">Qté</th>
                <th className="px-4 py-2 text-right text-xs font-semibold">P.U.</th>
                <th className="px-4 py-2 text-right text-xs font-semibold">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-register-border">
              {cart.map((item, i) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="hover:bg-muted/40 transition-colors"
                >
                  <td className="px-4 py-2.5 font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-primary" />
                      {item.name}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 text-center font-semibold text-foreground">{item.quantity}</td>
                  <td className="px-4 py-2.5 text-right text-muted-foreground">{item.price.toFixed(2)} DA</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-foreground">
                    {(item.quantity * item.price).toFixed(2)} DA
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom bar */}
        <div className="px-4 py-2 border-t border-register-border bg-card flex items-center justify-between text-xs text-muted-foreground">
          <span>{cart.length} article(s)</span>
          <span>Quantité totale: {cart.reduce((s, i) => s + i.quantity, 0)}</span>
        </div>
      </div>

      {/* RIGHT PANEL - User Info & Action Buttons */}
      <div className="w-[280px] flex flex-col border-l border-register-border bg-card">
        {/* User / Time */}
        <div className="px-4 py-3 border-b border-register-border text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
              <User className="h-4 w-4 text-accent" />
            </div>
            <span className="text-sm font-bold text-foreground uppercase">ADMIN</span>
          </div>
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              {dateStr}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {timeStr}
            </span>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="flex-1 overflow-auto p-2">
          <div className="grid grid-cols-3 gap-1.5">
            {actionButtons.map((btn) => (
              <button
                key={btn.label}
                onClick={() => handleAction(btn.label)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg border border-register-border bg-card hover:shadow-md transition-all active:scale-95 group"
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${btn.color}/15`}>
                  <btn.icon className={`h-4 w-4 ${btn.textColor}`} />
                </div>
                <span className={`text-[9px] font-bold uppercase leading-tight text-center ${btn.textColor}`}>
                  {btn.label}
                </span>
                {btn.shortcut && (
                  <span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded ${btn.color} text-white`}>
                    {btn.shortcut}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
