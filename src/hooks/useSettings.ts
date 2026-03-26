import { useState, useEffect, useCallback } from "react";

export interface AppSettings {
  language: "fr" | "ar" | "en";
  theme: "light" | "dark";
  layout: "desktop" | "tactile";
  hardware: {
    printer: { enabled: boolean; port: string; type: string };
    scanner: { enabled: boolean; port: string; type: string };
    scale: { enabled: boolean; port: string; type: string; brand: string };
  };
}


const defaultSettings: AppSettings = {
  language: "fr",
  theme: "light",
  layout: "desktop",
  hardware: {
    printer: { enabled: false, port: "", type: "thermal" },
    scanner: { enabled: false, port: "", type: "usb" },
    scale: { enabled: false, port: "", type: "serial", brand: "" },
  },
};

export const useSettings = () => {
  const [settings, setSettings] = useState<AppSettings>(() => {
    try {
      const stored = localStorage.getItem("ds-settings");
      return stored ? { ...defaultSettings, ...JSON.parse(stored) } : defaultSettings;
    } catch {
      return defaultSettings;
    }
  });

  useEffect(() => {
    localStorage.setItem("ds-settings", JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.theme]);

  const updateSettings = useCallback((patch: Partial<AppSettings>) => {
    setSettings((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateHardware = useCallback(
    (device: keyof AppSettings["hardware"], patch: Record<string, any>) => {
      setSettings((prev) => ({
        ...prev,
        hardware: { ...prev.hardware, [device]: { ...prev.hardware[device], ...patch } },
      }));
    },
    []
  );

  return { settings, updateSettings, updateHardware };
};
