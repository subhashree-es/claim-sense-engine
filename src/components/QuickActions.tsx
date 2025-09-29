import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  RefreshCw, 
  Download, 
  Upload, 
  Settings, 
  Share, 
  AlertTriangle,
  CheckCircle2,
  Clock,
  Target
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const { toast } = useToast();

  const quickActions = [
    {
      title: "Bulk Validate",
      description: "Run validation on all rules",
      icon: CheckCircle2,
      variant: "default" as const,
      badge: "Quick",
      action: () => toast({ title: "Validation started", description: "Processing 234 rules..." })
    },
    {
      title: "Auto-Fix Issues",
      description: "Apply automated corrections",
      icon: Zap,
      variant: "default" as const,
      badge: "AI",
      action: () => toast({ title: "Auto-fix initiated", description: "Correcting 12 minor issues..." })
    },
    {
      title: "Sync Sources",
      description: "Update from external systems",
      icon: RefreshCw,
      variant: "outline" as const,
      badge: "Live",
      action: () => toast({ title: "Sync started", description: "Connecting to policy management system..." })
    },
    {
      title: "Emergency Review",
      description: "Flag critical issues for review",
      icon: AlertTriangle,
      variant: "destructive" as const,
      badge: "Urgent",
      action: () => toast({ title: "Emergency review", description: "Flagged 3 critical issues", variant: "destructive" })
    },
    {
      title: "Schedule Report",
      description: "Set up automated reporting",
      icon: Clock,
      variant: "outline" as const,
      badge: "Auto",
      action: () => toast({ title: "Report scheduled", description: "Weekly reports will be sent every Monday" })
    },
    {
      title: "Compliance Check",
      description: "Verify regulatory compliance",
      icon: Target,
      variant: "secondary" as const,
      badge: "Audit",
      action: () => toast({ title: "Compliance check", description: "Running full regulatory audit..." })
    }
  ];

  return (
    <Card className="glass-card border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {quickActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="h-auto p-4 flex-col items-start text-left space-y-2 hover-scale"
              onClick={action.action}
            >
              <div className="flex items-center justify-between w-full">
                <action.icon className="h-5 w-5" />
                <Badge variant="outline" className="text-xs">
                  {action.badge}
                </Badge>
              </div>
              <div className="space-y-1">
                <h4 className="font-medium text-sm">{action.title}</h4>
                <p className="text-xs opacity-70">{action.description}</p>
              </div>
            </Button>
          ))}
        </div>
        
        {/* Workflow Actions */}
        <div className="mt-6 pt-4 border-t border-border/40">
          <h4 className="font-medium mb-3 text-sm">Workflow Actions</h4>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm">
              <Share className="h-3 w-3 mr-1" />
              Share Dashboard
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-3 w-3 mr-1" />
              Configure Alerts
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-3 w-3 mr-1" />
              Export All Data
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;