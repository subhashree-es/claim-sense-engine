import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, AlertTriangle, Info, CheckCircle, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info" | "success";
  title: string;
  message: string;
  timestamp: Date;
  isRead: boolean;
}

const RealTimeAlerts = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "critical",
      title: "High Risk Rules Detected",
      message: "15 rules missing source documentation require immediate attention",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      isRead: false
    },
    {
      id: "2",
      type: "warning",
      title: "Coverage Gap Identified",
      message: "Pediatric cardiology services may have insufficient coverage limits",
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      isRead: false
    },
    {
      id: "3",
      type: "info",
      title: "Monthly Report Available",
      message: "December benefit rules analysis report is ready for review",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      isRead: true
    }
  ]);

  const { toast } = useToast();

  const getAlertIcon = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case "info":
        return <Info className="h-4 w-4 text-info" />;
      case "success":
        return <CheckCircle className="h-4 w-4 text-success" />;
    }
  };

  const getAlertVariant = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return "destructive";
      case "warning":
        return "outline";
      case "info":
        return "secondary";
      case "success":
        return "default";
      default:
        return "secondary";
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, isRead: true } : alert
    ));
  };

  const dismissAlert = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  // Simulate real-time alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance every 10 seconds
        const newAlert: Alert = {
          id: Date.now().toString(),
          type: Math.random() < 0.3 ? "critical" : Math.random() < 0.6 ? "warning" : "info",
          title: "System Alert",
          message: "New policy contradiction detected in uploaded rules",
          timestamp: new Date(),
          isRead: false
        };
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]);
        
        toast({
          title: newAlert.title,
          description: newAlert.message,
          variant: newAlert.type === "critical" ? "destructive" : "default"
        });
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [toast]);

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (minutes < 1440) return `${Math.floor(minutes / 60)}h ago`;
    return `${Math.floor(minutes / 1440)}d ago`;
  };

  return (
    <Card className="glass-card border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Real-Time Alerts
            {unreadCount > 0 && (
              <Badge variant="destructive" className="h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setAlerts(alerts.map(a => ({ ...a, isRead: true })))}
          >
            Mark All Read
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-64">
          <div className="space-y-3">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border transition-all ${
                  !alert.isRead 
                    ? "bg-accent/20 border-accent/40" 
                    : "bg-muted/30 border-border/30"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2 flex-1">
                    {getAlertIcon(alert.type)}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <Badge variant={getAlertVariant(alert.type)} className="text-xs">
                          {alert.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{alert.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatTime(alert.timestamp)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {!alert.isRead && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={() => markAsRead(alert.id)}
                      >
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 hover:bg-destructive/20"
                      onClick={() => dismissAlert(alert.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default RealTimeAlerts;