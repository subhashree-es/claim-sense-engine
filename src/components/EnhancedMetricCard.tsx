import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedMetricCardProps {
  title: string;
  value: number | string | React.ReactNode;
  subtitle?: string;
  trend?: {
    value: number;
    label: string;
  };
  progress?: {
    value: number;
    max: number;
    label?: string;
  };
  variant?: "default" | "success" | "warning" | "destructive" | "info";
  icon?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function EnhancedMetricCard({
  title,
  value,
  subtitle,
  trend,
  progress,
  variant = "default",
  icon,
  className,
  onClick
}: EnhancedMetricCardProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "success":
        return "border-success/20 bg-success/5 shadow-glow";
      case "warning":
        return "border-warning/20 bg-warning/5";
      case "destructive":
        return "border-destructive/20 bg-destructive/5";
      case "info":
        return "border-info/20 bg-info/5";
      default:
        return "border-primary/20 bg-primary/5";
    }
  };

  const getProgressColor = () => {
    switch (variant) {
      case "success":
        return "bg-success";
      case "warning":
        return "bg-warning";
      case "destructive":
        return "bg-destructive";
      case "info":
        return "bg-info";
      default:
        return "bg-primary";
    }
  };

  const getTrendIcon = () => {
    if (!trend) return null;
    
    if (trend.value > 0) {
      return <TrendingUp className="h-4 w-4 text-success" />;
    } else if (trend.value < 0) {
      return <TrendingDown className="h-4 w-4 text-destructive" />;
    } else {
      return <Minus className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card 
      className={cn(
        "metric-card animate-fade-in-up",
        getVariantClasses(),
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            variant === "success" && "bg-success/10 text-success",
            variant === "warning" && "bg-warning/10 text-warning",
            variant === "destructive" && "bg-destructive/10 text-destructive",
            variant === "info" && "bg-info/10 text-info",
            variant === "default" && "bg-primary/10 text-primary"
          )}>
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="text-2xl font-bold">{value}</div>
            {subtitle && (
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            )}
          </div>
          
          {trend && (
            <Badge 
              variant="outline" 
              className={cn(
                "flex items-center gap-1",
                trend.value > 0 && "border-success/20 text-success",
                trend.value < 0 && "border-destructive/20 text-destructive"
              )}
            >
              {getTrendIcon()}
              <span className="text-xs">{trend.label}</span>
            </Badge>
          )}
        </div>
        
        {progress && (
          <div className="mt-4 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {progress.label || "Progress"}
              </span>
              <span className="font-medium">
                {progress.value}/{progress.max}
              </span>
            </div>
            <Progress 
              value={(progress.value / progress.max) * 100} 
              className="h-2"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}