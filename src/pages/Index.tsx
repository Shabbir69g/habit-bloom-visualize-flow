
import { useState, useEffect } from "react";
import { Plus, Flame, Target, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HabitCard from "@/components/HabitCard";
import AddHabitModal from "@/components/AddHabitModal";
import StatsCard from "@/components/StatsCard";

export interface Habit {
  id: string;
  name: string;
  icon: string;
  color: string;
  streak: number;
  completedToday: boolean;
  totalCompleted: number;
  createdAt: Date;
  image?: string;
}

const Index = () => {
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: "1",
      name: "Drink Water",
      icon: "💧",
      color: "from-blue-400 to-cyan-400",
      streak: 0,
      completedToday: false,
      totalCompleted: 0,
      createdAt: new Date(),
      image: "/3d-rendering-young-tiger.jpg",
    },
    {
      id: "2",
      name: "Exercise",
      icon: "💪",
      color: "from-orange-400 to-red-400",
      streak: 0,
      completedToday: false,
      totalCompleted: 0,
      createdAt: new Date(),
      image: "/cartoon-animated-penguin-with-headphones.jpg",
    },
    {
      id: "3",
      name: "Read Books",
      icon: "📚",
      color: "from-purple-400 to-pink-400",
      streak: 0,
      completedToday: false,
      totalCompleted: 0,
      createdAt: new Date(),
    },
  ]);
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const wasCompleted = habit.completedToday;
        return {
          ...habit,
          completedToday: !wasCompleted,
          streak: !wasCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          totalCompleted: !wasCompleted ? habit.totalCompleted + 1 : habit.totalCompleted - 1,
        };
      }
      return habit;
    }));
  };

  const addHabit = (habit: Omit<Habit, "id" | "streak" | "completedToday" | "totalCompleted" | "createdAt">) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString(),
      streak: 0,
      completedToday: false,
      totalCompleted: 0,
      createdAt: new Date(),
    };
    setHabits(prev => [...prev, newHabit]);
  };

  const completedToday = habits.filter(h => h.completedToday).length;
  const totalStreak = habits.reduce((sum, h) => sum + h.streak, 0);
  const bestStreak = Math.max(...habits.map(h => h.streak), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Habit Tracker
              </h1>
              <p className="text-sm text-gray-600">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              size="sm"
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-0 rounded-full h-10 w-10 p-0"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mt-6 mb-6">
          <StatsCard
            icon={<Target className="h-5 w-5" />}
            label="Today"
            value={`${completedToday}/${habits.length}`}
            gradient="from-green-400 to-emerald-400"
          />
          <StatsCard
            icon={<Flame className="h-5 w-5" />}
            label="Best Streak"
            value={bestStreak.toString()}
            gradient="from-orange-400 to-red-400"
          />
          <StatsCard
            icon={<TrendingUp className="h-5 w-5" />}
            label="Total Streaks"
            value={totalStreak.toString()}
            gradient="from-blue-400 to-cyan-400"
          />
        </div>

        {/* Habits List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Your Habits</h2>
            <span className="text-sm text-gray-500">{habits.length} habits</span>
          </div>
          
          {habits.map((habit, index) => (
            <div
              key={habit.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <HabitCard
                habit={habit}
                onToggle={() => toggleHabit(habit.id)}
              />
            </div>
          ))}

          {habits.length === 0 && (
            <Card className="border-dashed border-2 border-gray-200 bg-white/50">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No habits yet</h3>
                <p className="text-gray-500 text-center mb-4">
                  Start building better habits by adding your first one!
                </p>
                <Button
                  onClick={() => setIsAddModalOpen(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Habit
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <AddHabitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={addHabit}
      />
    </div>
  );
};

export default Index;
