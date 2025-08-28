import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Flag, Plus, User } from "lucide-react";
import { BenefitRule, UserComment, Task } from "@/types/benefitRules";
import { useToast } from "@/hooks/use-toast";

interface UserFeedbackPanelProps {
  rule: BenefitRule;
  onAddComment: (ruleId: string, comment: Omit<UserComment, 'id'>) => void;
  onAddTask: (ruleId: string, task: Omit<Task, 'id'>) => void;
  onFlagIncorrect: (ruleId: string) => void;
}

const UserFeedbackPanel = ({ rule, onAddComment, onAddTask, onFlagIncorrect }: UserFeedbackPanelProps) => {
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [commentType, setCommentType] = useState<'feedback' | 'correction' | 'clarification'>('feedback');
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [assignedTeam, setAssignedTeam] = useState("");
  const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
  const { toast } = useToast();

  const handleAddComment = () => {
    if (!comment.trim()) return;
    
    onAddComment(rule.id, {
      userId: "current-user",
      userName: "Current User",
      comment: comment.trim(),
      timestamp: new Date(),
      type: commentType
    });
    
    setComment("");
    setIsCommentOpen(false);
    toast({
      title: "Comment added",
      description: "Your comment has been added to this rule."
    });
  };

  const handleAddTask = () => {
    if (!taskTitle.trim() || !assignedTeam.trim()) return;
    
    onAddTask(rule.id, {
      title: taskTitle.trim(),
      description: taskDescription.trim(),
      assignedTo: assignedTo.trim() || "Unassigned",
      assignedTeam: assignedTeam.trim(),
      priority,
      status: 'pending',
      createdAt: new Date(),
      ruleId: rule.id
    });
    
    setTaskTitle("");
    setTaskDescription("");
    setAssignedTo("");
    setAssignedTeam("");
    setIsTaskOpen(false);
    toast({
      title: "Task created",
      description: "A new task has been assigned to the team."
    });
  };

  const handleFlagIncorrect = () => {
    onFlagIncorrect(rule.id);
    toast({
      title: "Rule flagged",
      description: "This rule has been flagged as potentially incorrect."
    });
  };

  return (
    <div className="flex items-center gap-2">
      {rule.flaggedIncorrect && (
        <Badge variant="destructive" className="text-xs">
          <Flag className="h-3 w-3 mr-1" />
          Flagged
        </Badge>
      )}
      
      <Dialog open={isCommentOpen} onOpenChange={setIsCommentOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <MessageSquare className="h-4 w-4 mr-1" />
            Comment
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Comment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="comment-type">Comment Type</Label>
              <Select value={commentType} onValueChange={(value: any) => setCommentType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feedback">General Feedback</SelectItem>
                  <SelectItem value="correction">Correction Needed</SelectItem>
                  <SelectItem value="clarification">Needs Clarification</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="comment">Comment</Label>
              <Textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter your comment about this rule..."
                rows={4}
              />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsCommentOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddComment}>Add Comment</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isTaskOpen} onOpenChange={setIsTaskOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-1" />
            Create Task
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="task-title">Task Title</Label>
              <Input
                id="task-title"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="Enter task title..."
              />
            </div>
            <div>
              <Label htmlFor="task-description">Description</Label>
              <Textarea
                id="task-description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Describe what needs to be done..."
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigned-to">Assigned To</Label>
                <Input
                  id="assigned-to"
                  value={assignedTo}
                  onChange={(e) => setAssignedTo(e.target.value)}
                  placeholder="Person name (optional)"
                />
              </div>
              <div>
                <Label htmlFor="assigned-team">Team</Label>
                <Select value={assignedTeam} onValueChange={setAssignedTeam}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="policy-review">Policy Review Team</SelectItem>
                    <SelectItem value="medical-review">Medical Review Team</SelectItem>
                    <SelectItem value="data-quality">Data Quality Team</SelectItem>
                    <SelectItem value="compliance">Compliance Team</SelectItem>
                    <SelectItem value="actuarial">Actuarial Team</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsTaskOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTask}>Create Task</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Button variant="outline" size="sm" onClick={handleFlagIncorrect}>
        <Flag className="h-4 w-4 mr-1" />
        Flag Incorrect
      </Button>

      {rule.userComments && rule.userComments.length > 0 && (
        <Badge variant="secondary" className="text-xs">
          <User className="h-3 w-3 mr-1" />
          {rule.userComments.length} comments
        </Badge>
      )}
    </div>
  );
};

export default UserFeedbackPanel;