import { useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, Scale, Home } from "lucide-react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const dockItems = [
  { to: "/", icon: Home, label: "Accueil", color: "text-muted-foreground" },
  { to: "/management/dashboard", icon: LayoutDashboard, label: "Tableau de bord", color: "text-primary" },
  { to: "/management/products", icon: Package, label: "Produits", color: "text-success" },
  { to: "/management/scale", icon: Scale, label: "Balance / PLU", color: "text-info" },
];

function DockIcon({
  item,
  mouseX,
  isActive,
}: {
  item: (typeof dockItems)[0];
  mouseX: ReturnType<typeof useMotionValue<number>>;
  isActive: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const distance = useTransform(mouseX, (val) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect || val === -1) return 150;
    return val - (rect.left + rect.width / 2);
  });

  const scale = useTransform(distance, [-100, -50, 0, 50, 100], [1, 1.2, 1.5, 1.2, 1]);
  const springScale = useSpring(scale, { mass: 0.1, stiffness: 200, damping: 12 });

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <motion.button
          ref={ref}
          onClick={() => navigate(item.to)}
          style={{ scale: springScale }}
          className={`relative flex items-center justify-center w-12 h-12 rounded-xl transition-colors duration-200 cursor-pointer ${
            isActive
              ? "bg-primary/15 shadow-sm"
              : "hover:bg-accent"
          }`}
        >
          <item.icon className={`h-5 w-5 ${isActive ? item.color : "text-muted-foreground"}`} />
          {isActive && (
            <motion.div
              layoutId="dock-indicator"
              className="absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary"
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            />
          )}
        </motion.button>
      </TooltipTrigger>
      <TooltipContent side="top" className="text-xs font-medium">
        {item.label}
      </TooltipContent>
    </Tooltip>
  );
}

const ManagementDock = () => {
  const location = useLocation();
  const mouseX = useMotionValue(-1);

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 20 }}
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50"
    >
      <div
        onMouseMove={(e) => mouseX.set(e.clientX)}
        onMouseLeave={() => mouseX.set(-1)}
        className="flex items-end gap-1.5 px-3 py-2.5 rounded-2xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-lg"
      >
        {dockItems.map((item, i) => (
          <span key={item.to} className="flex items-end">
            {i === 1 && (
              <div className="w-px h-7 bg-border/50 mx-1.5 self-center" />
            )}
            <DockIcon
              item={item}
              mouseX={mouseX}
              isActive={
                item.to === "/"
                  ? false
                  : location.pathname.startsWith(item.to)
              }
            />
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ManagementDock;
