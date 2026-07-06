"use client";

import { useState, useEffect } from "react";
import { CalendarCustom } from "@/components/ui/calendar-custom";
import { getStaffList, createTask, updateTaskDescription, deleteTask, Task, getTasks } from "@/app/actions/tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Loader2, Pencil, Trash2 } from "lucide-react";

type Staff = { id: string; name: string };

function ProgressBar({ percentage }: { percentage: number }) {
  return (
    <div className="w-full mt-4">
      <div className="flex justify-between text-xs font-bold mb-1.5">
        <span className="text-muted-foreground uppercase tracking-wider">Completion</span>
        <span className="text-primary">{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
        <div 
          className="h-full bg-primary transition-all duration-500 ease-out" 
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function StaffTasksPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [allTasks, setAllTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);
  const [taskDescription, setTaskDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const staff = await getStaffList();
      setStaffList(staff);
      
      const tasksData = await getTasks();
      setAllTasks(tasksData);
      setLoading(false);
    }
    loadData();
  }, []);

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStaff || !taskDescription.trim()) return;

    setIsSubmitting(true);
    
    if (editingTaskId) {
      const result = await updateTaskDescription(editingTaskId, taskDescription);
      if (result.success) {
        setAllTasks(allTasks.map(t => t.id === editingTaskId ? { ...t, description: taskDescription } : t));
        setIsDialogOpen(false);
      } else {
        alert(result.error || "Failed to update task");
      }
    } else {
      const yyyy = selectedDate.getFullYear();
      const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
      const dd = String(selectedDate.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;
      
      const result = await createTask(selectedStaff.id, dateStr, taskDescription);
      
      if (result.success && result.task) {
        setAllTasks([...allTasks, result.task]);
        setIsDialogOpen(false);
      } else {
        alert(result.error || "Failed to create task");
      }
    }
    
    setIsSubmitting(false);
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    
    const result = await deleteTask(taskId);
    if (result.success) {
      setAllTasks(allTasks.filter(t => t.id !== taskId));
    } else {
      alert(result.error || "Failed to delete task");
    }
  };

  const openDialogForStaff = (staff: Staff) => {
    setSelectedStaff(staff);
    setTaskDescription("");
    setEditingTaskId(null);
    setIsDialogOpen(true);
  };

  const openEditDialog = (task: Task) => {
    setSelectedStaff(staffList.find(s => s.id === task.staff_id) || null);
    setTaskDescription(task.description);
    setEditingTaskId(task.id);
    setIsDialogOpen(true);
  };

  // Calculate date statuses for the calendar
  const dateStatus: Record<string, "red" | "green"> = {};
  const tasksByDate: Record<string, Task[]> = {};
  
  allTasks.forEach(task => {
    if (!tasksByDate[task.date]) {
      tasksByDate[task.date] = [];
    }
    tasksByDate[task.date].push(task);
  });
  
  Object.keys(tasksByDate).forEach(dateStr => {
    const dayTasks = tasksByDate[dateStr];
    const isAllCompleted = dayTasks.every(t => t.is_completed);
    dateStatus[dateStr] = isAllCompleted ? "green" : "red";
  });

  // Filter tasks for the selected date using local timezone
  const yyyy = selectedDate.getFullYear();
  const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const dd = String(selectedDate.getDate()).padStart(2, '0');
  const selectedDateStr = `${yyyy}-${mm}-${dd}`;
  const selectedDayTasks = allTasks.filter(t => t.date === selectedDateStr);

  return (
    <div className="w-full max-w-none space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Side: Header & Calendar */}
        <div className="w-full lg:w-[450px] flex-shrink-0 space-y-8">
          <div className="border-b border-border pb-6">
            <h1 className="text-4xl font-black tracking-tight">Staff Task Assignment</h1>
            <p className="text-muted-foreground mt-2 font-medium">Select a date and assign tasks to staff members.</p>
          </div>
          <CalendarCustom selectedDate={selectedDate} onSelectDate={setSelectedDate} dateStatus={dateStatus} />
        </div>

        {/* Right Side: Staff Cards */}
        <div className="flex-1 w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            staffList.map((staff) => {
              const staffTasks = selectedDayTasks.filter(t => t.staff_id === staff.id);
              const completedCount = staffTasks.filter(t => t.is_completed).length;
              const percentage = staffTasks.length > 0 ? (completedCount / staffTasks.length) * 100 : 0;
              
              return (
                <Card key={staff.id} className="bg-card border-border shadow-sm rounded-3xl overflow-hidden flex flex-col">
                  <CardHeader className="pb-3 border-b border-border/50">
                    <CardTitle className="flex justify-between items-center text-foreground">
                      <span>{staff.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                          {completedCount} / {staffTasks.length} Done
                        </span>
                        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-xs border border-border">
                          {staff.name.charAt(0)}
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 pt-6 flex-1 flex flex-col">
                    <div className="space-y-3 flex-1">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                        Tasks for {selectedDate.toLocaleDateString()}
                      </h4>
                      {staffTasks.length === 0 ? (
                        <div className="text-center py-6 bg-secondary/30 rounded-2xl border border-dashed border-border">
                          <p className="text-muted-foreground font-medium text-sm">No tasks assigned.</p>
                        </div>
                      ) : (
                        <ul className="space-y-3">
                          {staffTasks.map(task => (
                            <li key={task.id} className="text-sm p-4 rounded-2xl bg-secondary/50 border border-border flex items-start gap-3 group relative pr-16">
                              <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${task.is_completed ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              <span className={`flex-1 break-words break-all leading-relaxed ${task.is_completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                                {task.description}
                              </span>
                              <div className="absolute right-3 top-3 opacity-0 group-hover:opacity-100 flex items-center gap-1 transition-opacity">
                                <button 
                                  onClick={() => openEditDialog(task)}
                                  className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                                  title="Edit Task"
                                >
                                  <Pencil className="h-4 w-4" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteTask(task.id)}
                                  className="h-7 w-7 rounded-md flex items-center justify-center text-muted-foreground hover:bg-rose-500/20 hover:text-rose-500 transition-colors"
                                  title="Delete Task"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    
                    <div className="mt-2 mb-6">
                      <ProgressBar percentage={percentage} />
                    </div>
                    
                    <Button 
                      onClick={() => openDialogForStaff(staff)} 
                      className="w-full gap-2 rounded-xl mt-auto"
                      variant="outline"
                    >
                      <PlusCircle className="h-4 w-4" />
                      Assign New Task
                    </Button>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Task Creation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTaskId ? 'Edit Task' : `Assign Task to ${selectedStaff?.name}`}</DialogTitle>
            <DialogDescription>
              {editingTaskId 
                ? "Update the description of this task." 
                : `This task will be assigned for ${selectedDate.toLocaleDateString()}.`}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitTask}>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task">Task Description</Label>
                <Input
                  id="task"
                  placeholder="e.g. Complete the weekly report"
                  value={taskDescription}
                  onChange={(e) => setTaskDescription(e.target.value)}
                  autoFocus
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting || !taskDescription.trim()}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {editingTaskId ? 'Save Changes' : 'Assign Task'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
