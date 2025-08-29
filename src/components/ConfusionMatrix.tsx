import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { benefitRules, diseaseMappings } from "@/data/benefitRulesData";
import { useMemo } from "react";

const ConfusionMatrix = () => {
  const matrixData = useMemo(() => {
    // Create a confusion matrix comparing predicted vs actual coverage
    const facilityLevels = Array.from(new Set(benefitRules.map(rule => rule.facilityLevel))).sort();
    const packages = Array.from(new Set(benefitRules.map(rule => rule.package))).sort();
    
    // Calculate metrics for each package-facility combination
    const matrix = packages.map(packageName => {
      const packageRules = benefitRules.filter(rule => rule.package === packageName);
      
      const levelCoverage = facilityLevels.map(level => {
        const rulesForLevel = packageRules.filter(rule => rule.facilityLevel === level);
        
        // Confusion matrix metrics
        const totalRules = rulesForLevel.length;
        const rulesWithTariffs = rulesForLevel.filter(rule => 
          rule.tariff && rule.tariff !== '' && !rule.tariff.includes('Global Budget')
        ).length;
        const rulesWithExclusions = rulesForLevel.filter(rule => 
          rule.exclusion && rule.exclusion !== '' && rule.exclusion.toLowerCase() !== 'none'
        ).length;
        const contradictedRules = rulesForLevel.filter(rule => rule.contradictionFlag).length;
        
        // Calculate coverage completeness score
        const completenessScore = totalRules > 0 ? 
          ((rulesWithTariffs + rulesWithExclusions) / (totalRules * 2)) * 100 : 0;
        
        return {
          level,
          totalRules,
          rulesWithTariffs,
          rulesWithExclusions,
          contradictedRules,
          completenessScore
        };
      });
      
      return {
        package: packageName,
        levelCoverage
      };
    });
    
    return { matrix, facilityLevels, packages };
  }, []);

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    if (score >= 40) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getScoreText = (score: number) => {
    if (score >= 80) return 'High';
    if (score >= 60) return 'Med';
    if (score >= 40) return 'Low';
    return 'Poor';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Package Coverage Confusion Matrix</CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>High (80%+)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Medium (60-79%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-orange-500 rounded"></div>
            <span>Low (40-59%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <span>Poor (&lt;40%)</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="grid grid-cols-[250px_repeat(auto-fit,_minmax(150px,_1fr))] gap-2 mb-2">
              <div className="font-semibold text-sm p-2">Package Type</div>
              {matrixData.facilityLevels.map(level => (
                <div key={level} className="font-semibold text-sm p-2 text-center bg-muted rounded">
                  {level}
                </div>
              ))}
            </div>
            
            {/* Matrix Rows */}
            <div className="space-y-2">
              {matrixData.matrix.map((row, index) => (
                <div key={index} className="grid grid-cols-[250px_repeat(auto-fit,_minmax(150px,_1fr))] gap-2">
                  <div className="p-3 text-sm font-medium bg-background border rounded">
                    <div className="font-semibold">{row.package}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Coverage Package
                    </div>
                  </div>
                  
                  {row.levelCoverage.map((coverage, levelIndex) => (
                    <div 
                      key={levelIndex} 
                      className={`p-3 rounded text-center text-xs font-medium text-white ${getScoreColor(coverage.completenessScore)}`}
                      title={`Total Rules: ${coverage.totalRules}\nWith Tariffs: ${coverage.rulesWithTariffs}\nWith Exclusions: ${coverage.rulesWithExclusions}\nContradictions: ${coverage.contradictedRules}\nCompleteness: ${coverage.completenessScore.toFixed(1)}%`}
                    >
                      <div className="font-bold text-sm">{coverage.totalRules}</div>
                      <div className="text-xs opacity-90">
                        {getScoreText(coverage.completenessScore)}
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        {coverage.completenessScore.toFixed(0)}%
                      </div>
                      {coverage.contradictedRules > 0 && (
                        <div className="text-xs mt-1 bg-red-600 rounded px-1">
                          ⚠ {coverage.contradictedRules}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">Matrix Summary</h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-medium">Total Packages</div>
              <div className="text-xl font-bold">{matrixData.packages.length}</div>
            </div>
            <div>
              <div className="font-medium">Facility Levels</div>
              <div className="text-xl font-bold">{matrixData.facilityLevels.length}</div>
            </div>
            <div>
              <div className="font-medium">Total Rules</div>
              <div className="text-xl font-bold">{benefitRules.length}</div>
            </div>
            <div>
              <div className="font-medium">Avg Completeness</div>
              <div className="text-xl font-bold">
                {matrixData.matrix.reduce((acc, row) => 
                  acc + row.levelCoverage.reduce((sum, cov) => sum + cov.completenessScore, 0) / row.levelCoverage.length, 0
                ) / matrixData.matrix.length}%
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ConfusionMatrix;