import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertCircle, ArrowRight, Zap } from "lucide-react";

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  status: "completed" | "in-progress" | "pending" | "warning";
  type: "upload" | "analysis" | "review" | "export";
}

const ProgressTimeline = () => {
  const events: TimelineEvent[] = [
    {
      id: "1",
      title: "Rules Document Uploaded",
      description: "NHIF_Benefits_2024.pdf parsed successfully",
      timestamp: "Today, 9:30 AM",
      status: "completed",
      type: "upload"
    },
    {
      id: "2",
      title: "Contradiction Analysis",
      description: "AI-powered contradiction detection completed",
      timestamp: "Today, 9:32 AM",
      status: "completed",
      type: "analysis"
    },
    {
      id: "3",
      title: "Disease Mapping Review",
      description: "12 mappings require manual verification",
      timestamp: "Today, 10:15 AM",
      status: "in-progress",
      type: "review"
    },
    {
      id: "4",
      title: "Coverage Gap Analysis",
      description: "Identifying unmapped conditions",
      timestamp: "Pending",
      status: "pending",
      type: "analysis"
    },
    {
      id: "5",
      title: "Report Generation",
      description: "Comprehensive analysis report",
      timestamp: "Pending",
      status: "pending",
      type: "export"
    }
  ];

  const getStatusIcon = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-success" />;
      case "in-progress":
        return <Zap className="h-5 w-5 text-primary animate-pulse" />;
      case "warning":
        return <AlertCircle className="h-5 w-5 text-warning" />;
      default:
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: TimelineEvent["status"]) => {
    switch (status) {
      case "completed":
        return <Badge variant="default" className="bg-success/20 text-success border-success/30">Completed</Badge>;
      case "in-progress":
        return <Badge variant="default" className="bg-primary/20 text-primary border-primary/30 animate-pulse">In Progress</Badge>;
      case "warning":
        return <Badge variant="default" className="bg-warning/20 text-warning border-warning/30">Needs Attention</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const completedCount = events.filter(e => e.status === "completed").length;
  const progress = (completedCount / events.length) * 100;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Analysis Progress
          </CardTitle>
          <Badge variant="outline" className="text-xs">
            {completedCount}/{events.length} Complete
          </Badge>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-3">
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-primary/70 transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="relative">
          {/* Connecting Line */}
          <div className="absolute left-[11px] top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-4">
            {events.map((event, index) => (
              <div
                key={event.id}
                className={`relative flex gap-4 pl-8 transition-all duration-300 ${
                  event.status === "pending" ? "opacity-50" : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Status Icon */}
                <div className="absolute left-0 p-0.5 bg-background rounded-full">
                  {getStatusIcon(event.status)}
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0 pb-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-medium">{event.title}</h4>
                      <p className="text-xs text-muted-foreground mt-0.5">{event.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {getStatusBadge(event.status)}
                      <span className="text-xs text-muted-foreground">{event.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgressTimeline;
