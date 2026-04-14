import { useState } from "react";
import { Search, Eye, Pencil, Ban, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mockUsers = [
  { id: 1, name: "Ahmed Salem", email: "ahmed.salem@example.com", role: "Admin", status: "Active", lastActivity: "5 minutes ago" },
  { id: 2, name: "Layla Fouad", email: "layla.fouad@example.com", role: "User", status: "Hanging", lastActivity: "An hour ago" },
  { id: 3, name: "Khalid Nasser", email: "khalid.nasser@example.com", role: "User", status: "Forbidden", lastActivity: "1 day ago" },
  { id: 4, name: "Nour Ali", email: "nour.ali@example.com", role: "Admin", status: "Active", lastActivity: "A week ago" },
  { id: 5, name: "Keroles Adel", email: "keroles.adel@example.com", role: "Admin", status: "Active", lastActivity: "3 hours ago" },
];

const statusColors: Record<string, string> = {
  Active: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  Hanging: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
  Forbidden: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const UserManagement = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filtered = mockUsers.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || u.role.toLowerCase() === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">User Management</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for users..."
              className="pl-9 w-64"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-32"><SelectValue placeholder="Role: All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Role: All</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Bulk actions</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Ban selected</DropdownMenuItem>
              <DropdownMenuItem>Delete selected</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 w-10"><input type="checkbox" className="rounded border-border" /></th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">User</th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">Role</th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">The Condition</th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">Latest Activity</th>
              <th className="p-4 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((user) => (
              <tr key={user.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                <td className="p-4"><input type="checkbox" className="rounded border-border" /></td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">{user.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{user.name}</div>
                      <div className="text-xs text-muted-foreground">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-foreground">{user.role}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${statusColors[user.status]}`}>
                    {user.status}
                  </span>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{user.lastActivity}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Ban className="h-4 w-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
