import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Keyboard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShortcutItem {
  keys: string[];
  description: string;
  action: () => void;
}

interface KeyboardShortcutsProps {
  onSearch?: () => void;
  onExport?: () => void;
  onUpload?: () => void;
  onToggleDarkMode?: () => void;
}

const KeyboardShortcuts = ({ onSearch, onExport, onUpload, onToggleDarkMode }: KeyboardShortcutsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const shortcuts: ShortcutItem[] = [
    { keys: ["⌘", "K"], description: "Open search", action: onSearch || (() => {}) },
    { keys: ["⌘", "E"], description: "Export data", action: onExport || (() => {}) },
    { keys: ["⌘", "U"], description: "Upload rules", action: onUpload || (() => {}) },
    { keys: ["⌘", "D"], description: "Toggle dark mode", action: onToggleDarkMode || (() => {}) },
    { keys: ["⌘", "?"], description: "Show shortcuts", action: () => setIsOpen(true) },
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearch?.();
        toast({ title: "Search activated", description: "Start typing to search..." });
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "e") {
        e.preventDefault();
        onExport?.();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "u") {
        e.preventDefault();
        onUpload?.();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "d") {
        e.preventDefault();
        onToggleDarkMode?.();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "/") {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearch, onExport, onUpload, onToggleDarkMode, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="transition-all duration-300 hover:scale-110">
          <Keyboard className="h-5 w-5" />
          <span className="sr-only">Keyboard shortcuts</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Keyboard className="h-5 w-5" />
            Keyboard Shortcuts
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-3 mt-4">
          {shortcuts.map((shortcut, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <span className="text-sm text-muted-foreground">{shortcut.description}</span>
              <div className="flex gap-1">
                {shortcut.keys.map((key, i) => (
                  <kbd
                    key={i}
                    className="px-2 py-1 text-xs font-semibold bg-background border rounded shadow-sm"
                  >
                    {key}
                  </kbd>
                ))}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KeyboardShortcuts;
