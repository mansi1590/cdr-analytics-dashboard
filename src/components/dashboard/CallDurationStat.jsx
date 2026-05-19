import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDuration } from '@/lib/analytics';
import { Timer, TrendingUp, TrendingDown } from 'lucide-react';

export function CallDurationStats({ stats }) {

  const items = [
    {
      label: 'Longest Call',
      value: formatDuration(stats.longest),
      icon: TrendingUp,
      color: 'text-blue-600',
    },
    {
      label: 'Shortest Call',
      value: formatDuration(stats.shortest),
      icon: TrendingDown,
      color: 'text-orange-600',
    },
    {
      label: 'Average Duration',
      value: formatDuration(stats.average),
      icon: Timer,
      color: 'text-purple-600',
    },
  ];

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
      
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
          Call Duration Insights
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          
          {items.map(({ label, value, icon: Icon, color }) => (
            
            <div
              key={label}
              className="flex items-center justify-between"
            >
              
              <div className="flex items-center gap-3">
                
                <Icon className={`h-5 w-5 ${color}`} />

                <span className="text-slate-600 dark:text-slate-400">
                  {label}
                </span>

              </div>

              <span className="font-semibold text-slate-900 dark:text-slate-100">
                {value}
              </span>

            </div>

          ))}

        </div>
      </CardContent>

    </Card>
  );
}