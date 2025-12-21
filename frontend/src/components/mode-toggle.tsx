import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ThemeProvider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="cursor-pointer rounded-full border-gray-200 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 transition-all duration-300"
    >
      {theme === "dark" ? (
        <Sun className="h-[1.2rem] w-[1.2rem] text-yellow-500 transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] text-slate-700 dark:text-slate-400 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}