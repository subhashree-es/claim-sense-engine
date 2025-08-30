import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitCompare, TrendingUp, TrendingDown, Plus, Minus, ArrowRight } from "lucide-react";

const VersionComparisonCard = () => {
  // Mock data for version comparison - in real app this would come from API
  const versionComparison = {
    currentVersion: "v2.1",
    previousVersion: "v2.0", 
    comparisonDate: "2024-01-15",
    changes: {
      tariffChanges: 3,
      newServices: 2,
      removedExclusions: 1,
      facilityUpdates: 2,
      totalRulesChanged: 8
    },
    highlights: [
      { type: "added", item: "Mental Health Counseling", category: "service", impact: "Expanded coverage" },
      { type: "modified", item: "Dialysis Session Limits", category: "tariff", impact: "Increased from 2 to 3 sessions/week" },
      { type: "removed", item: "Age restriction for physiotherapy", category: "exclusion", impact: "Broader access" },
      { type: "modified", item: "ICU facility requirements", category: "facility", impact: "Updated to Level 4+" }
    ]
  };

  const getChangeIcon = (type: string) => {
    switch (type) {
      case "added": return <Plus className="h-4 w-4 text-green-600" />;
      case "removed": return <Minus className="h-4 w-4 text-red-600" />;
      case "modified": return <ArrowRight className="h-4 w-4 text-blue-600" />;
      default: return <ArrowRight className="h-4 w-4" />;
    }
  };

  const getChangeColor = (type: string) => {
    switch (type) {
      case "added": return "text-green-600 bg-green-100 border-green-300";
      case "removed": return "text-red-600 bg-red-100 border-red-300";
      case "modified": return "text-blue-600 bg-blue-100 border-blue-300";
      default: return "text-gray-600 bg-gray-100 border-gray-300";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitCompare className="h-5 w-5" />
            Version Comparison
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline">{versionComparison.previousVersion}</Badge>
            <ArrowRight className="h-4 w-4" />
            <Badge>{versionComparison.currentVersion}</Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Summary Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted rounded-lg">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{versionComparison.changes.tariffChanges}</div>
            <div className="text-xs text-muted-foreground">Tariff Changes</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{versionComparison.changes.newServices}</div>
            <div className="text-xs text-muted-foreground">New Services</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{versionComparison.changes.removedExclusions}</div>
            <div className="text-xs text-muted-foreground">Removed Exclusions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">{versionComparison.changes.facilityUpdates}</div>
            <div className="text-xs text-muted-foreground">Facility Updates</div>
          </div>
        </div>

        {/* Change Highlights */}
        <div className="space-y-3">
          <h4 className="font-medium">Key Changes</h4>
          {versionComparison.highlights.map((change, index) => (
            <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="mt-0.5">
                {getChangeIcon(change.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium">{change.item}</span>
                  <Badge variant="outline" className={getChangeColor(change.type)}>
                    {change.type}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {change.category}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{change.impact}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Assessment */}
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="h-4 w-4 text-blue-600" />
            <span className="font-medium">Impact Assessment</span>
          </div>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• {versionComparison.changes.totalRulesChanged} total rules affected across {versionComparison.highlights.length} categories</p>
            <p>• Estimated implementation time: 2-3 weeks with stakeholder review</p>
            <p>• Claims processing impact: Minimal disruption expected</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm">
            <GitCompare className="h-4 w-4 mr-1" />
            View Full Diff
          </Button>
          <Button variant="outline" size="sm">
            Export Change Log
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default VersionComparisonCard;