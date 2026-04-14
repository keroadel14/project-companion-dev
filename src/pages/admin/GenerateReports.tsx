import { useState } from "react";
import { Settings, Download, Clock, FileText, Sheet, FileSpreadsheet, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

const recentReports = [
  { name: "Monthly User Growth", range: "Oct 01 - Oct 31, 2023", format: "PDF", generated: "2 hours ago", color: "bg-red-100 text-red-600" },
  { name: "Financial Q3 Recap", range: "Jul 01 - Sep 30, 2023", format: "EXCEL", generated: "Yesterday", color: "bg-green-100 text-green-600" },
  { name: "Property Occupancy Rate", range: "Jan 01 - Dec 31, 2022", format: "CSV", generated: "3 days ago", color: "bg-gray-100 text-gray-600" },
];

const GenerateReports = () => {
  const [reportType, setReportType] = useState("financial");
  const [exportFormat, setExportFormat] = useState("pdf");

  return (
    <div>
      <h1 className="text-2xl font-bold text-foreground">Generate Reports</h1>
      <p className="text-muted-foreground text-sm mt-1 mb-6">Configure and export system data</p>

      <div className="rounded-xl border border-border bg-card p-6 mb-8">
        <h2 className="font-semibold text-foreground flex items-center gap-2 mb-6">
          <Settings className="h-5 w-5 text-muted-foreground" /> Report Configuration
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Report Type</label>
            <Select value={reportType} onValueChange={setReportType}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="financial">Financial Summary</SelectItem>
                <SelectItem value="users">User Growth</SelectItem>
                <SelectItem value="occupancy">Occupancy Rate</SelectItem>
                <SelectItem value="activity">Activity Report</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground mt-1">Select the data category you want to visualize</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Date Range</label>
            <div className="flex items-center gap-2">
              <Input type="date" className="flex-1" />
              <span className="text-muted-foreground">—</span>
              <Input type="date" className="flex-1" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Start and end dates for data aggregation</p>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Export Format</label>
            <div className="flex gap-2">
              {[
                { key: "pdf", label: "PDF", icon: FileText },
                { key: "excel", label: "EXCEL", icon: Sheet },
                { key: "csv", label: "CSV", icon: FileSpreadsheet },
              ].map((f) => (
                <Button
                  key={f.key}
                  variant={exportFormat === f.key ? "default" : "outline"}
                  className="flex-1 flex-col h-16 gap-1"
                  onClick={() => setExportFormat(f.key)}
                >
                  <f.icon className="h-5 w-5" />
                  <span className="text-xs">{f.label}</span>
                </Button>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Choose file type for download</p>
          </div>
        </div>

        <div className="border-t border-border mt-6 pt-6 flex flex-col items-center">
          <Button size="lg" className="gap-2 px-12">
            <Download className="h-5 w-5" /> Generate & Download Report
          </Button>
          <p className="text-xs text-muted-foreground mt-2">Generating large reports may take a few moments</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <h2 className="font-semibold text-foreground flex items-center gap-2">
          <Clock className="h-5 w-5 text-muted-foreground" /> Recent Reports
        </h2>
        <Button variant="link" className="text-primary text-sm">Clear History</Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="p-4 text-left text-xs font-semibold text-primary uppercase">Report Name</th>
              <th className="p-4 text-left text-xs font-semibold text-primary uppercase">Date Range</th>
              <th className="p-4 text-left text-xs font-semibold text-primary uppercase">Format</th>
              <th className="p-4 text-left text-xs font-semibold text-primary uppercase">Generated On</th>
              <th className="p-4 text-right text-xs font-semibold text-primary uppercase">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentReports.map((r, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors">
                <td className="p-4 font-medium text-foreground">{r.name}</td>
                <td className="p-4 text-sm text-muted-foreground">{r.range}</td>
                <td className="p-4">
                  <Badge className={r.color}>{r.format}</Badge>
                </td>
                <td className="p-4 text-sm text-muted-foreground">{r.generated}</td>
                <td className="p-4 text-right">
                  <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl border border-border bg-yellow-50 dark:bg-yellow-900/10 p-5">
          <h3 className="font-semibold text-foreground mb-1">Scheduled Reports</h3>
          <p className="text-sm text-muted-foreground">Want to receive reports automatically? You can schedule weekly digests in System Activity settings.</p>
        </div>
        <div className="rounded-xl border border-border bg-purple-50 dark:bg-purple-900/10 p-5">
          <h3 className="font-semibold text-foreground mb-1">Pro Tip</h3>
          <p className="text-sm text-muted-foreground">Exporting as CSV is recommended for importing data into third-party business intelligence tools.</p>
        </div>
      </div>
    </div>
  );
};

export default GenerateReports;
