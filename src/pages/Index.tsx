
import { useState } from "react";
import { Plus, Flame, Target, Calendar, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import HabitCard from "@/components/HabitCard";
import AddHabitModal from "@/components/AddHabitModal";
import StatsCard from "@/components/StatsCard";
import { useHabits } from "@/hooks/useHabits";

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
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Use our custom hook for habit management with local storage
  const { habits, toggleHabit, addHabit, stats } = useHabits();
  
  // Destructure stats for easier access
  const { completedToday, totalHabits, totalStreak, bestStreak } = stats;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Scattered Background Images - Animals and Flowers */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Animals */}
        <img 
          src="/3d-rendering-young-tiger.jpg" 
          alt="" 
          className="absolute top-10 right-4 w-16 h-16 rounded-full opacity-10 floating-1"
        />
        <img 
          src="/cartoon-animated-penguin-with-headphones.jpg" 
          alt="" 
          className="absolute top-32 left-2 w-12 h-12 rounded-full opacity-15 floating-2"
        />
        <img 
          src="/photo-1618160702438-9b02ab6515c9.jpg" 
          alt="" 
          className="absolute top-1/3 right-8 w-14 h-14 rounded-full opacity-8 floating-3"
        />
        <img 
          src="/photo-1582562124811-c09040d0a901.jpg" 
          alt="" 
          className="absolute bottom-1/3 left-4 w-18 h-18 rounded-full opacity-12 floating-1"
        />
        <img 
          src="/photo-1466721591366-2d5fba72006d.jpg" 
          alt="" 
          className="absolute bottom-20 right-6 w-16 h-16 rounded-full opacity-10 floating-2"
        />
        <img 
          src="/photo-1535268647677-300dbf3d78d1.jpg" 
          alt="" 
          className="absolute top-1/2 left-1 w-12 h-12 rounded-full opacity-15 floating-3"
        />
        <img 
          src="/photo-1485833077593-4278bba3f11f.jpg" 
          alt="" 
          className="absolute bottom-40 right-2 w-14 h-14 rounded-full opacity-8 floating-1"
        />
        
        {/* Flowers - Adding ALL available flower images */}
        <img 
          src="/photo-1465146344425-f00d5f5c8f07.jpg" 
          alt="" 
          className="absolute top-16 left-8 w-12 h-12 rounded-full opacity-12 floating-2"
        />
        <img 
          src="/photo-1490750967868-88aa4486c946.jpg" 
          alt="" 
          className="absolute top-48 right-3 w-10 h-10 rounded-full opacity-8 floating-3"
        />
        <img 
          src="/photo-1524593689594-aae2f26b75ab.jpg" 
          alt="" 
          className="absolute top-2/3 left-6 w-14 h-14 rounded-full opacity-15 floating-1"
        />
        <img 
          src="/photo-1441974231531-c6227db76b6e.jpg" 
          alt="" 
          className="absolute bottom-52 left-1 w-11 h-11 rounded-full opacity-10 floating-3"
        />
        <img 
          src="/photo-1507003211169-0a1dd7228f2d.jpg" 
          alt="" 
          className="absolute top-80 right-1 w-13 h-13 rounded-full opacity-12 floating-2"
        />
        <img 
          src="/photo-1416879595882-3373a0480b5b.jpg" 
          alt="" 
          className="absolute bottom-60 right-4 w-10 h-10 rounded-full opacity-8 floating-1"
        />
        <img 
          src="/photo-1502082553048-f009c37129b9.jpg" 
          alt="" 
          className="absolute top-24 left-0.5 w-12 h-12 rounded-full opacity-15 floating-3"
        />
        <img 
          src="/photo-1518709268805-4e9042af2176.jpg" 
          alt="" 
          className="absolute bottom-32 left-8 w-11 h-11 rounded-full opacity-10 floating-2"
        />
        <img 
          src="/photo-1426604966848-d7adac402bff.jpg" 
          alt="" 
          className="absolute top-44 left-4 w-9 h-9 rounded-full opacity-12 floating-1"
        />
        <img 
          src="/photo-1603001570780-e1c7c8f95e9a.jpg" 
          alt="" 
          className="absolute bottom-80 right-8 w-13 h-13 rounded-full opacity-8 floating-3"
        />
        <img 
          src="/photo-1424847651672-bf20a4b0982b.jpg" 
          alt="" 
          className="absolute top-60 right-7 w-10 h-10 rounded-full opacity-15 floating-2"
        />
        <img 
          src="/photo-1469474968028-56623f02e42e.jpg" 
          alt="" 
          className="absolute bottom-44 left-3 w-12 h-12 rounded-full opacity-10 floating-1"
        />
        
        {/* Additional flower images scattered more visibly */}
        <img 
          src="/photo-1490750967868-88aa4486c946.jpg" 
          alt="" 
          className="absolute top-20 right-12 w-16 h-16 rounded-full opacity-20 floating-1"
        />
        <img 
          src="/photo-1524593689594-aae2f26b75ab.jpg" 
          alt="" 
          className="absolute bottom-1/4 right-3 w-15 h-15 rounded-full opacity-18 floating-2"
        />
        <img 
          src="/photo-1465146344425-f00d5f5c8f07.jpg" 
          alt="" 
          className="absolute top-1/4 left-2 w-13 h-13 rounded-full opacity-16 floating-3"
        />
        <img 
          src="/photo-1441974231531-c6227db76b6e.jpg" 
          alt="" 
          className="absolute bottom-16 left-6 w-14 h-14 rounded-full opacity-14 floating-1"
        />
        <img 
          src="/photo-1507003211169-0a1dd7228f2d.jpg" 
          alt="" 
          className="absolute top-36 right-5 w-12 h-12 rounded-full opacity-17 floating-2"
        />
      </div>

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40 relative">
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

      <div className="max-w-md mx-auto px-4 pb-6 relative z-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-3 mt-6 mb-6">
          <StatsCard
            icon={<Target className="h-5 w-5" />}
            label="Today"
            value={`${completedToday}/${totalHabits}`}
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
            <span className="text-sm text-gray-500">{totalHabits} habits</span>
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
