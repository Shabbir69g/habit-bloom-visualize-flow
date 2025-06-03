import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Habit } from "@/pages/Index";

interface EditHabitModalProps {
  habit: Habit | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updates: Partial<Habit>) => void;
}

const icons = ["💧", "💪", "📚", "🧘", "🚶", "🌱", "✍️", "🎵", "🍎", "😴", "🧹", "💰"];
const colors = [
  "from-blue-400 to-cyan-400",
  "from-purple-400 to-pink-400",
  "from-green-400 to-emerald-400",
  "from-orange-400 to-red-400",
  "from-yellow-400 to-orange-400",
  "from-indigo-400 to-purple-400",
  "from-pink-400 to-rose-400",
  "from-teal-400 to-cyan-400",
];

const animalImages = [
  "/3d-rendering-young-tiger.jpg",
  "/cartoon-animated-penguin-with-headphones.jpg"
];

const EditHabitModal = ({ habit, isOpen, onClose, onSave }: EditHabitModalProps) => {
  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(icons[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

  // Initialize form with habit data when a habit is selected for editing
  useEffect(() => {
    if (habit) {
      setName(habit.name);
      setSelectedIcon(habit.icon);
      setSelectedColor(habit.color);
      setSelectedImage(habit.image);
    }
  }, [habit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (habit && name.trim()) {
      onSave(habit.id, {
        name: name.trim(),
        icon: selectedIcon,
        color: selectedColor,
        image: selectedImage,
      });
      onClose();
    }
  };

  if (!isOpen || !habit) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-sm bg-white/95 backdrop-blur-sm border-white/20 shadow-2xl animate-scale-in max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Edit Habit
          </CardTitle>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-gray-100"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Habit Name */}
            <div className="space-y-2">
              <Label htmlFor="habit-name">Habit Name</Label>
              <Input
                id="habit-name"
                type="text"
                placeholder="e.g., Drink 8 glasses of water"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white/80 border-gray-200"
                required
              />
            </div>

            {/* Animal Images Selection */}
            <div className="space-y-3">
              <Label>Choose Animal Friend (Optional)</Label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedImage(undefined)}
                  className={cn(
                    "w-16 h-16 rounded-lg flex items-center justify-center text-2xl transition-all duration-200 border-2",
                    selectedImage === undefined
                      ? "bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-md scale-110 border-purple-400"
                      : "bg-gray-100 hover:bg-gray-200 border-transparent"
                  )}
                >
                  🎯
                </button>
                {animalImages.map((image) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(image)}
                    className={cn(
                      "w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 border-2",
                      selectedImage === image
                        ? "border-purple-400 scale-110 shadow-md"
                        : "border-transparent hover:scale-105"
                    )}
                  >
                    <img 
                      src={image} 
                      alt="Animal friend"
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Icon Selection */}
            <div className="space-y-3">
              <Label>Choose Icon</Label>
              <div className="grid grid-cols-6 gap-2">
                {icons.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setSelectedIcon(icon)}
                    className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-all duration-200",
                      selectedIcon === icon
                        ? "bg-gradient-to-br from-purple-400 to-pink-400 text-white shadow-md scale-110"
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="space-y-3">
              <Label>Choose Color</Label>
              <div className="grid grid-cols-4 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "w-12 h-8 rounded-lg bg-gradient-to-r transition-all duration-200 border-2",
                      color,
                      selectedColor === color
                        ? "border-gray-400 scale-110 shadow-md"
                        : "border-transparent hover:scale-105"
                    )}
                  />
                ))}
              </div>
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className={cn(
                  "w-12 h-12 rounded-full bg-gradient-to-br flex items-center justify-center text-lg shadow-sm overflow-hidden",
                  selectedColor
                )}>
                  {selectedImage ? (
                    <img 
                      src={selectedImage} 
                      alt="Preview"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    selectedIcon
                  )}
                </div>
                <span className="font-medium text-gray-800">
                  {name || "Your habit name"}
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              disabled={!name.trim()}
            >
              Save Changes
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditHabitModal;
