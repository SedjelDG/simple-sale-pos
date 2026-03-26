import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, Scale, ChevronLeft, Clock, User } from "lucide-react";

const navItems = [
  { to: "/management", icon: LayoutDashboard, label: "Tableau de bord", end: true },
  { to: "/management/products", icon: Package, label: "Gestion des produits" },
  { to: "/management/scale", icon: Scale, label: "Balance / PLU" },
];

const ManagementLayout = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
  const timeStr = now.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="w-60 flex flex-col border-r border-border bg-card">
        <div className="pos-header-gradient px-4 py-5 flex items-center gap-3">
          <div className="text-2xl font-black tracking-tight text-primary-foreground">DS</div>
          <div>
            <div className="text-xs font-semibold tracking-widest text-primary-foreground/80 uppercase">Software</div>
            <div className="text-[10px] text-primary-foreground/60 tracking-wider">MANAGEMENT</div>
          </div>
        </div>

        <nav className="flex-1 py-3 px-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-pos-sidebar-active text-pos-sidebar-active-foreground"
                    : "text-pos-sidebar-foreground hover:bg-muted"
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
        </nav>

      </aside>

      {/* Main area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="pos-header-gradient px-6 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-primary-foreground">Gestion</h1>
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

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ManagementLayout;
