import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Eye, ArrowRight, CheckCircle } from "lucide-react";
import { contradictions, benefitRules } from "@/data/benefitRulesData";

interface ContradictionsListProps {
  onContradictionClick: (contradiction: any) => void;
}

const ContradictionsList = ({ onContradictionClick }: ContradictionsListProps) => {
  const getContradictingRules = (contradiction: any) => {
    // Find the actual rules that are contradicting
    const ruleA = benefitRules.find(rule => 
      rule.service === contradiction.service && rule.contradictionFlag
    );
    const ruleB = benefitRules.find(rule => 
      rule.service === contradiction.service && 
      rule.id !== ruleA?.id && 
      (rule.package !== ruleA?.package || rule.facilityLevel !== ruleA?.facilityLevel)
    );

    return { ruleA, ruleB };
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <h3 className="text-lg font-semibold">Detected Contradictions</h3>
        <Badge variant="destructive">{contradictions.length}</Badge>
      </div>

      {contradictions.map((contradiction) => {
        const { ruleA, ruleB } = getContradictingRules(contradiction);
        
        return (
          <Card key={contradiction.id} className="border-destructive/20">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-destructive" />
                  {contradiction.service}
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => onContradictionClick(contradiction)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Contradiction Reason */}
              <div className="p-3 bg-destructive/10 rounded-lg">
                <p className="text-sm font-medium text-destructive mb-1">Contradiction Reason:</p>
                <p className="text-sm">{contradiction.reason}</p>
              </div>

              {/* Side-by-side Rule Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Rule A */}
                <div className="border rounded-lg p-3 bg-red-50 dark:bg-red-950/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                      Rule A
                    </Badge>
                    {ruleA && (
                      <span className="text-xs text-muted-foreground">ID: {ruleA.id}</span>
                    )}
                  </div>
                  
                  {ruleA ? (
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Package:</span> {ruleA.package}
                      </div>
                      <div>
                        <span className="font-medium">Facility:</span> {ruleA.facilityLevel}
                      </div>
                      <div>
                        <span className="font-medium">Tariff:</span> {ruleA.tariff}
                      </div>
                      <div>
                        <span className="font-medium">Condition:</span> {ruleA.coverageCondition || 'None'}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {contradiction.rowALevels}
                    </div>
                  )}
                </div>

                {/* Rule B */}
                <div className="border rounded-lg p-3 bg-orange-50 dark:bg-orange-950/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="bg-orange-100 text-orange-800 border-orange-300">
                      Rule B
                    </Badge>
                    {ruleB && (
                      <span className="text-xs text-muted-foreground">ID: {ruleB.id}</span>
                    )}
                  </div>
                  
                  {ruleB ? (
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Package:</span> {ruleB.package}
                      </div>
                      <div>
                        <span className="font-medium">Facility:</span> {ruleB.facilityLevel}
                      </div>
                      <div>
                        <span className="font-medium">Tariff:</span> {ruleB.tariff}
                      </div>
                      <div>
                        <span className="font-medium">Condition:</span> {ruleB.coverageCondition || 'None'}
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      {contradiction.rowBLevels}
                    </div>
                  )}
                </div>
              </div>

              {/* Impact Assessment */}
              <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Impact Assessment</span>
                </div>
                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
                  Requires Resolution
                </Badge>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {contradictions.length === 0 && (
        <Card>
          <CardContent className="text-center py-8">
            <div className="text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
              <p>No contradictions detected in the benefit rules.</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ContradictionsList;