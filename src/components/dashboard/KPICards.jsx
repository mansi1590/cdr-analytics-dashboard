import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Phone,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';

export function KPICards({ kpis }) {
  const cards = [
    {
      title: 'Total Calls',
      value: kpis.totalCalls.toLocaleString(),
      icon: Phone,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-500/20',
    },
    {
      title: 'Total Cost',
      value: `$${parseFloat(kpis.totalCost).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-500/20',
    },
    {
      title: 'Avg Duration',
      value: `${kpis.avgDuration}s`,
      icon: Clock,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-500/20',
    },
    {
      title: 'Successful Calls',
      value: kpis.successfulCalls.toLocaleString(),
      icon: CheckCircle,
      color: 'text-emerald-600 dark:text-emerald-400',
      bgColor: 'bg-emerald-100 dark:bg-emerald-500/20',
    },
    {
      title: 'Failed Calls',
      value: kpis.failedCalls.toLocaleString(),
      icon: XCircle,
      color: 'text-red-600 dark:text-red-400',
      bgColor: 'bg-red-100 dark:bg-red-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map(({ title, value, icon: Icon, color, bgColor }) => (
        <Card
          key={title}
          className="
            bg-white
            dark:bg-slate-900/80
            border
            border-slate-200
            dark:border-slate-700
            shadow-lg
            hover:shadow-xl
            hover:border-slate-300
            dark:hover:border-slate-600
            transition-all
            duration-300
          "
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
              {title}
            </CardTitle>

            <div className={`p-2 rounded-xl ${bgColor}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold text-slate-900 dark:text-white">
              {value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}