import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, FileText, MapPin, Stethoscope } from "lucide-react";
import { benefitRules, diseaseMappings } from "@/data/benefitRulesData";

const PolicyRiskIndicators = () => {
  // Calculate risk metrics
  const totalRules = benefitRules.length;
  const rulesWithTariffs = benefitRules.filter(rule => rule.tariff && rule.tariff !== "Not specified").length;
  const rulesWithExclusions = benefitRules.filter(rule => rule.exclusion && rule.exclusion !== "None").length;
  const rulesWithSource = benefitRules.filter(rule => rule.sourceDocument).length;
  const totalDiseases = diseaseMappings.length;
  const unmappedDiseases = diseaseMappings.filter(d => !d.isMapped).length;
  
  // Calculate percentages
  const tariffCompleteness = Math.round((rulesWithTariffs / totalRules) * 100);
  const exclusionCompleteness = Math.round((rulesWithExclusions / totalRules) * 100);
  const sourceCompleteness = Math.round((rulesWithSource / totalRules) * 100);
  const diseaseMapping = Math.round(((totalDiseases - unmappedDiseases) / totalDiseases) * 100);
  
  // Risk levels
  const getRiskLevel = (percentage: number) => {
    if (percentage >= 80) return { level: "Low", color: "text-green-600", bgColor: "bg-green-100" };
    if (percentage >= 60) return { level: "Medium", color: "text-yellow-600", bgColor: "bg-yellow-100" };
    return { level: "High", color: "text-red-600", bgColor: "bg-red-100" };
  };

  const riskIndicators = [
    {
      title: "Tariff Completeness",
      percentage: tariffCompleteness,
      description: `${rulesWithTariffs}/${totalRules} rules have defined tariffs`,
      icon: FileText,
      risk: getRiskLevel(tariffCompleteness)
    },
    {
      title: "Exclusion Coverage",
      percentage: exclusionCompleteness,
      description: `${rulesWithExclusions}/${totalRules} rules have explicit exclusions`,
      icon: AlertTriangle,
      risk: getRiskLevel(exclusionCompleteness)
    },
    {
      title: "Source Documentation", 
      percentage: sourceCompleteness,
      description: `${rulesWithSource}/${totalRules} rules cite source documents`,
      icon: FileText,
      risk: getRiskLevel(sourceCompleteness)
    },
    {
      title: "Disease Mapping",
      percentage: diseaseMapping,
      description: `${totalDiseases - unmappedDiseases}/${totalDiseases} diseases have service mappings`,
      icon: Stethoscope,
      risk: getRiskLevel(diseaseMapping)
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Policy Risk Indicators
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {riskIndicators.map((indicator, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <indicator.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">{indicator.title}</span>
                </div>
                <Badge 
                  variant="outline" 
                  className={`${indicator.risk.color} ${indicator.risk.bgColor} border-current`}
                >
                  {indicator.risk.level} Risk
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{indicator.description}</span>
                  <span className="font-medium">{indicator.percentage}%</span>
                </div>
                <Progress value={indicator.percentage} className="h-2" />
              </div>
            </div>
          ))}
        </div>

        {/* Overall Risk Assessment */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-medium mb-2">Overall Risk Assessment</h4>
          <div className="text-sm text-muted-foreground space-y-1">
            <p>• {riskIndicators.filter(i => i.risk.level === "High").length} high-risk indicators require immediate attention</p>
            <p>• {riskIndicators.filter(i => i.risk.level === "Medium").length} medium-risk indicators need monitoring</p>
            <p>• Recommend prioritizing source documentation and exclusion definition</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PolicyRiskIndicators;