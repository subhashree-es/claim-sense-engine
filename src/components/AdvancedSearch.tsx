import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X } from "lucide-react";

interface SearchFilter {
  field: string;
  operator: string;
  value: string;
}

interface AdvancedSearchProps {
  onSearch: (query: string, filters: SearchFilter[]) => void;
}

const AdvancedSearch = ({ onSearch }: AdvancedSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<SearchFilter[]>([]);
  const [newFilter, setNewFilter] = useState<SearchFilter>({ field: "", operator: "", value: "" });

  const fields = [
    { value: "ruleDescription", label: "Rule Description" },
    { value: "tariff", label: "Tariff" },
    { value: "exclusion", label: "Exclusion" },
    { value: "sourceDocument", label: "Source Document" },
    { value: "coverage", label: "Coverage" }
  ];

  const operators = [
    { value: "contains", label: "Contains" },
    { value: "equals", label: "Equals" },
    { value: "not_equals", label: "Not Equals" },
    { value: "starts_with", label: "Starts With" },
    { value: "ends_with", label: "Ends With" }
  ];

  const addFilter = () => {
    if (newFilter.field && newFilter.operator && newFilter.value) {
      setFilters([...filters, newFilter]);
      setNewFilter({ field: "", operator: "", value: "" });
    }
  };

  const removeFilter = (index: number) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  const handleSearch = () => {
    onSearch(searchQuery, filters);
  };

  return (
    <Card className="glass-card border-border/40">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="h-5 w-5" />
          Advanced Search & Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Query */}
        <div className="flex gap-2">
          <Input
            placeholder="Search across all rules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
          <Button onClick={handleSearch} className="gradient-bg">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>

        {/* Filter Builder */}
        <div className="space-y-3">
          <h4 className="font-medium flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Advanced Filters
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Select value={newFilter.field} onValueChange={(value) => setNewFilter({...newFilter, field: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Field" />
              </SelectTrigger>
              <SelectContent>
                {fields.map(field => (
                  <SelectItem key={field.value} value={field.value}>
                    {field.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={newFilter.operator} onValueChange={(value) => setNewFilter({...newFilter, operator: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Operator" />
              </SelectTrigger>
              <SelectContent>
                {operators.map(op => (
                  <SelectItem key={op.value} value={op.value}>
                    {op.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Input
              placeholder="Value"
              value={newFilter.value}
              onChange={(e) => setNewFilter({...newFilter, value: e.target.value})}
            />

            <Button onClick={addFilter} variant="outline" className="w-full">
              Add Filter
            </Button>
          </div>

          {/* Active Filters */}
          {filters.length > 0 && (
            <div className="space-y-2">
              <h5 className="text-sm font-medium">Active Filters:</h5>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {fields.find(f => f.value === filter.field)?.label} {filter.operator} "{filter.value}"
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0 hover:bg-destructive/20"
                      onClick={() => removeFilter(index)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;