import { NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, LayoutGrid, Settings } from "lucide-react";
import { motion } from "framer-motion";

const tabs = [
  { to: "/", icon: ShoppingCart, label: "Caisse", end: true },
  { to: "/management", icon: LayoutGrid, label: "Gestion" },
  { to: "/settings", icon: Settings, label: "Paramètres" },
];

const BottomTabBar = () => {
  const location = useLocation();

  const isActive = (to: string, end?: boolean) => {
    if (end) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-lg">
      <div className="flex items-stretch justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const active = isActive(tab.to, tab.end);
          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              end={tab.end}
              className="relative flex-1 flex flex-col items-center gap-0.5 py-2.5 px-2 transition-colors"
            >
              {active && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute -top-px left-3 right-3 h-[3px] rounded-b-full bg-primary"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <tab.icon
                className={`h-5 w-5 transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              />
              <span
                className={`text-[10px] font-semibold tracking-wide transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {tab.label}
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomTabBar;
