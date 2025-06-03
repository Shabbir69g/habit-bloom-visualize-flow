import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import type { Habit } from "@/pages/Index";

interface DeleteHabitDialogProps {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const DeleteHabitDialog = ({ habit, isOpen, onClose, onDelete }: DeleteHabitDialogProps) => {
  if (!habit) return null;

  const handleDelete = () => {
    onDelete(habit.id);
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-white/95 backdrop-blur-sm border-white/20 shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500 flex items-center gap-2">
            <Trash2 className="h-5 w-5" />
            Delete Habit
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <span className="font-semibold text-gray-700">"{habit.name}"</span>? 
            This will permanently remove the habit and all its progress.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="bg-gray-100 hover:bg-gray-200 text-gray-700">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteHabitDialog;
