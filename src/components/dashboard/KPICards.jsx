import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Phone, 
  DollarSign, 
  Clock, 
  CheckCircle, 
  XCircle 
} from 'lucide-react';

export function KPICards({ kpis }) {
  const cards = [
    {
      title: 'Total Calls',
      value: kpis.totalCalls.toLocaleString(),
      icon: Phone,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: 'Total Cost',
      value: `$${parseFloat(kpis.totalCost).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: 'Avg Duration',
      value: `${kpis.avgDuration}s`,
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: 'Successful Calls',
      value: kpis.successfulCalls.toLocaleString(),
      icon: CheckCircle,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-100',
    },
    {
      title: 'Failed Calls',
      value: kpis.failedCalls.toLocaleString(),
      icon: XCircle,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map(({ title, value, icon: Icon, color, bgColor }) => (
        <Card key={title} className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              {title}
            </CardTitle>
            <div className={`p-2 rounded-full ${bgColor}`}>
              <Icon className={`h-4 w-4 ${color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
