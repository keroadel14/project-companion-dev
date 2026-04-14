import { useState } from "react";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import {
  Users, ShieldCheck, Activity, FileText, Ban, Moon, Sun, Bell,
  Building2, Eye, UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const navItems = [
  { label: "User management", icon: Users, path: "/admin/users" },
  { label: "Population verification", icon: ShieldCheck, path: "/admin/verification" },
  { label: "Monitor system activity", icon: Activity, path: "/admin/activity" },
  { label: "Generate reports", icon: FileText, path: "/admin/reports" },
  { label: "Block users", icon: Ban, path: "/admin/block" },
];

const stats = [
  { label: "TOTAL VIEWS", value: "8,765", icon: Eye, color: "" },
  { label: "TOTAL USERS", value: "2,450", icon: Users, color: "" },
  { label: "ACTIVE PLACES", value: "120", icon: Building2, color: "" },
  { label: "PENDING VERIFICATIONS", value: "15", icon: ShieldCheck, color: "text-primary" },
  { label: "BANNED USERS", value: "50", icon: Ban, color: "text-destructive" },
];

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { isAdmin, isLoggedIn, userEmail } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  if (!isLoggedIn || !isAdmin) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-56 border-r border-border bg-card flex flex-col p-4 gap-2 shrink-0">
        <Link to="/admin/users" className="flex items-center gap-2 px-3 py-4 mb-4">
          <Building2 className="h-7 w-7 text-primary" />
          <span className="font-bold text-lg tracking-tight text-foreground">DORMLINK</span>
        </Link>
        <nav className="flex flex-col gap-1 flex-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="mt-auto pt-4 border-t border-border">
          <div className="flex items-center gap-2 px-3 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-primary/10 text-primary text-xs">
                {userEmail?.charAt(0).toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <div className="font-medium text-foreground">Admin Panel</div>
              <div className="text-muted-foreground">Super Admin</div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="w-full mt-2 justify-start gap-2"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            Toggle Theme
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 flex flex-col">
        {/* Top stats bar */}
        <div className="flex items-center gap-3 p-4 border-b border-border bg-card">
          {stats.map((s) => (
            <div key={s.label} className="flex-1 flex items-center gap-2 px-4 py-3 rounded-lg border border-border bg-background">
              <div>
                <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</div>
                <div className={`text-xl font-bold ${s.color || "text-foreground"}`}>{s.value}</div>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-2 ml-auto">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <Avatar className="h-9 w-9 border-2 border-primary/30">
              <AvatarFallback className="bg-primary/10 text-primary">
                {userEmail?.charAt(0).toUpperCase() || "A"}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
