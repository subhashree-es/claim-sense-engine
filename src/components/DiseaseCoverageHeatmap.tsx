import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { benefitRules, diseaseMappings } from "@/data/benefitRulesData";
import { useMemo } from "react";

const DiseaseCoverageHeatmap = () => {
  const heatmapData = useMemo(() => {
    const facilityLevels = Array.from(new Set(benefitRules.map(rule => rule.facilityLevel))).sort();
    const mappedDiseases = diseaseMappings.filter(d => d.isMapped);
    
    const matrix = mappedDiseases.map(disease => {
      const coverageByLevel = facilityLevels.map(level => {
        const relevantServices = disease.mappedServices;
        const rulesForLevel = benefitRules.filter(rule => 
          rule.facilityLevel === level && 
          relevantServices.some(service => rule.service.toLowerCase().includes(service.toLowerCase()))
        );
        
        if (rulesForLevel.length === 0) return { level, coverage: 'none', count: 0 };
        
        const hasExclusions = rulesForLevel.some(rule => 
          rule.exclusion && rule.exclusion.toLowerCase() !== 'none'
        );
        
        if (hasExclusions) return { level, coverage: 'partial', count: rulesForLevel.length };
        return { level, coverage: 'full', count: rulesForLevel.length };
      });
      
      return {
        disease: disease.disease,
        services: disease.mappedServices,
        coverageByLevel
      };
    });
    
    return { matrix, facilityLevels };
  }, []);

  const getCoverageColor = (coverage: string) => {
    switch (coverage) {
      case 'full': return 'bg-green-500';
      case 'partial': return 'bg-yellow-500';
      case 'none': return 'bg-red-200';
      default: return 'bg-gray-200';
    }
  };

  const getCoverageText = (coverage: string) => {
    switch (coverage) {
      case 'full': return 'Full Coverage';
      case 'partial': return 'Partial/Excluded';
      case 'none': return 'No Coverage';
      default: return 'Unknown';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Disease Coverage Heatmap</CardTitle>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded"></div>
            <span>Full Coverage</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <span>Partial/Excluded</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-200 rounded"></div>
            <span>No Coverage</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Header Row */}
            <div className="grid grid-cols-[200px_repeat(auto-fit,_minmax(120px,_1fr))] gap-2 mb-2">
              <div className="font-semibold text-sm p-2">Disease/Condition</div>
              {heatmapData.facilityLevels.map(level => (
                <div key={level} className="font-semibold text-sm p-2 text-center bg-muted rounded">
                  {level}
                </div>
              ))}
            </div>
            
            {/* Data Rows */}
            <div className="space-y-2">
              {heatmapData.matrix.map((row, index) => (
                <div key={index} className="grid grid-cols-[200px_repeat(auto-fit,_minmax(120px,_1fr))] gap-2">
                  <div className="p-2 text-sm font-medium bg-background border rounded">
                    <div>{row.disease}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {row.services.slice(0, 2).join(', ')}
                      {row.services.length > 2 && '...'}
                    </div>
                  </div>
                  
                  {row.coverageByLevel.map((coverage, levelIndex) => (
                    <div 
                      key={levelIndex} 
                      className={`p-2 rounded text-center text-xs font-medium text-white ${getCoverageColor(coverage.coverage)}`}
                      title={`${getCoverageText(coverage.coverage)} (${coverage.count} rules)`}
                    >
                      <div>{coverage.count}</div>
                      <div className="text-xs opacity-80">
                        {coverage.coverage === 'full' ? 'Full' : 
                         coverage.coverage === 'partial' ? 'Partial' : 'None'}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DiseaseCoverageHeatmap;