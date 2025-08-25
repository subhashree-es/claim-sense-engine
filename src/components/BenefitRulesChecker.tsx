import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Search, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { benefitRules, contradictions, diseaseMappings } from "@/data/benefitRulesData";
import { FilterState } from "@/types/benefitRules";

const BenefitRulesChecker = () => {
  const [filters, setFilters] = useState<FilterState>({
    service: "",
    package: "",
    contradictionFlag: "",
    search: ""
  });

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
    return benefitRules.filter(rule => {
      const matchesService = !filters.service || rule.service.toLowerCase().includes(filters.service.toLowerCase());
      const matchesPackage = !filters.package || rule.package === filters.package;
      const matchesContradiction = !filters.contradictionFlag || 
        (filters.contradictionFlag === "yes" && rule.contradictionFlag) ||
        (filters.contradictionFlag === "no" && !rule.contradictionFlag);
      const matchesSearch = !filters.search || 
        Object.values(rule).some(value => 
          value.toString().toLowerCase().includes(filters.search.toLowerCase())
        );
      
      return matchesService && matchesPackage && matchesContradiction && matchesSearch;
    });
  }, [filters]);

  // Unique packages for filter
  const uniquePackages = useMemo(() => {
    return Array.from(new Set(benefitRules.map(rule => rule.package)));
  }, []);

  // Unmapped diseases
  const unmappedDiseases = useMemo(() => {
    return diseaseMappings.filter(d => !d.isMapped);
  }, []);

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
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-foreground">Benefit Rules Checker</h1>
          <p className="text-muted-foreground">
            Analyze healthcare benefit packages for contradictions and coverage gaps
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Rules</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{summary.totalRules}</div>
              <p className="text-xs text-muted-foreground">Parsed from documents</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Contradictions</CardTitle>
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-destructive">{summary.contradictions}</div>
              <p className="text-xs text-muted-foreground">Rules flagged</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Mapped Diseases</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{summary.diseasesMapped}</div>
              <p className="text-xs text-muted-foreground">With coverage</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Unmapped Diseases</CardTitle>
              <XCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">{summary.diseasesUnmapped}</div>
              <p className="text-xs text-muted-foreground">No coverage found</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="rules" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="rules">Parsed Rules</TabsTrigger>
            <TabsTrigger value="contradictions">Contradictions</TabsTrigger>
            <TabsTrigger value="mapping">Disease Coverage</TabsTrigger>
            <TabsTrigger value="unmapped">Unmapped Items</TabsTrigger>
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
                  
                  <Select value={filters.package} onValueChange={(value) => setFilters(prev => ({ ...prev, package: value }))}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Filter by Package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Packages</SelectItem>
                      {uniquePackages.map(pkg => (
                        <SelectItem key={pkg} value={pkg}>{pkg}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select value={filters.contradictionFlag} onValueChange={(value) => setFilters(prev => ({ ...prev, contradictionFlag: value }))}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Contradiction Flag" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All</SelectItem>
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
                        <TableHead>Contradiction</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRules.map((rule) => (
                        <TableRow 
                          key={rule.id}
                          className={rule.contradictionFlag ? "bg-destructive/10" : ""}
                        >
                          <TableCell className="font-medium">{rule.service}</TableCell>
                          <TableCell>{rule.package}</TableCell>
                          <TableCell>{rule.facilityLevel}</TableCell>
                          <TableCell>{rule.tariff}</TableCell>
                          <TableCell className="max-w-xs truncate">{rule.coverageCondition}</TableCell>
                          <TableCell>
                            {rule.contradictionFlag ? (
                              <Badge variant="destructive">Yes</Badge>
                            ) : (
                              <Badge variant="secondary">No</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Contradictions Panel */}
          <TabsContent value="contradictions">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Detected Contradictions</CardTitle>
                  <CardDescription>
                    Rules that conflict with each other or contain inconsistencies
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
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Rule A</TableHead>
                        <TableHead>Rule B</TableHead>
                        <TableHead>Reason</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {contradictions.map((contradiction) => (
                        <TableRow key={contradiction.id}>
                          <TableCell className="font-medium">{contradiction.service}</TableCell>
                          <TableCell>{contradiction.rowALevels}</TableCell>
                          <TableCell>{contradiction.rowBLevels}</TableCell>
                          <TableCell>{contradiction.reason}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
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
        </Tabs>
      </div>
    </div>
  );
};

export default BenefitRulesChecker;