"use client";

import { useState, useEffect } from "react";
import { getStaffList, getTasks, toggleTaskCompletion, Task } from "@/app/actions/tasks";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, CheckCircle2, Circle, Calendar as CalendarIcon } from "lucide-react";
import { CalendarCustom } from "@/components/ui/calendar-custom";

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

export default function StaffDashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentMonthTasks, setCurrentMonthTasks] = useState<Task[]>([]);
  const [currentStaffId, setCurrentStaffId] = useState<string | null>(null);
  const [currentStaffName, setCurrentStaffName] = useState<string | null>(null);
  
  const [staffList, setStaffList] = useState<Staff[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get logged-in user from cookies
    const cookies = document.cookie.split(';');
    let sId = null;
    let sName = null;
    
    cookies.forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name === 'staff_id') sId = decodeURIComponent(value);
      if (name === 'staff_name') sName = decodeURIComponent(value);
    });
    
    setCurrentStaffId(sId);
    setCurrentStaffName(sName);

    async function loadData() {
      setLoading(true);
      const staff = await getStaffList();
      setStaffList(staff);
      
      // Fetch all tasks for date statuses (In a real app, fetch only current month)
      const allTasks = await getTasks();
      setCurrentMonthTasks(allTasks);
      
      setLoading(false);
    }
    loadData();
  }, []);

  const handleToggleTask = async (taskId: string, currentStatus: boolean) => {
    // Optimistic update
    setCurrentMonthTasks(currentMonthTasks.map(t => t.id === taskId ? { ...t, is_completed: !currentStatus } : t));
    
    const result = await toggleTaskCompletion(taskId, !currentStatus);
    if (!result.success) {
      // Revert if failed
      setCurrentMonthTasks(currentMonthTasks.map(t => t.id === taskId ? { ...t, is_completed: currentStatus } : t));
      alert("Failed to update task status.");
    }
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[50vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  // Filter tasks for the selected date using local timezone
  const yyyy = selectedDate.getFullYear();
  const mm = String(selectedDate.getMonth() + 1).padStart(2, '0');
  const dd = String(selectedDate.getDate()).padStart(2, '0');
  const selectedDateStr = `${yyyy}-${mm}-${dd}`;
  const selectedDayTasks = currentMonthTasks.filter(t => t.date === selectedDateStr);

  const myTasks = selectedDayTasks.filter(t => t.staff_id === currentStaffId);
  const myCompletedCount = myTasks.filter(t => t.is_completed).length;
  const myPercentage = myTasks.length > 0 ? (myCompletedCount / myTasks.length) * 100 : 0;

  const otherStaff = staffList.filter(s => s.id !== currentStaffId);

  // Calculate date statuses for the calendar
  const dateStatus: Record<string, "red" | "green"> = {};
  
  // Group tasks by date for the current staff member
  const myAllTasks = currentMonthTasks.filter(t => t.staff_id === currentStaffId);
  const tasksByDate: Record<string, Task[]> = {};
  
  myAllTasks.forEach(task => {
    if (!tasksByDate[task.date]) {
      tasksByDate[task.date] = [];
    }
    tasksByDate[task.date].push(task);
  });
  
  // Determine status for each date
  Object.keys(tasksByDate).forEach(dateStr => {
    const dayTasks = tasksByDate[dateStr];
    const isAllCompleted = dayTasks.every(t => t.is_completed);
    dateStatus[dateStr] = isAllCompleted ? "green" : "red";
  });

  return (
    <div className="w-full max-w-none space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        {/* Left Side: Welcome & Calendar */}
        <div className="w-full lg:w-[450px] flex-shrink-0 space-y-8">
          <div className="border-b border-border pb-6">
            <h1 className="text-4xl font-black tracking-tight">Welcome back, {currentStaffName}</h1>
            <p className="text-muted-foreground mt-2 font-medium flex items-center gap-2">
              <CalendarIcon className="h-4 w-4" />
              Showing tasks for {selectedDate.toLocaleDateString()}
            </p>
          </div>
          
          <CalendarCustom selectedDate={selectedDate} onSelectDate={setSelectedDate} dateStatus={dateStatus} />
        </div>

        {/* Right Side: Tasks & Team Overview */}
        <div className="flex-1 w-full space-y-12">
          {/* My Tasks Section */}
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              My Assigned Tasks
            </h2>
            <Card className="bg-card border-border shadow-md overflow-hidden rounded-3xl">
              <CardContent className="p-6 md:p-8">
                {myTasks.length === 0 ? (
                  <div className="text-center py-12 bg-secondary/30 rounded-2xl border border-dashed border-border">
                    <p className="text-muted-foreground font-medium">No tasks assigned for this date. Great job!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {myTasks.map(task => (
                      <button
                        key={task.id}
                        onClick={() => handleToggleTask(task.id, task.is_completed)}
                        className="w-full flex items-center gap-4 p-5 rounded-2xl bg-secondary/50 border border-border hover:bg-secondary hover:shadow-sm transition-all group text-left"
                      >
                        {task.is_completed ? (
                          <CheckCircle2 className="h-7 w-7 text-emerald-500 flex-shrink-0" />
                        ) : (
                          <Circle className="h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                        )}
                        <span className={`flex-1 break-words break-all text-lg font-semibold leading-relaxed ${task.is_completed ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                          {task.description}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
                
                <div className="mt-8 pt-6 border-t border-border">
                  <ProgressBar percentage={myPercentage} />
                </div>
              </CardContent>
            </Card>
          </section>

          {/* Other Staff Section */}
          <section>
            <h2 className="text-xl font-bold mb-6 text-muted-foreground">Team Overview</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {otherStaff.map(staff => {
                const staffTasks = selectedDayTasks.filter(t => t.staff_id === staff.id);
                const completedCount = staffTasks.filter(t => t.is_completed).length;
                const percentage = staffTasks.length > 0 ? (completedCount / staffTasks.length) * 100 : 0;
                
                return (
                  <Card key={staff.id} className="bg-card border-border shadow-sm rounded-3xl">
                    <CardHeader className="pb-3 border-b border-border/50">
                      <CardTitle className="text-lg flex justify-between items-center text-foreground">
                        {staff.name}
                        <span className="text-xs font-medium bg-secondary text-secondary-foreground px-3 py-1 rounded-full">
                          {completedCount} / {staffTasks.length} Done
                        </span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="space-y-3 mb-6 min-h-[4rem]">
                        {staffTasks.length === 0 ? (
                          <p className="text-sm text-muted-foreground italic">No tasks today.</p>
                        ) : (
                          staffTasks.slice(0, 3).map(task => (
                            <div key={task.id} className="flex items-start gap-3 text-sm text-foreground">
                              <div className={`mt-1.5 h-2 w-2 rounded-full flex-shrink-0 ${task.is_completed ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                              <span className={`flex-1 break-words break-all leading-relaxed ${task.is_completed ? 'line-through text-muted-foreground' : ''}`}>{task.description}</span>
                            </div>
                          ))
                        )}
                        {staffTasks.length > 3 && (
                          <p className="text-xs text-muted-foreground italic font-medium">+{staffTasks.length - 3} more tasks</p>
                        )}
                      </div>
                      <ProgressBar percentage={percentage} />
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
