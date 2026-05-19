import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, TrendingUp, Calculator } from 'lucide-react';

export function CostSummary({ totalCost, avgCost, callCount }) {
  const items = [
    {
      label: 'Total Cost',
      value: `$${parseFloat(totalCost).toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-600',
    },
    {
      label: 'Average Cost/Call',
      value: `$${avgCost}`,
      icon: Calculator,
      color: 'text-blue-600',
    },
    {
      label: 'Cost per 100 Calls',
      value: `$${((parseFloat(totalCost) / callCount) * 100).toFixed(2)}`,
      icon: TrendingUp,
      color: 'text-purple-600',
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Cost Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-slate-600">{label}</span>
              </div>
              <span className="font-semibold text-slate-900">{value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
