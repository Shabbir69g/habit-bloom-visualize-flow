import { useState, useEffect } from 'react';
import useLocalStorage from './useLocalStorage';
import type { Habit } from '@/pages/Index';

// Default habits to show when the app is first used
const defaultHabits: Habit[] = [
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
];

// Function to check if it's a new day compared to the last saved date
const isNewDay = (lastSavedDate: string | null): boolean => {
  if (!lastSavedDate) return false;
  
  const today = new Date();
  const lastDate = new Date(lastSavedDate);
  
  return (
    today.getFullYear() !== lastDate.getFullYear() ||
    today.getMonth() !== lastDate.getMonth() ||
    today.getDate() !== lastDate.getDate()
  );
};

export const useHabits = () => {
  // Use our custom localStorage hook to persist habits
  const [habits, setHabits] = useLocalStorage<Habit[]>('habits', defaultHabits);
  
  // Also track the last date habits were accessed
  const [lastSavedDate, setLastSavedDate] = useLocalStorage<string | null>(
    'lastSavedDate', 
    null
  );

  // Check for day change when component mounts
  useEffect(() => {
    // If it's a new day, reset all habits to not completed
    if (isNewDay(lastSavedDate)) {
      setHabits(prevHabits => 
        prevHabits.map(habit => ({
          ...habit,
          completedToday: false
        }))
      );
    }
    
    // Update the last saved date to today
    setLastSavedDate(new Date().toISOString());
  }, [lastSavedDate, setHabits, setLastSavedDate]);

  // Toggle a habit's completion status
  const toggleHabit = (id: string) => {
    setHabits(prev => prev.map(habit => {
      if (habit.id === id) {
        const wasCompleted = habit.completedToday;
        return {
          ...habit,
          completedToday: !wasCompleted,
          streak: !wasCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
          totalCompleted: !wasCompleted ? habit.totalCompleted + 1 : Math.max(0, habit.totalCompleted - 1),
        };
      }
      return habit;
    }));
  };

  // Add a new habit
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

  // Delete a habit
  const deleteHabit = (id: string) => {
    setHabits(prev => prev.filter(habit => habit.id !== id));
  };

  // Calculate stats
  const stats = {
    completedToday: habits.filter(h => h.completedToday).length,
    totalHabits: habits.length,
    totalStreak: habits.reduce((sum, h) => sum + h.streak, 0),
    bestStreak: Math.max(...habits.map(h => h.streak), 0),
  };

  return {
    habits,
    toggleHabit,
    addHabit,
    deleteHabit,
    stats,
  };
};

export default useHabits;
