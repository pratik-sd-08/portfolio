import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem("pratik-theme") !== "light");
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
    localStorage.setItem("pratik-theme", dark ? "dark" : "light");
  }, [dark]);
  return <button className="theme-toggle" data-cursor aria-label={`Switch to ${dark ? "light" : "dark"} theme`} onClick={() => setDark(v => !v)}>{dark ? <Sun size={16}/> : <Moon size={16}/>}</button>;
}
