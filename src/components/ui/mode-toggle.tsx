"use client";

import * as React from "react";
import { SunIcon } from "@radix-ui/react-icons";
import { Moon } from "lucide-react";

import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      onClick={() => (theme === "dark" ? setTheme("light") : setTheme("dark"))}
      variant="ghost"
      className="text-zinc-50 hover:text-zinc-900 dark:text-zinc-900 dark:hover:text-zinc-200"
    >
      {theme === "dark" ? (
        <SunIcon className="size-5" />
      ) : (
        <Moon className="size-5" />
      )}
    </Button>
  );
}
