import { useState } from "react";
import { Search, Ban, Clock, Trash2, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const mockBlocked = [
  { id: 1, name: "Omar Faruq", email: "omar.f@example.com", reason: "Fake listing", date: "Oct 24, 2023", time: "14:32 PM", color: "bg-red-100 text-red-600" },
  { id: 2, name: "Sarah Jenkins", email: "s.jenkins@domain.co", reason: "Harassment", date: "Oct 20, 2023", time: "09:15 AM", color: "bg-red-100 text-red-600" },
  { id: 3, name: "Mike Ross", email: "m.ross@firm.com", reason: "Spamming", date: "Oct 18, 2023", time: "22:45 PM", color: "bg-yellow-100 text-yellow-600" },
  { id: 4, name: "John Doe", email: "j.doe.test@gmail.com", reason: "ToS Violation", date: "Oct 12, 2023", time: "11:02 AM", color: "bg-gray-100 text-gray-600" },
];

const BlockUsers = () => {
  const [search, setSearch] = useState("");
  const [banReason, setBanReason] = useState("");
  const [blockSearch, setBlockSearch] = useState("");
  const [reasonFilter, setReasonFilter] = useState("all");
  const [items, setItems] = useState(mockBlocked);

  const handleUnblock = (id: number) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Block Users</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-6">Manage banned accounts and issue new restrictions.</p>

      {/* Quick Block Tool */}
      <div className="rounded-xl border border-border bg-card p-6 mb-6">
        <h2 className="font-semibold text-foreground flex items-center gap-2 mb-4">
          <Zap className="h-4 w-4 text-yellow-500" /> Quick Block Tool
        </h2>
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Find user by email or ID." className="pl-9" value={blockSearch} onChange={(e) => setBlockSearch(e.target.value)} />
          </div>
          <Select value={banReason} onValueChange={setBanReason}>
            <SelectTrigger className="w-52"><SelectValue placeholder="Select ban reason..." /></SelectTrigger>
            <SelectContent>
              <SelectItem value="fake">Fake listing</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="spam">Spamming</SelectItem>
              <SelectItem value="tos">ToS Violation</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="destructive" className="gap-2 px-6">
            <Ban className="h-4 w-4" /> Restrict Access
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4 p-4 rounded-xl border border-border bg-card">
        <div className="flex items-center gap-3">
          <Select value={reasonFilter} onValueChange={setReasonFilter}>
            <SelectTrigger className="w-36"><SelectValue placeholder="Reason: All" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Reason: All</SelectItem>
              <SelectItem value="fake">Fake listing</SelectItem>
              <SelectItem value="harassment">Harassment</SelectItem>
              <SelectItem value="spam">Spamming</SelectItem>
              <SelectItem value="tos">ToS Violation</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="any">
            <SelectTrigger className="w-32"><SelectValue placeholder="Time: Any" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Time: Any</SelectItem>
              <SelectItem value="week">This week</SelectItem>
              <SelectItem value="month">This month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          Bulk:
          <Button variant="ghost" size="icon" className="h-8 w-8"><Clock className="h-4 w-4" /></Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-4 w-4" /></Button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 w-10"><input type="checkbox" className="rounded border-border" /></th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">User</th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">Reason for Ban</th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">Date of Ban</th>
              <th className="p-4 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((user) => (
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
                <td className="p-4">
                  <Badge className={user.color}>{user.reason}</Badge>
                </td>
                <td className="p-4">
                  <div className="text-sm text-foreground">{user.date}</div>
                  <div className="text-xs text-muted-foreground">{user.time}</div>
                </td>
                <td className="p-4 text-right">
                  <Button variant="outline" size="sm" onClick={() => handleUnblock(user.id)}>Unblock</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-4 border-t border-border">
          <span className="text-sm text-primary">Showing {items.length} of 50 blocked users</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>‹</Button>
            <Button size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">›</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockUsers;
