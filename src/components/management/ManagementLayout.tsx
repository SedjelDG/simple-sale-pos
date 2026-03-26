import { Outlet, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Clock, User, ChevronLeft } from "lucide-react";
import { useState, useEffect } from "react";
import ManagementDock from "./ManagementDock";

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

  if (isHub) {
    return <Navigate to="/management/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="pos-header-gradient px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground transition-colors text-sm"
          >
            <ChevronLeft className="h-4 w-4" />
            Accueil
          </button>
          <div className="w-px h-5 bg-primary-foreground/20" />
          <h1 className="text-sm font-semibold text-primary-foreground">Gestion</h1>
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

      <main className="flex-1 overflow-auto p-6 pb-24">
        <Outlet />
      </main>

      <ManagementDock />
    </div>
  );
};

export default ManagementLayout;
