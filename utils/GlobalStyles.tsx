import { useGetSiteSettingsQuery } from "@/state/api/site/siteApi";
import { ISiteSettings } from "@/types/types";
import { useEffect } from "react";

const GlobalStyles = () => {
  const { data, isLoading } = useGetSiteSettingsQuery({});

  const settings: ISiteSettings = data?.siteSettings;

  useEffect(() => {
    if (settings && !isLoading) {
      document.documentElement.style.setProperty(
        "--accent-color",
        settings.accentColor || "#3498db"
      );
      document.documentElement.style.setProperty(
        "--background-image",
        settings.heroImageUrl
          ? `url(${settings.heroImageUrl})`
          : `linear-gradient(to right, ${settings.gradientStart}, ${settings.gradientEnd})` ||
              "linear-gradient(to right, #ff7e5f, #feb47b)"
      );
    }
  }, [settings, isLoading]);

  return null;
};

export default GlobalStyles;
