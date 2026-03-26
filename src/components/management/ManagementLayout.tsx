import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Scale, Clock, User, ChevronLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const hubTiles = [
  {
    to: "/management/dashboard",
    icon: LayoutDashboard,
    label: "Tableau de bord",
    description: "Vue d'ensemble de votre activité, ventes et alertes",
    color: "from-primary/15 to-primary/5",
    iconColor: "text-primary",
    borderColor: "border-primary/20 hover:border-primary/40",
  },
  {
    to: "/management/products",
    icon: Package,
    label: "Gestion des produits",
    description: "Ajouter, modifier et gérer votre catalogue de produits",
    color: "from-success/15 to-success/5",
    iconColor: "text-success",
    borderColor: "border-success/20 hover:border-success/40",
  },
  {
    to: "/management/scale",
    icon: Scale,
    label: "Balance / PLU",
    description: "Configurer les codes PLU et la connexion balance",
    color: "from-info/15 to-info/5",
    iconColor: "text-info",
    borderColor: "border-info/20 hover:border-info/40",
  },
];

const anim = (i: number) => ({
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: { delay: i * 0.08, duration: 0.4, ease: "easeOut" as const },
});

const ManagementLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHub = location.pathname === "/management";

  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const dateStr = now.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  const currentTile = hubTiles.find(
    (t) => t.to !== "/management" && location.pathname.startsWith(t.to)
  );

  if (isHub) {
    // === TILE HUB VIEW ===
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="pos-header-gradient px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
            >
              <ChevronLeft className="h-4 w-4" />
              Accueil
            </button>
            <div className="w-px h-5 bg-primary-foreground/20" />
            <h1 className="text-lg font-semibold text-primary-foreground">Gestion</h1>
          </div>
          <div className="flex items-center gap-4 text-primary-foreground/80 text-sm">
            <div className="flex items-center gap-1.5">
              <User className="h-3.5 w-3.5" />
              <span className="font-medium text-primary-foreground">ADMIN</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{dateStr}</span>
              <span>{timeStr}</span>
            </div>
          </div>
        </header>

        {/* Tile Grid */}
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full">
            {hubTiles.map((tile, i) => (
              <motion.button
                key={tile.to}
                {...anim(i)}
                onClick={() => navigate(tile.to)}
                className={`group relative flex flex-col items-center gap-4 p-8 rounded-2xl border-2 bg-gradient-to-br ${tile.color} ${tile.borderColor} transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer text-left`}
              >
                <div className={`p-4 rounded-xl bg-card shadow-sm ${tile.iconColor}`}>
                  <tile.icon className="h-8 w-8" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-foreground mb-1">{tile.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{tile.description}</p>
                </div>
                <div className={`flex items-center gap-1 text-xs font-semibold ${tile.iconColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Ouvrir <ArrowRight className="h-3 w-3" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // === SUB-PAGE VIEW ===
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="pos-header-gradient px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/management")}
            className="flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Gestion
          </button>
          {currentTile && (
            <>
              <div className="w-px h-5 bg-primary-foreground/20" />
              <div className="flex items-center gap-2">
                <currentTile.icon className="h-4 w-4 text-primary-foreground/80" />
                <h1 className="text-sm font-semibold text-primary-foreground">{currentTile.label}</h1>
              </div>
            </>
          )}
        </div>
        <div className="flex items-center gap-4 text-primary-foreground/80 text-sm">
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span className="font-medium text-primary-foreground">ADMIN</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{dateStr}</span>
            <span>{timeStr}</span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagementLayout;
