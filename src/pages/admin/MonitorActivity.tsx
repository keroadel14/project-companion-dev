import { useState } from "react";
import { Search, Download, RefreshCw, Server, Zap, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const metricCards = [
  { label: "SERVER LOAD", value: "42.8%", icon: Server, color: "text-green-500" },
  { label: "ACTIVE SESSIONS", value: "1,204", icon: Zap, color: "text-primary" },
  { label: "ERROR RATE", value: "0.02%", icon: AlertTriangle, color: "text-destructive" },
];

const mockLogs = [
  { id: 1, time: "Just now", timeDetail: "12:45:01 PM", user: "Ahmed Salem", email: "ahmed.salem@example.com", action: "New property listed", detail: "Garden Suite, Building A", ip: "192.168.1.45", status: "SUCCESS", dot: "bg-blue-500" },
  { id: 2, time: "2 mins ago", timeDetail: "12:43:12 PM", user: "Layla Fouad", email: "layla.fouad@example.com", action: "Booking confirmed", detail: "ID: #BK-99021", ip: "185.22.102.12", status: "SUCCESS", dot: "bg-green-500" },
  { id: 3, time: "5 mins ago", timeDetail: "12:40:55 PM", user: "New User", email: "guest_22@isp.com", action: "User sign up", detail: "", ip: "102.14.0.19", status: "SUCCESS", dot: "bg-blue-400" },
  { id: 4, time: "12 mins ago", timeDetail: "12:33:18 PM", user: "Khalid Nasser", email: "khalid.nasser@example.com", action: "Failed login attempt", detail: "Multiple attempts from new IP", ip: "45.190.22.1", status: "FLAGGED", dot: "bg-red-500" },
];

const MonitorActivity = () => {
  const [search, setSearch] = useState("");
  const [eventType, setEventType] = useState("all");

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Monitor System Activity</h1>
          <p className="text-muted-foreground text-sm mt-1">Real-time overview of your platform operations and server health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4" /> Export Log</Button>
          <Button className="gap-2"><RefreshCw className="h-4 w-4" /> Refresh data</Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {metricCards.map((m) => (
          <div key={m.label} className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{m.label}</span>
              <m.icon className={`h-5 w-5 ${m.color}`} />
            </div>
            <div className="text-3xl font-bold text-foreground">{m.value}</div>
            <div className="mt-3 flex gap-1">
              {[...Array(8)].map((_, i) => (
                <div key={i} className={`h-8 w-full rounded-sm ${i === 3 ? "bg-primary" : "bg-primary/20"}`} />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <RefreshCw className="h-4 w-4" /> Real-time Activity Log
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search events..." className="pl-9 w-48" value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <Select value={eventType} onValueChange={setEventType}>
              <SelectTrigger className="w-32"><SelectValue placeholder="All events" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All events</SelectItem>
                <SelectItem value="login">Login</SelectItem>
                <SelectItem value="booking">Booking</SelectItem>
                <SelectItem value="listing">Listing</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left text-xs font-semibold text-primary uppercase">Timestamp</th>
              <th className="p-4 text-left text-xs font-semibold text-primary uppercase">User</th>
              <th className="p-4 text-left text-xs font-semibold text-primary uppercase">Action Taken</th>
              <th className="p-4 text-left text-xs font-semibold text-primary uppercase">IP Address</th>
              <th className="p-4 text-right text-xs font-semibold text-primary uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockLogs.map((log) => (
              <tr key={log.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                <td className="p-4">
                  <div className="font-medium text-foreground text-sm">{log.time}</div>
                  <div className="text-xs text-muted-foreground">{log.timeDetail}</div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">{log.user.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground text-sm">{log.user}</div>
                      <div className="text-xs text-muted-foreground">{log.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${log.dot}`} />
                    <div>
                      <div className="text-sm font-medium text-foreground">{log.action}</div>
                      {log.detail && <div className="text-xs text-muted-foreground">{log.detail}</div>}
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground font-mono">{log.ip}</td>
                <td className="p-4 text-right">
                  <span className={`text-xs font-bold ${log.status === "SUCCESS" ? "text-green-600" : "text-red-600"}`}>
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex items-center justify-between p-4 border-t border-border">
          <span className="text-sm text-primary">Showing 1 to 10 of 1,240 entries</span>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button size="sm" className="bg-primary text-primary-foreground">1</Button>
            <Button variant="outline" size="sm">2</Button>
            <Button variant="outline" size="sm">3</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorActivity;
