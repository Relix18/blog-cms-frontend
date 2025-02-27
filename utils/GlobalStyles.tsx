import { useGetSiteSettingsQuery } from "@/state/api/site/siteApi";
import { ISiteSettings } from "@/types/types";
import { useEffect, useState } from "react";

const GlobalStyles = () => {
  const localSetting = localStorage.getItem("settings");
  const [settings, setSettings] = useState<ISiteSettings | null>(
    localSetting ? JSON.parse(localSetting) : null
  );
  const { data } = useGetSiteSettingsQuery({}, { skip: !!settings });

  useEffect(() => {
    if (!settings && data?.siteSettings) {
      setSettings(data.siteSettings);
      localStorage.setItem("settings", JSON.stringify(data.siteSettings));
    }
  }, [data, settings]);

  function hexToHSL(hex: string) {
    hex = hex.replace(/^#/, "");

    const r = parseInt(hex.slice(0, 2), 16) / 255;
    const g = parseInt(hex.slice(2, 4), 16) / 255;
    const b = parseInt(hex.slice(4, 6), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;

    let hue = 0;
    if (delta !== 0) {
      if (max === r) hue = ((g - b) / delta) % 6;
      else if (max === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue *= 60;
      if (hue < 0) hue += 360;
    }

    const lightness = (max + min) / 2;

    const saturation =
      delta === 0 ? 0 : delta / (1 - Math.abs(2 * lightness - 1));

    return `${Math.round(hue)} ${+(saturation * 100).toFixed(1)}% ${+(
      lightness * 100
    ).toFixed(1)}%`;
  }

  useEffect(() => {
    if (settings) {
      document.documentElement.style.setProperty(
        "--accent-color",
        hexToHSL(settings.accentColor) || "292 84.1% 60.6%"
      );
    }
  }, [settings]);

  return null;
};

export default GlobalStyles;
