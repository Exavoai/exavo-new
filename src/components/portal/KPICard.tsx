import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Line, LineChart, ResponsiveContainer } from "recharts";

interface KPICardProps {
  title: string;
  value: string | number;
  trend?: number;
  chartData?: number[];
  icon?: React.ReactNode;
}

export function KPICard({ title, value, trend, chartData, icon }: KPICardProps) {
  const hasPositiveTrend = trend && trend > 0;
  
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">{title}</p>
            <p className="text-3xl font-bold">{value}</p>
          </div>
          {icon && (
            <div className="w-12 h-12 rounded-lg bg-gradient-hero flex items-center justify-center">
              {icon}
            </div>
          )}
        </div>
        
        {trend !== undefined && (
          <div className="flex items-center gap-2 mb-3">
            {hasPositiveTrend ? (
              <TrendingUp className="w-4 h-4 text-green-500" />
            ) : (
              <TrendingDown className="w-4 h-4 text-red-500" />
            )}
            <span className={`text-sm font-medium ${hasPositiveTrend ? 'text-green-500' : 'text-red-500'}`}>
              {Math.abs(trend)}%
            </span>
            <span className="text-sm text-muted-foreground">vs last month</span>
          </div>
        )}

        {chartData && chartData.length > 0 && (
          <div className="h-16 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.map((value, index) => ({ value, index }))}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
