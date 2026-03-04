import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Search, Moon, Sun, User, Globe, Menu, X, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const { isLoggedIn, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("dormlink-lang", lng);
    document.documentElement.dir = lng === "ar" ? "rtl" : "ltr";
  };

  const currentLang = i18n.language === "ar" ? "العربية" : "English";

  const navLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/about", label: t("nav.about") },
    { path: "/contact", label: t("nav.contact") },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">D</span>
          </div>
          <span className="font-bold text-lg tracking-tight hidden sm:inline">DORMLINK</span>
        </Link>

        {/* Search */}
        <div className="hidden md:flex relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder={t("nav.searchPlaceholder")}
            className="w-full rounded-full border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive(link.path)
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-2 border-l pl-4">
          {/* Language */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-1.5 text-sm">
                <Globe className="h-4 w-4" />
                <span className="hidden lg:inline">{currentLang}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("ar")}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Dark mode */}
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Profile */}
          <Link to="/contact">
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </Link>

          {/* Sign Up */}
          <Link to="/sign-in">
            <Button size="sm" className="rounded-full px-5">
              {t("nav.signUp")}
            </Button>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background p-4 space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("nav.searchPlaceholder")}
              className="w-full rounded-full border bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2 text-sm font-medium rounded-md",
                isActive(link.path) ? "text-primary bg-primary/5" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-2 pt-2 border-t">
            <Button variant="ghost" size="sm" onClick={() => changeLanguage(i18n.language === "en" ? "ar" : "en")}>
              <Globe className="h-4 w-4 mr-1" /> {currentLang}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
          <Button className="w-full rounded-full">{t("nav.signUp")}</Button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
