import { motion } from "framer-motion";
import {
  Globe, Sun, Moon, Monitor, Hand, Printer, ScanBarcode,
  Scale, Wifi, WifiOff, TestTube
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSettings } from "@/hooks/useSettings";
import { useToast } from "@/hooks/use-toast";

const anim = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.3 },
});

const Settings = () => {
  const navigate = useNavigate();
  const { settings, updateSettings, updateHardware } = useSettings();
  const { toast } = useToast();

  const testConnection = (device: string) => {
    toast({ title: `Test de ${device}`, description: "Connexion en cours... (simulation)" });
    setTimeout(() => {
      toast({ title: `${device}`, description: "Connexion réussie ✓" });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="pos-header-gradient px-6 py-4">
        <h1 className="text-lg font-semibold text-primary-foreground">Paramètres</h1>
        <p className="text-xs text-primary-foreground/60">Configuration générale du logiciel</p>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Language */}
        <motion.div {...anim(0)} className="pos-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Globe className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Langue</h3>
              <p className="text-xs text-muted-foreground">Choisir la langue de l'interface</p>
            </div>
          </div>
          <Select value={settings.language} onValueChange={(v) => updateSettings({ language: v as any })}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fr">🇫🇷 Français</SelectItem>
              <SelectItem value="ar">🇩🇿 العربية</SelectItem>
              <SelectItem value="en">🇬🇧 English</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Theme */}
        <motion.div {...anim(1)} className="pos-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              {settings.theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Thème</h3>
              <p className="text-xs text-muted-foreground">Apparence de l'interface</p>
            </div>
          </div>
          <div className="flex gap-3">
            {[
              { value: "light" as const, label: "Clair", icon: Sun },
              { value: "dark" as const, label: "Sombre", icon: Moon },
            ].map((t) => (
              <button
                key={t.value}
                onClick={() => updateSettings({ theme: t.value })}
                className={`flex items-center gap-2 px-5 py-3 rounded-lg border-2 transition-all text-sm font-medium ${
                  settings.theme === t.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                <t.icon className="h-4 w-4" />
                {t.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Layout */}
        <motion.div {...anim(2)} className="pos-card p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Monitor className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Disposition</h3>
              <p className="text-xs text-muted-foreground">Choisir le mode d'affichage adapté à votre écran</p>
            </div>
          </div>
          <div className="flex gap-3">
            {[
              { value: "desktop" as const, label: "Bureau", desc: "Souris et clavier", icon: Monitor },
              { value: "tactile" as const, label: "Tactile", desc: "Écran tactile", icon: Hand },
            ].map((l) => (
              <button
                key={l.value}
                onClick={() => updateSettings({ layout: l.value })}
                className={`flex flex-col items-center gap-2 px-6 py-4 rounded-lg border-2 transition-all text-sm ${
                  settings.layout === l.value
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                <l.icon className="h-6 w-6" />
                <span className="font-medium">{l.label}</span>
                <span className="text-[10px] text-muted-foreground">{l.desc}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Hardware Connections */}
        <motion.div {...anim(3)} className="pos-card p-5">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Wifi className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground">Connexions matérielles</h3>
              <p className="text-xs text-muted-foreground">Configurer les périphériques connectés</p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Printer */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Printer className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Imprimante ticket</p>
                    <p className="text-xs text-muted-foreground">Impression des reçus</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {settings.hardware.printer.enabled ? (
                    <span className="text-xs text-success flex items-center gap-1"><Wifi className="h-3 w-3" /> Activée</span>
                  ) : (
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><WifiOff className="h-3 w-3" /> Désactivée</span>
                  )}
                  <Switch
                    checked={settings.hardware.printer.enabled}
                    onCheckedChange={(c) => updateHardware("printer", { enabled: c })}
                  />
                </div>
              </div>
              {settings.hardware.printer.enabled && (
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                  <div>
                    <Label className="text-xs">Type</Label>
                    <Select value={settings.hardware.printer.type} onValueChange={(v) => updateHardware("printer", { type: v })}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="thermal">Thermique</SelectItem>
                        <SelectItem value="dot">Matricielle</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Port / IP</Label>
                    <Input className="h-8 text-xs" placeholder="COM3 ou 192.168.1.100" value={settings.hardware.printer.port} onChange={(e) => updateHardware("printer", { port: e.target.value })} />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => testConnection("Imprimante")}>
                      <TestTube className="h-3 w-3 mr-1" /> Tester
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Scanner */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <ScanBarcode className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Scanner code-barres</p>
                    <p className="text-xs text-muted-foreground">Lecture des codes-barres</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {settings.hardware.scanner.enabled ? (
                    <span className="text-xs text-success flex items-center gap-1"><Wifi className="h-3 w-3" /> Activé</span>
                  ) : (
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><WifiOff className="h-3 w-3" /> Désactivé</span>
                  )}
                  <Switch
                    checked={settings.hardware.scanner.enabled}
                    onCheckedChange={(c) => updateHardware("scanner", { enabled: c })}
                  />
                </div>
              </div>
              {settings.hardware.scanner.enabled && (
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-border">
                  <div>
                    <Label className="text-xs">Type</Label>
                    <Select value={settings.hardware.scanner.type} onValueChange={(v) => updateHardware("scanner", { type: v })}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usb">USB (HID)</SelectItem>
                        <SelectItem value="serial">Série (COM)</SelectItem>
                        <SelectItem value="bluetooth">Bluetooth</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Port</Label>
                    <Input className="h-8 text-xs" placeholder="Auto-détecté" value={settings.hardware.scanner.port} onChange={(e) => updateHardware("scanner", { port: e.target.value })} />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => testConnection("Scanner")}>
                      <TestTube className="h-3 w-3 mr-1" /> Tester
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Scale */}
            <div className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <Scale className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">Balance électronique</p>
                    <p className="text-xs text-muted-foreground">Pesée et étiquetage</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {settings.hardware.scale.enabled ? (
                    <span className="text-xs text-success flex items-center gap-1"><Wifi className="h-3 w-3" /> Activée</span>
                  ) : (
                    <span className="text-xs text-muted-foreground flex items-center gap-1"><WifiOff className="h-3 w-3" /> Désactivée</span>
                  )}
                  <Switch
                    checked={settings.hardware.scale.enabled}
                    onCheckedChange={(c) => updateHardware("scale", { enabled: c })}
                  />
                </div>
              </div>
              {settings.hardware.scale.enabled && (
                <div className="grid grid-cols-4 gap-3 pt-2 border-t border-border">
                  <div>
                    <Label className="text-xs">Marque</Label>
                    <Input className="h-8 text-xs" placeholder="Ex: CAS, Mettler" value={settings.hardware.scale.brand} onChange={(e) => updateHardware("scale", { brand: e.target.value })} />
                  </div>
                  <div>
                    <Label className="text-xs">Type</Label>
                    <Select value={settings.hardware.scale.type} onValueChange={(v) => updateHardware("scale", { type: v })}>
                      <SelectTrigger className="h-8 text-xs"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="serial">Série (COM)</SelectItem>
                        <SelectItem value="tcp">TCP/IP</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-xs">Port / IP</Label>
                    <Input className="h-8 text-xs" placeholder="COM1 ou 192.168.1.50" value={settings.hardware.scale.port} onChange={(e) => updateHardware("scale", { port: e.target.value })} />
                  </div>
                  <div className="flex items-end">
                    <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => testConnection("Balance")}>
                      <TestTube className="h-3 w-3 mr-1" /> Tester
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
