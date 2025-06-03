
import { Check, Flame, Trash2, MoreVertical, Edit } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Habit } from "@/pages/Index";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HabitCardProps {
  habit: Habit;
  onToggle: () => void;
  onDeleteClick: (habit: Habit) => void;
  onEditClick: (habit: Habit) => void;
}

const HabitCard = ({ habit, onToggle, onDeleteClick, onEditClick }: HabitCardProps) => {
  const progressPercentage = habit.completedToday ? 100 : 0;

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {/* Habit Icon/Image */}
          <div className={cn(
            "w-16 h-16 rounded-full bg-gradient-to-br flex items-center justify-center text-xl shadow-md overflow-hidden",
            habit.color
          )}>
            {habit.image ? (
              <img 
                src={habit.image} 
                alt={habit.name}
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              habit.icon
            )}
          </div>

          {/* Habit Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-800 truncate">{habit.name}</h3>
              
              {/* Menu Button */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 ml-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 bg-white shadow-lg border-gray-200">
                  <DropdownMenuItem 
                    className="text-gray-700 focus:text-gray-700 focus:bg-gray-50"
                    onClick={() => onEditClick(habit)}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="text-red-500 focus:text-red-500 focus:bg-red-50"
                    onClick={() => onDeleteClick(habit)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="flex items-center space-x-4 mt-1">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Flame className="h-4 w-4 text-orange-500" />
                <span>{habit.streak} day{habit.streak !== 1 ? 's' : ''}</span>
              </div>
              <div className="text-sm text-gray-500">
                {habit.totalCompleted} total
              </div>
            </div>
          </div>

          {/* Completion Button */}
          <Button
            onClick={onToggle}
            size="sm"
            className={cn(
              "h-10 w-10 rounded-full p-0 transition-all duration-300 shadow-md",
              habit.completedToday
                ? "bg-gradient-to-r from-green-400 to-emerald-400 hover:from-green-500 hover:to-emerald-500 text-white"
                : "bg-gray-100 hover:bg-gray-200 text-gray-400 border-2 border-gray-200"
            )}
          >
            <Check 
              className={cn(
                "h-5 w-5 transition-transform duration-300",
                habit.completedToday ? "scale-100" : "scale-75"
              )} 
            />
          </Button>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className={cn(
                "h-full bg-gradient-to-r transition-all duration-500 ease-out",
                habit.color,
                habit.completedToday ? "w-full" : "w-0"
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HabitCard;
