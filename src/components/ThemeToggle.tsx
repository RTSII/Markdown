import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/hooks/useTheme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else if (theme === 'dark') {
      setTheme('system');
    } else {
      setTheme('light');
    }
  };

  const getIcon = () => {
    if (theme === 'dark') return <Moon className="h-4 w-4" />;
    if (theme === 'light') return <Sun className="h-4 w-4" />;
    return <div className="h-4 w-4 rounded-full bg-gradient-to-r from-orange-400 to-blue-500" />;
  };

  const getTooltip = () => {
    if (theme === 'dark') return 'Switch to System Theme';
    if (theme === 'light') return 'Switch to Dark Mode';
    return 'Switch to Light Mode';
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleTheme}
      title={getTooltip()}
      className="h-8 w-8 p-0"
    >
      {getIcon()}
    </Button>
  );
}