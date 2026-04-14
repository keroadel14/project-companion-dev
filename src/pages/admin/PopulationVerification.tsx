import { useState } from "react";
import { Search, Check, X, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const mockVerifications = [
  { id: 1, nameAr: "احمد سالم", nameEn: "Ahmed Salem", email: "ahmed.salem@example.com", type: "STUDENT", submitted: "5 minutes ago" },
  { id: 2, nameAr: "ليلى فؤاد", nameEn: "Layla Fouad", email: "layla.fouad@example.com", type: "LANDLORD", submitted: "1 hour ago" },
  { id: 3, nameAr: "خالد ناصر", nameEn: "Khalid Nasser", email: "khalid.nasser@example.com", type: "STUDENT", submitted: "3 hours ago" },
  { id: 4, nameAr: "نور حسن علي", nameEn: "Nour Ali", email: "nour.ali@example.com", type: "LANDLORD", submitted: "Yesterday" },
];

const PopulationVerification = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [typeFilter, setTypeFilter] = useState("all");
  const [items, setItems] = useState(mockVerifications);

  const handleAction = (id: number, action: "approve" | "reject") => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Population Verification</h1>
          <p className="text-muted-foreground text-sm mt-1">Review and verify National IDs for students and landlords.</p>
        </div>
        <Badge variant="outline" className="px-4 py-2 text-sm gap-2">
          <span className="h-2 w-2 rounded-full bg-yellow-400 inline-block" />
          15 Pending Requests
        </Badge>
      </div>

      <div className="flex items-center gap-3 mb-6 p-4 rounded-xl border border-border bg-card">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." className="pl-9" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger className="w-36"><SelectValue placeholder="All User Types" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All User Types</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="landlord">Landlord</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-1"><Filter className="h-3 w-3" /> More Filters</Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">User Details</th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">User Type</th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">National ID Preview</th>
              <th className="p-4 text-left text-xs font-semibold text-muted-foreground uppercase">Date Submitted</th>
              <th className="p-4 text-right text-xs font-semibold text-muted-foreground uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.filter(i => {
              const matchSearch = i.nameEn.toLowerCase().includes(search.toLowerCase()) || i.email.includes(search.toLowerCase());
              const matchType = typeFilter === "all" || i.type.toLowerCase() === typeFilter;
              return matchSearch && matchType;
            }).map((item) => (
              <tr key={item.id} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-primary/10 text-primary text-sm">{item.nameEn.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{item.nameAr} ({item.nameEn})</div>
                      <div className="text-xs text-muted-foreground">{item.email}</div>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Badge className={item.type === "STUDENT" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"}>
                    {item.type}
                  </Badge>
                </td>
                <td className="p-4">
                  <div className="w-24 h-16 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-xs">ID Preview</div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{item.submitted}</td>
                <td className="p-4">
                  <div className="flex items-center justify-end gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white gap-1" onClick={() => handleAction(item.id, "approve")}>
                      <Check className="h-3 w-3" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" className="gap-1" onClick={() => handleAction(item.id, "reject")}>
                      <X className="h-3 w-3" /> Reject
                    </Button>
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

export default PopulationVerification;
