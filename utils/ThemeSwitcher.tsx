"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <div className="flex items-center justify-center">
      {theme === "dark" ? (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setTheme("light")}
        >
          <Sun />
        </Button>
      ) : (
        <Button
          variant={"ghost"}
          size={"icon"}
          onClick={() => setTheme("dark")}
        >
          <Moon />
        </Button>
      )}
    </div>
  );
};
