import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Download, FileSpreadsheet, FileText, FileJson, Printer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ExportOptionsProps {
  data: any[];
  filename?: string;
}

const ExportOptions = ({ data, filename = "export" }: ExportOptionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [format, setFormat] = useState("csv");
  const [includeHeaders, setIncludeHeaders] = useState(true);
  const [selectedColumns, setSelectedColumns] = useState<string[]>([]);
  const { toast } = useToast();

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const handleExport = () => {
    const columnsToExport = selectedColumns.length > 0 ? selectedColumns : columns;
    const filteredData = data.map(row => {
      const filtered: any = {};
      columnsToExport.forEach(col => {
        filtered[col] = row[col];
      });
      return filtered;
    });

    let content = "";
    let mimeType = "";
    let extension = "";

    switch (format) {
      case "csv":
        content = [
          includeHeaders ? columnsToExport.join(",") : "",
          ...filteredData.map(row => columnsToExport.map(col => `"${row[col] || ""}"`).join(","))
        ].filter(Boolean).join("\n");
        mimeType = "text/csv";
        extension = "csv";
        break;
      case "json":
        content = JSON.stringify(filteredData, null, 2);
        mimeType = "application/json";
        extension = "json";
        break;
      case "txt":
        content = filteredData.map(row => 
          columnsToExport.map(col => `${col}: ${row[col] || ""}`).join("\n")
        ).join("\n\n---\n\n");
        mimeType = "text/plain";
        extension = "txt";
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename}.${extension}`;
    a.click();
    window.URL.revokeObjectURL(url);

    toast({
      title: "Export successful",
      description: `${filteredData.length} records exported as ${format.toUpperCase()}`,
    });
    setIsOpen(false);
  };

  const handlePrint = () => {
    window.print();
    toast({
      title: "Print dialog opened",
      description: "Configure your print settings",
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Options
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-4">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Format</Label>
            <RadioGroup value={format} onValueChange={setFormat} className="grid grid-cols-3 gap-3">
              <div>
                <RadioGroupItem value="csv" id="csv" className="peer sr-only" />
                <Label
                  htmlFor="csv"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                >
                  <FileSpreadsheet className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">CSV</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="json" id="json" className="peer sr-only" />
                <Label
                  htmlFor="json"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                >
                  <FileJson className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">JSON</span>
                </Label>
              </div>
              <div>
                <RadioGroupItem value="txt" id="txt" className="peer sr-only" />
                <Label
                  htmlFor="txt"
                  className="flex flex-col items-center justify-between rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-all"
                >
                  <FileText className="h-6 w-6 mb-2" />
                  <span className="text-sm font-medium">Text</span>
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Options */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="headers"
              checked={includeHeaders}
              onCheckedChange={(checked) => setIncludeHeaders(checked as boolean)}
            />
            <Label htmlFor="headers" className="text-sm">Include column headers</Label>
          </div>

          {/* Column Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Select Columns (leave empty for all)</Label>
            <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto p-2 border rounded-lg">
              {columns.slice(0, 10).map(col => (
                <div key={col} className="flex items-center space-x-2">
                  <Checkbox
                    id={col}
                    checked={selectedColumns.includes(col)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedColumns([...selectedColumns, col]);
                      } else {
                        setSelectedColumns(selectedColumns.filter(c => c !== col));
                      }
                    }}
                  />
                  <Label htmlFor={col} className="text-xs truncate">{col}</Label>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={handleExport} className="flex-1 gap-2">
              <Download className="h-4 w-4" />
              Export {data.length} Records
            </Button>
            <Button variant="outline" onClick={handlePrint} className="gap-2">
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExportOptions;
