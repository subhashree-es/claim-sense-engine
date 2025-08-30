import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  UserCheck, 
  BarChart3, 
  CreditCard, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  FileSearch,
  Users
} from "lucide-react";
import { benefitRules, contradictions, diseaseMappings } from "@/data/benefitRulesData";

const UserRolePerspectives = () => {
  const [activeRole, setActiveRole] = useState("policy-maker");

  // Calculate metrics
  const totalRules = benefitRules.length;
  const contradictionsCount = contradictions.length;
  const mappedDiseases = diseaseMappings.filter(d => d.isMapped).length;
  const unmappedDiseases = diseaseMappings.filter(d => !d.isMapped).length;
  const rulesWithTariffs = benefitRules.filter(rule => rule.tariff && rule.tariff !== "Not specified").length;
  const criticalContradictions = contradictions.filter(c => c.reason.includes("coverage") || c.reason.includes("limit")).length;

  const roleViews = {
    "policy-maker": {
      title: "Policy Maker View",
      icon: UserCheck,
      color: "bg-blue-500",
      metrics: [
        {
          title: "Package Completeness",
          value: `${Math.round((rulesWithTariffs / totalRules) * 100)}%`,
          description: "Rules with defined tariffs",
          trend: "+3% vs last month",
          status: "improving"
        },
        {
          title: "Coverage Gaps",
          value: unmappedDiseases,
          description: "Diseases without service mapping",
          trend: "-2 vs last review",
          status: "improving"
        },
        {
          title: "Policy Conflicts",
          value: contradictionsCount,
          description: "Rule contradictions requiring resolution",
          trend: "New since last version",
          status: "critical"
        },
        {
          title: "Implementation Readiness",
          value: `${Math.round(((totalRules - contradictionsCount) / totalRules) * 100)}%`,
          description: "Rules ready for deployment",
          trend: "92% target by Q4",
          status: "on-track"
        }
      ]
    },
    "analyst": {
      title: "Policy Analyst View", 
      icon: BarChart3,
      color: "bg-green-500",
      metrics: [
        {
          title: "Data Quality Score",
          value: `${Math.round((rulesWithTariffs / totalRules) * 100)}%`,
          description: "Rules with complete data",
          trend: "Source citation: 45%",
          status: "needs-attention"
        },
        {
          title: "Contradiction Analysis",
          value: `${criticalContradictions}/${contradictionsCount}`,
          description: "Critical vs total contradictions",
          trend: "Impact assessment pending",
          status: "in-progress"
        },
        {
          title: "Disease Coverage Matrix",
          value: `${mappedDiseases}/${diseaseMappings.length}`,
          description: "Mapped vs total diseases",
          trend: "75% facility level coverage",
          status: "on-track"
        },
        {
          title: "Validation Status",
          value: `${totalRules - contradictionsCount}`,
          description: "Rules passed validation",
          trend: "3 pending review",
          status: "in-progress"
        }
      ]
    },
    "claims-officer": {
      title: "Claims Officer View",
      icon: CreditCard,
      color: "bg-purple-500", 
      metrics: [
        {
          title: "Reimbursement Conflicts",
          value: contradictionsCount,
          description: "Rules causing payment disputes",
          trend: "Avg delay: 3.2 days",
          status: "critical"
        },
        {
          title: "Clear Tariff Rules",
          value: rulesWithTariffs,
          description: "Rules with defined payment rates",
          trend: `${totalRules - rulesWithTariffs} pending`,
          status: "needs-attention"
        },
        {
          title: "Facility Level Clarity",
          value: `${Math.round((benefitRules.filter(r => r.facilityLevel !== "All levels").length / totalRules) * 100)}%`,
          description: "Rules with specific facility requirements",
          trend: "Reduces manual review by 40%",
          status: "improving"
        },
        {
          title: "Processing Efficiency",
          value: `${Math.round(((totalRules - contradictionsCount) / totalRules) * 100)}%`,
          description: "Claims with clear processing rules",
          trend: "Target: 95% auto-processing",
          status: "on-track"
        }
      ]
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-red-600 bg-red-100";
      case "needs-attention": return "text-yellow-600 bg-yellow-100";
      case "in-progress": return "text-blue-600 bg-blue-100";
      case "improving": return "text-green-600 bg-green-100";
      case "on-track": return "text-green-600 bg-green-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "critical": return <AlertTriangle className="h-4 w-4" />;
      case "improving": case "on-track": return <CheckCircle className="h-4 w-4" />;
      default: return <TrendingUp className="h-4 w-4" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          User Role Perspectives
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeRole} onValueChange={setActiveRole}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="policy-maker" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Policy Maker
            </TabsTrigger>
            <TabsTrigger value="analyst" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Analyst
            </TabsTrigger>
            <TabsTrigger value="claims-officer" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Claims Officer
            </TabsTrigger>
          </TabsList>

          {Object.entries(roleViews).map(([roleKey, roleData]) => (
            <TabsContent key={roleKey} value={roleKey} className="space-y-4">
              <div className={`${roleData.color} text-white p-4 rounded-lg`}>
                <div className="flex items-center gap-2 mb-2">
                  <roleData.icon className="h-5 w-5" />
                  <h3 className="font-semibold">{roleData.title}</h3>
                </div>
                <p className="text-sm opacity-90">
                  Key metrics and insights tailored for {roleData.title.toLowerCase()} responsibilities
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roleData.metrics.map((metric, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{metric.title}</h4>
                        <Badge className={getStatusColor(metric.status)}>
                          {getStatusIcon(metric.status)}
                          <span className="ml-1 capitalize">{metric.status.replace('-', ' ')}</span>
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-2xl font-bold">{metric.value}</div>
                        <p className="text-sm text-muted-foreground">{metric.description}</p>
                        <p className="text-xs text-muted-foreground italic">{metric.trend}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Role-specific action items */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Recommended Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {roleKey === "policy-maker" && (
                      <>
                        <p className="text-sm">• Review {contradictionsCount} contradictions for policy alignment</p>
                        <p className="text-sm">• Address {unmappedDiseases} unmapped diseases for comprehensive coverage</p>
                        <p className="text-sm">• Schedule stakeholder review for conflicting facility level requirements</p>
                      </>
                    )}
                    {roleKey === "analyst" && (
                      <>
                        <p className="text-sm">• Complete source citation for {totalRules - benefitRules.filter(r => r.sourceDocument).length} rules</p>
                        <p className="text-sm">• Perform impact analysis on {criticalContradictions} critical contradictions</p>
                        <p className="text-sm">• Update disease-service mapping matrix for missing entries</p>
                      </>
                    )}
                    {roleKey === "claims-officer" && (
                      <>
                        <p className="text-sm">• Escalate {contradictionsCount} contradictions causing payment delays</p>
                        <p className="text-sm">• Request tariff clarification for {totalRules - rulesWithTariffs} services</p>
                        <p className="text-sm">• Update processing guidelines for facility level requirements</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserRolePerspectives;