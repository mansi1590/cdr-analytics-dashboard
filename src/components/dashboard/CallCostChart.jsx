import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export function CallCostChart({ data }) {

  const topCities = [...data]
    .sort((a, b) => b.cost - a.cost)
    .slice(0, 10);

  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
      
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
          Total Cost by City
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          
          <BarChart
            data={topCities}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 80, bottom: 0 }}
          >
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              type="number"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={{ stroke: '#475569' }}
              tickFormatter={(value) => `$${value}`}
            />

            <YAxis
              type="category"
              dataKey="city"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={{ stroke: '#475569' }}
              width={70}
            />

            <Tooltip
              formatter={(value) => [`$${value.toFixed(2)}`, 'Cost']}
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff',
              }}
            />

            <Bar
              dataKey="cost"
              fill="#10b981"
              radius={[0, 4, 4, 0]}
            />

          </BarChart>

        </ResponsiveContainer>
      </CardContent>

    </Card>
  );
}