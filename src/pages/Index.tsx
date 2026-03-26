import { useNavigate } from "react-router-dom";
import { Settings, ShoppingCart, Cog } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background gap-6">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center gap-1">
          <motion.span
            initial={{ opacity: 0, x: -30, rotateY: 90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-5xl font-black tracking-tight text-primary"
          >
            D
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: 30, rotateY: -90 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="text-5xl font-black tracking-tight text-primary"
          >
            S
          </motion.span>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="text-xs tracking-[0.3em] uppercase text-muted-foreground font-semibold"
        >
          Software
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-[10px] tracking-widest uppercase text-muted-foreground mt-1"
        >
          Djaouad & Seddik
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.4 }}
        className="flex gap-4"
      >
        <Button size="lg" className="bg-primary text-primary-foreground px-8 py-6 text-lg" onClick={() => navigate("/register")}>
          <ShoppingCart className="h-5 w-5 mr-2" />
          Caisse
        </Button>
        <Button size="lg" variant="outline" className="border-primary text-primary px-8 py-6 text-lg" onClick={() => navigate("/management")}>
          <Settings className="h-5 w-5 mr-2" />
          Gestion
        </Button>
        <Button size="lg" variant="outline" className="border-muted-foreground text-muted-foreground px-8 py-6 text-lg hover:border-primary hover:text-primary" onClick={() => navigate("/settings")}>
          <Cog className="h-5 w-5 mr-2" />
          Paramètres
        </Button>
      </motion.div>
    </div>
  );
};

export default Index;
