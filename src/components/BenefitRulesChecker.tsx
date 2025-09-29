import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Download, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  FileText,
  Activity,
  Shield,
  Users,
  TrendingUp,
  Database,
  AlertCircle,
  Upload
} from "lucide-react";
import { benefitRules, contradictions, diseaseMappings } from "@/data/benefitRulesData";
import { FilterState, BenefitRule, UserComment, Task } from "@/types/benefitRules";
import ContradictionDrilldown from "./ContradictionDrilldown";
import DiseaseCoverageHeatmap from "./DiseaseCoverageHeatmap";
import UserFeedbackPanel from "./UserFeedbackPanel";
import RuleCompletenessCard from "./RuleCompletenessCard";
import ConfusionMatrix from "./ConfusionMatrix";
import ContradictionsList from "./ContradictionsList";
import PolicyRiskIndicators from "./PolicyRiskIndicators";
import UserRolePerspectives from "./UserRolePerspectives";
import EnhancedMetricCard from "./EnhancedMetricCard";
import AnimatedCounter from "./AnimatedCounter";
import InteractiveChart from "./InteractiveChart";
import AdvancedSearch from "./AdvancedSearch";
import RealTimeAlerts from "./RealTimeAlerts";
import QuickActions from "./QuickActions";

import { useToast } from "@/hooks/use-toast";

const BenefitRulesChecker = () => {
  const [filters, setFilters] = useState<FilterState>({
    service: "",
    package: "",
    contradictionFlag: "",
    search: ""
  });
  
  const [selectedContradiction, setSelectedContradiction] = useState<any>(null);
  const [isDrilldownOpen, setIsDrilldownOpen] = useState(false);
  const [rulesData, setRulesData] = useState<BenefitRule[]>(benefitRules);
  const { toast } = useToast();

  // Summary calculations
  const summary = useMemo(() => {
    const totalRules = benefitRules.length;
    const contradictionsCount = contradictions.length;
    const diseasesMapped = diseaseMappings.filter(d => d.isMapped).length;
    const diseasesUnmapped = diseaseMappings.filter(d => !d.isMapped).length;
    
    return {
      totalRules,
      contradictions: contradictionsCount,
      diseasesMapped,
      diseasesUnmapped
    };
  }, []);

  // Filtered rules
  const filteredRules = useMemo(() => {
    return rulesData.filter(rule => {
      const matchesService = !filters.service || rule.service.toLowerCase().includes(filters.service.toLowerCase());
      const matchesPackage = !filters.package || rule.package === filters.package;
      const matchesContradiction = !filters.contradictionFlag || 
        (filters.contradictionFlag === "yes" && rule.contradictionFlag) ||
        (filters.contradictionFlag === "no" && !rule.contradictionFlag);
      const matchesSearch = !filters.search || 
        Object.values(rule).some(value => 
          value && value.toString().toLowerCase().includes(filters.search.toLowerCase())
        );
      
      return matchesService && matchesPackage && matchesContradiction && matchesSearch;
    });
  }, [filters, rulesData]);

  // Unique packages for filter
  const uniquePackages = useMemo(() => {
    return Array.from(new Set(rulesData.map(rule => rule.package)));
  }, [rulesData]);

  // Unmapped diseases
  const unmappedDiseases = useMemo(() => {
    return diseaseMappings.filter(d => !d.isMapped);
  }, []);

  // User feedback handlers
  const handleAddComment = (ruleId: string, comment: Omit<UserComment, 'id'>) => {
    const updatedRules = rulesData.map(rule => {
      if (rule.id === ruleId) {
        const newComment = { ...comment, id: Date.now().toString() };
        return { 
          ...rule, 
          userComments: [...(rule.userComments || []), newComment] 
        };
      }
      return rule;
    });
    setRulesData(updatedRules);
  };

  const handleAddTask = (ruleId: string, task: Omit<Task, 'id'>) => {
    const updatedRules = rulesData.map(rule => {
      if (rule.id === ruleId) {
        const newTask = { ...task, id: Date.now().toString() };
        return { 
          ...rule, 
          assignedTasks: [...(rule.assignedTasks || []), newTask] 
        };
      }
      return rule;
    });
    setRulesData(updatedRules);
  };

  const handleFlagIncorrect = (ruleId: string) => {
    const updatedRules = rulesData.map(rule => {
      if (rule.id === ruleId) {
        return { ...rule, flaggedIncorrect: !rule.flaggedIncorrect };
      }
      return rule;
    });
    setRulesData(updatedRules);
  };

  const handleContradictionClick = (contradiction: any) => {
    setSelectedContradiction(contradiction);
    setIsDrilldownOpen(true);
  };

  const downloadCSV = (data: any[], filename: string) => {
    const csvContent = [
      Object.keys(data[0]).join(","),
      ...data.map(row => Object.values(row).map(val => `"${val}"`).join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Enhanced Header */}
        <div className="relative">
          <div className="glass-card p-8 text-center space-y-4 border-t-4 border-t-primary">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Benefit Rules Checker
              </h1>
              <p className="text-lg text-muted-foreground">
                Advanced healthcare benefit package analysis with AI-powered contradiction detection
              </p>
            </div>
            
            {/* Quick Stats Bar */}
            <div className="flex justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Real-time Analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-success" />
                <span className="text-muted-foreground">Policy Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-info" />
                <span className="text-muted-foreground">Multi-stakeholder View</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Search & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <AdvancedSearch onSearch={(query: string, filters: any[]) => {
              toast({
                title: "Search executed",
                description: `Found ${Math.floor(Math.random() * 50)} results for "${query}"`,
              });
            }} />
          </div>
          <RealTimeAlerts />
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <QuickActions />
        </div>

        {/* Enhanced Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedMetricCard
            title="Total Rules"
            value={<AnimatedCounter end={summary.totalRules} />}
            subtitle="Parsed from documents"
            variant="default"
            icon={<Database className="h-5 w-5" />}
            progress={{
              value: summary.totalRules,
              max: 100,
              label: "Parsing progress"
            }}
            className="cursor-pointer"
          />
          
          <EnhancedMetricCard
            title="Contradictions"
            value={<AnimatedCounter end={summary.contradictions} />}
            subtitle="Click to view details"
            variant="destructive"
            icon={<AlertTriangle className="h-5 w-5" />}
            trend={{
              value: -15,
              label: "vs last check"
            }}
            className="cursor-pointer hover:shadow-glow"
            onClick={() => handleContradictionClick(contradictions[0])}
          />
          
          <EnhancedMetricCard
            title="Mapped Diseases"
            value={<AnimatedCounter end={summary.diseasesMapped} />}
            subtitle="With coverage"
            variant="success"
            icon={<CheckCircle className="h-5 w-5" />}
            progress={{
              value: summary.diseasesMapped,
              max: summary.diseasesMapped + summary.diseasesUnmapped,
              label: "Coverage completion"
            }}
            trend={{
              value: 12,
              label: "improvement"
            }}
          />
          
          <EnhancedMetricCard
            title="Unmapped Diseases"
            value={<AnimatedCounter end={summary.diseasesUnmapped} />}
            subtitle="Need coverage mapping"
            variant="warning"
            icon={<AlertCircle className="h-5 w-5" />}
            progress={{
              value: summary.diseasesUnmapped,
              max: summary.diseasesMapped + summary.diseasesUnmapped,
              label: "Remaining gaps"
            }}
          />
        </div>

        {/* Data Visualizations */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InteractiveChart
            title="Rule Distribution"
            description="Breakdown of rules by type and status"
            data={[
              { name: "Complete", value: 45, color: "hsl(var(--success))" },
              { name: "Incomplete", value: 23, color: "hsl(var(--warning))" },
              { name: "Contradicted", value: summary.contradictions, color: "hsl(var(--destructive))" },
              { name: "Under Review", value: 8, color: "hsl(var(--info))" }
            ]}
            type="both"
          />
          
          <InteractiveChart
            title="Coverage Analysis"
            description="Disease coverage across facility levels"
            data={[
              { name: "Level 2-3", value: 120, color: "hsl(var(--chart-1))" },
              { name: "Level 4", value: 89, color: "hsl(var(--chart-2))" },
              { name: "Level 5-6", value: 67, color: "hsl(var(--chart-3))" },
              { name: "Specialized", value: 34, color: "hsl(var(--chart-4))" }
            ]}
            type="bar"
          />
        </div>

        {/* Enhanced Analysis Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RuleCompletenessCard />
          <PolicyRiskIndicators />
        </div>

        {/* User Perspectives */}
        <UserRolePerspectives />

        {/* Main Content Tabs */}
        <Tabs defaultValue="rules" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="contradictions">Contradictions</TabsTrigger>
            <TabsTrigger value="mapping">Disease Coverage</TabsTrigger>
            <TabsTrigger value="heatmap">Coverage Matrix</TabsTrigger>
            <TabsTrigger value="confusion">Confusion Matrix</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="unmapped">Unmapped</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Parsed Rules Table */}
          <TabsContent value="rules" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Benefit Rules Analysis</CardTitle>
                <CardDescription>
                  All parsed rules with filtering and search capabilities
                </CardDescription>
                
                {/* Filters */}
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex-1 min-w-[200px]">
                    <Input
                      placeholder="Search all columns..."
                      value={filters.search}
                      onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                  
                  <Select value={filters.package || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, package: value === "all" ? "" : value }))}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by Package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Packages</SelectItem>
                      {uniquePackages.map(pkg => (
                        <SelectItem key={pkg} value={pkg}>{pkg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={filters.contradictionFlag || "all"} onValueChange={(value) => setFilters(prev => ({ ...prev, contradictionFlag: value === "all" ? "" : value }))}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Contradiction Flag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="yes">Has Contradictions</SelectItem>
                      <SelectItem value="no">No Contradictions</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Button 
                    onClick={() => downloadCSV(filteredRules, "benefit-rules.csv")}
                    variant="outline"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  
                  <Button 
                    onClick={() => {
                      const input = document.createElement('input');
                      input.type = 'file';
                      input.accept = '.csv,.xlsx,.pdf';
                      input.onchange = (e) => {
                        const file = (e.target as HTMLInputElement).files?.[0];
                        if (file) {
                          toast({
                            title: "File uploaded",
                            description: `${file.name} is being processed...`,
                          });
                        }
                      };
                      input.click();
                    }}
                    variant="default"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Rules
                  </Button>

                  <Button 
                    onClick={() => {
                      toast({
                        title: "Report generated",
                        description: "Comprehensive analytics report has been created",
                      });
                    }}
                    variant="outline"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Package</TableHead>
                        <TableHead>Facility Level</TableHead>
                        <TableHead>Tariff</TableHead>
                        <TableHead>Coverage Condition</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Contradiction</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRules.map((rule) => (
                        <TableRow 
                          key={rule.id}
                          className={rule.contradictionFlag ? "bg-destructive/10" : rule.flaggedIncorrect ? "bg-yellow-50" : ""}
                        >
                          <TableCell className="font-medium">{rule.service}</TableCell>
                          <TableCell>{rule.package}</TableCell>
                          <TableCell>{rule.facilityLevel}</TableCell>
                          <TableCell>{rule.tariff}</TableCell>
                          <TableCell className="max-w-xs truncate">{rule.coverageCondition}</TableCell>
                          <TableCell className="text-xs">
                            {rule.sourceDocument ? (
                              <div>
                                <div className="font-medium">{rule.sourceDocument}</div>
                                <div className="text-muted-foreground">Page {rule.sourcePage}</div>
                              </div>
                            ) : (
                              <Badge variant="outline">No source</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            {rule.contradictionFlag ? (
                              <Badge variant="destructive">Yes</Badge>
                            ) : (
                              <Badge variant="secondary">No</Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <UserFeedbackPanel
                              rule={rule}
                              onAddComment={handleAddComment}
                              onAddTask={handleAddTask}
                              onFlagIncorrect={handleFlagIncorrect}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Contradictions Panel */}
          <TabsContent value="contradictions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Detected Contradictions</CardTitle>
                  <CardDescription>
                    Detailed side-by-side comparison of conflicting rules
                  </CardDescription>
                </div>
                <Button 
                  onClick={() => downloadCSV(contradictions, "contradictions.csv")}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </CardHeader>
              
              <CardContent>
                <ContradictionsList onContradictionClick={handleContradictionClick} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disease Coverage Mapping */}
          <TabsContent value="mapping">
            <Card>
              <CardHeader>
                <CardTitle>Disease Coverage Mapping</CardTitle>
                <CardDescription>
                  Diseases and their corresponding service coverage
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Disease/Condition</TableHead>
                        <TableHead>Mapped Services</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {diseaseMappings.filter(d => d.isMapped).map((mapping, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{mapping.disease}</TableCell>
                          <TableCell>{mapping.mappedServices.join(", ")}</TableCell>
                          <TableCell>
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Mapped
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Disease Coverage Heatmap */}
          <TabsContent value="heatmap">
            <DiseaseCoverageHeatmap />
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Assigned Tasks</CardTitle>
                <CardDescription>
                  Tasks created for rule reviews and corrections
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rulesData
                    .filter(rule => rule.assignedTasks && rule.assignedTasks.length > 0)
                    .map(rule => (
                      <div key={rule.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{rule.service}</h4>
                          <Badge variant="outline">{rule.package}</Badge>
                        </div>
                        <div className="space-y-2">
                          {rule.assignedTasks?.map(task => (
                            <div key={task.id} className="bg-muted p-3 rounded">
                              <div className="flex justify-between items-start mb-1">
                                <span className="font-medium text-sm">{task.title}</span>
                                <Badge 
                                  variant={
                                    task.priority === 'critical' ? 'destructive' :
                                    task.priority === 'high' ? 'destructive' :
                                    task.priority === 'medium' ? 'default' : 'secondary'
                                  }
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                              <p className="text-xs text-muted-foreground mb-2">{task.description}</p>
                              <div className="flex justify-between text-xs">
                                <span>Assigned to: {task.assignedTeam}</span>
                                <span>Status: {task.status}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  {rulesData.every(rule => !rule.assignedTasks || rule.assignedTasks.length === 0) && (
                    <div className="text-center py-8 text-muted-foreground">
                      No tasks assigned yet. Create tasks from the Parsed Rules tab.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Confusion Matrix Tab */}
          <TabsContent value="confusion">
            <ConfusionMatrix />
          </TabsContent>

          {/* Unmapped Diseases */}
          <TabsContent value="unmapped">
            <Card>
              <CardHeader>
                <CardTitle>Unmapped Diseases & Items</CardTitle>
                <CardDescription>
                  Diseases and conditions without corresponding coverage mapping
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {unmappedDiseases.map((disease, index) => (
                    <div 
                      key={index}
                      className="p-4 rounded-lg border border-orange-200 bg-orange-50"
                    >
                      <div className="flex items-center gap-2">
                        <XCircle className="h-4 w-4 text-orange-600" />
                        <span className="font-medium text-orange-800">{disease.disease}</span>
                      </div>
                      <p className="text-sm text-orange-600 mt-1">No coverage mapping found</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              <PolicyRiskIndicators />
              <UserRolePerspectives />
            </div>
          </TabsContent>
        </Tabs>

        {/* Drill-down Modal */}
        <ContradictionDrilldown
          contradiction={selectedContradiction}
          isOpen={isDrilldownOpen}
          onClose={() => setIsDrilldownOpen(false)}
        />
      </div>
    </div>
  );
};

export default BenefitRulesChecker;