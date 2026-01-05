import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { GitCompare, ArrowLeftRight, TrendingUp, TrendingDown, Minus, Plus, X } from "lucide-react";

interface ComparisonItem {
  field: string;
  valueA: string | number;
  valueB: string | number;
  change: "added" | "removed" | "modified" | "unchanged";
}

const ComparisonView = () => {
  const [versionA, setVersionA] = useState("2024-Q4");
  const [versionB, setVersionB] = useState("2025-Q1");
  const [isExpanded, setIsExpanded] = useState(false);

  const comparisonData: ComparisonItem[] = [
    { field: "Total Rules", valueA: 78, valueB: 85, change: "modified" },
    { field: "Contradictions", valueA: 12, valueB: 8, change: "modified" },
    { field: "Mapped Diseases", valueA: 145, valueB: 163, change: "modified" },
    { field: "Coverage Gaps", valueA: 23, valueB: 18, change: "modified" },
    { field: "New Outpatient Rules", valueA: "-", valueB: 7, change: "added" },
    { field: "Deprecated Mental Health Rules", valueA: 3, valueB: "-", change: "removed" },
    { field: "Policy Compliance", valueA: "92%", valueB: "96%", change: "modified" },
    { field: "Last Updated", valueA: "Dec 15, 2024", valueB: "Jan 5, 2025", change: "modified" },
  ];

  const getChangeIcon = (change: ComparisonItem["change"]) => {
    switch (change) {
      case "added":
        return <Plus className="h-4 w-4 text-success" />;
      case "removed":
        return <X className="h-4 w-4 text-destructive" />;
      case "modified":
        return <ArrowLeftRight className="h-4 w-4 text-info" />;
      default:
        return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getChangeBadge = (change: ComparisonItem["change"]) => {
    switch (change) {
      case "added":
        return <Badge className="bg-success/20 text-success border-success/30">Added</Badge>;
      case "removed":
        return <Badge className="bg-destructive/20 text-destructive border-destructive/30">Removed</Badge>;
      case "modified":
        return <Badge className="bg-info/20 text-info border-info/30">Modified</Badge>;
      default:
        return <Badge variant="secondary">No Change</Badge>;
    }
  };

  const versions = ["2024-Q1", "2024-Q2", "2024-Q3", "2024-Q4", "2025-Q1"];

  const summary = {
    added: comparisonData.filter(c => c.change === "added").length,
    removed: comparisonData.filter(c => c.change === "removed").length,
    modified: comparisonData.filter(c => c.change === "modified").length,
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg flex items-center gap-2">
            <GitCompare className="h-5 w-5 text-primary" />
            Version Comparison
          </CardTitle>
          
          <div className="flex items-center gap-3">
            <Select value={versionA} onValueChange={setVersionA}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {versions.map(v => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <ArrowLeftRight className="h-4 w-4 text-muted-foreground" />
            
            <Select value={versionB} onValueChange={setVersionB}>
              <SelectTrigger className="w-[120px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {versions.map(v => (
                  <SelectItem key={v} value={v}>{v}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="flex gap-4 mt-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10">
            <TrendingUp className="h-4 w-4 text-success" />
            <span className="text-sm font-medium text-success">{summary.added} Added</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-destructive/10">
            <TrendingDown className="h-4 w-4 text-destructive" />
            <span className="text-sm font-medium text-destructive">{summary.removed} Removed</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-info/10">
            <ArrowLeftRight className="h-4 w-4 text-info" />
            <span className="text-sm font-medium text-info">{summary.modified} Modified</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="space-y-2">
          {(isExpanded ? comparisonData : comparisonData.slice(0, 4)).map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-4 gap-4 p-3 rounded-lg transition-all duration-200 hover:bg-muted/50 ${
                item.change === "added" ? "bg-success/5" :
                item.change === "removed" ? "bg-destructive/5" :
                item.change === "modified" ? "bg-info/5" : ""
              }`}
            >
              <div className="flex items-center gap-2">
                {getChangeIcon(item.change)}
                <span className="text-sm font-medium">{item.field}</span>
              </div>
              <div className="text-sm text-muted-foreground text-center">
                {item.valueA}
              </div>
              <div className="text-sm font-medium text-center">
                {item.valueB}
              </div>
              <div className="flex justify-end">
                {getChangeBadge(item.change)}
              </div>
            </div>
          ))}
        </div>

        {comparisonData.length > 4 && (
          <Button
            variant="ghost"
            className="w-full mt-4"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? "Show Less" : `Show ${comparisonData.length - 4} More Changes`}
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ComparisonView;
