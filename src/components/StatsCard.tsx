
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  gradient: string;
}

const StatsCard = ({ icon, label, value, gradient }: StatsCardProps) => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-4">
        <div className="flex flex-col items-center space-y-2">
          <div className={cn(
            "w-10 h-10 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-md",
            gradient
          )}>
            {icon}
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-gray-800">{value}</div>
            <div className="text-xs text-gray-600">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsCard;
