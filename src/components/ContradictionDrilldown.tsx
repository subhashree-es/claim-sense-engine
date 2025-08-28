import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, FileText } from "lucide-react";
import { BenefitRule, Contradiction } from "@/types/benefitRules";
import { benefitRules } from "@/data/benefitRulesData";

interface ContradictionDrilldownProps {
  contradiction: Contradiction | null;
  isOpen: boolean;
  onClose: () => void;
}

const ContradictionDrilldown = ({ contradiction, isOpen, onClose }: ContradictionDrilldownProps) => {
  if (!contradiction) return null;

  // Find the actual rules that are in contradiction
  const conflictingRules = benefitRules.filter(rule => 
    rule.service === contradiction.service && rule.contradictionFlag
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Contradiction Details: {contradiction.service}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <h3 className="font-semibold text-destructive mb-2">Contradiction Reason</h3>
            <p className="text-sm">{contradiction.reason}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Rule A - {contradiction.rowALevels}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {conflictingRules[0] && (
                  <>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Service:</span>
                      <p className="text-sm">{conflictingRules[0].service}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Package:</span>
                      <p className="text-sm">{conflictingRules[0].package}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Facility Level:</span>
                      <p className="text-sm">{conflictingRules[0].facilityLevel}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Coverage Condition:</span>
                      <p className="text-sm">{conflictingRules[0].coverageCondition}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Exclusion:</span>
                      <p className="text-sm">{conflictingRules[0].exclusion}</p>
                    </div>
                    {conflictingRules[0].sourceDocument && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Source:</span>
                        <p className="text-sm">{conflictingRules[0].sourceDocument} - Page {conflictingRules[0].sourcePage}</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-destructive/20">
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Rule B - {contradiction.rowBLevels}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {conflictingRules[1] && (
                  <>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Service:</span>
                      <p className="text-sm">{conflictingRules[1].service}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Package:</span>
                      <p className="text-sm">{conflictingRules[1].package}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Facility Level:</span>
                      <p className="text-sm">{conflictingRules[1].facilityLevel}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Coverage Condition:</span>
                      <p className="text-sm">{conflictingRules[1].coverageCondition}</p>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-muted-foreground">Exclusion:</span>
                      <p className="text-sm">{conflictingRules[1].exclusion}</p>
                    </div>
                    {conflictingRules[1].sourceDocument && (
                      <div>
                        <span className="text-xs font-medium text-muted-foreground">Source:</span>
                        <p className="text-sm">{conflictingRules[1].sourceDocument} - Page {conflictingRules[1].sourcePage}</p>
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center pt-4">
            <Badge variant="destructive" className="text-xs">
              These rules create a contradiction and require review
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContradictionDrilldown;