"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CalendarProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  dateStatus?: Record<string, "red" | "green">;
}

export function CalendarCustom({ selectedDate, onSelectDate, dateStatus }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = React.useState(new Date(selectedDate));

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonthJS = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  // Adjust so Monday is 0 and Sunday is 6
  const firstDayOfMonth = (firstDayOfMonthJS + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div className="bg-[#0b0c10] border border-white/5 p-6 rounded-3xl shadow-2xl w-full max-w-sm lg:max-w-[450px] lg:p-8">
      <div className="flex items-center justify-between mb-8 bg-[#13161c] rounded-2xl p-2 px-4 border border-white/5">
        <button className="h-8 w-8 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors" onClick={handlePrevMonth}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-white font-bold text-lg tracking-tight">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h2>
        <button className="h-8 w-8 flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors" onClick={handleNextMonth}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-4 border-b border-white/5 pb-4">
        {daysOfWeek.map(day => (
          <div key={day} className="text-center text-xs font-semibold text-slate-400">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="h-10 w-full" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = i + 1;
          const isSelected = selectedDate.getDate() === date && selectedDate.getMonth() === currentMonth.getMonth() && selectedDate.getFullYear() === currentMonth.getFullYear();
          const isToday = new Date().getDate() === date && new Date().getMonth() === currentMonth.getMonth() && new Date().getFullYear() === currentMonth.getFullYear();
          
          const dateStr = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}-${String(date).padStart(2, '0')}`;
          const status = dateStatus?.[dateStr];
          
          let colorClass = "text-white hover:bg-white/5";
          
          if (status === "green") {
            colorClass = "bg-[#112d23] text-[#34d399] border border-[#1b4334]";
          } else if (status === "red") {
            colorClass = "bg-[#2d161a] text-[#f43f5e] border border-[#4a242c]";
          } else if (isSelected) {
            colorClass = "bg-white/10 text-white shadow-lg";
          } else if (isToday) {
            colorClass = "text-white font-bold underline decoration-white/30 underline-offset-4";
          }

          return (
            <button
              key={date}
              onClick={() => onSelectDate(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), date))}
              className={`aspect-square w-full rounded-2xl flex items-center justify-center text-sm font-semibold transition-all duration-200 ${colorClass}`}
            >
              {date}
            </button>
          );
        })}
      </div>
    </div>
  );
}
