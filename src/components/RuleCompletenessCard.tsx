import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, FileText } from "lucide-react";
import { benefitRules } from "@/data/benefitRulesData";
import { useMemo } from "react";

const RuleCompletenessCard = () => {
  const completeness = useMemo(() => {
    const total = benefitRules.length;
    
    const withTariffs = benefitRules.filter(rule => 
      rule.tariff && rule.tariff.trim() !== "" && rule.tariff !== "Not specified"
    ).length;
    
    const withLimits = benefitRules.filter(rule => 
      rule.coverageCondition && rule.coverageCondition.trim() !== ""
    ).length;
    
    const withExclusions = benefitRules.filter(rule => 
      rule.exclusion && rule.exclusion.trim() !== ""
    ).length;
    
    const withSourceCitation = benefitRules.filter(rule => 
      rule.sourceDocument && rule.sourceDocument.trim() !== ""
    ).length;
    
    return {
      withTariffs,
      withLimits,
      withExclusions,
      withSourceCitation,
      missingTariffs: total - withTariffs,
      missingLimits: total - withLimits,
      missingExclusions: total - withExclusions,
      missingSourceCitation: total - withSourceCitation,
      total
    };
  }, []);

  const getPercentage = (value: number) => (value / completeness.total) * 100;

  const getCompletionColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Rule Completeness Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Tariffs Specified</span>
              <Badge variant="secondary" className={getCompletionColor(getPercentage(completeness.withTariffs))}>
                {completeness.withTariffs}/{completeness.total}
              </Badge>
            </div>
            <Progress value={getPercentage(completeness.withTariffs)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completeness.missingTariffs} rules missing tariff information
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Coverage Limits</span>
              <Badge variant="secondary" className={getCompletionColor(getPercentage(completeness.withLimits))}>
                {completeness.withLimits}/{completeness.total}
              </Badge>
            </div>
            <Progress value={getPercentage(completeness.withLimits)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completeness.missingLimits} rules missing limit conditions
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Exclusions Defined</span>
              <Badge variant="secondary" className={getCompletionColor(getPercentage(completeness.withExclusions))}>
                {completeness.withExclusions}/{completeness.total}
              </Badge>
            </div>
            <Progress value={getPercentage(completeness.withExclusions)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completeness.missingExclusions} rules missing exclusion details
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Source Citations</span>
              <Badge variant="secondary" className={getCompletionColor(getPercentage(completeness.withSourceCitation))}>
                {completeness.withSourceCitation}/{completeness.total}
              </Badge>
            </div>
            <Progress value={getPercentage(completeness.withSourceCitation)} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {completeness.missingSourceCitation} rules missing source documentation
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-4 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Complete</span>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {benefitRules.filter(rule => 
                rule.tariff && rule.coverageCondition && rule.exclusion && rule.sourceDocument
              ).length}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <span className="text-sm font-medium">Partial</span>
            </div>
            <p className="text-2xl font-bold text-yellow-600">
              {benefitRules.filter(rule => {
                const fields = [rule.tariff, rule.coverageCondition, rule.exclusion, rule.sourceDocument];
                const filledFields = fields.filter(field => field && field.trim() !== "").length;
                return filledFields > 0 && filledFields < 4;
              }).length}
            </p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <span className="text-sm font-medium">Incomplete</span>
            </div>
            <p className="text-2xl font-bold text-red-600">
              {benefitRules.filter(rule => 
                !rule.tariff && !rule.coverageCondition && !rule.exclusion && !rule.sourceDocument
              ).length}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RuleCompletenessCard;