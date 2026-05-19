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

export function CallDurationChart({ data }) {
  return (
    <Card className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
      
      <CardHeader>
        <CardTitle className="text-lg text-slate-800 dark:text-slate-200">
          Call Duration Distribution
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          
          <BarChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#334155"
            />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={{ stroke: '#475569' }}
            />

            <YAxis
              tick={{ fontSize: 12, fill: '#94a3b8' }}
              axisLine={{ stroke: '#475569' }}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: '#0f172a',
                border: '1px solid #334155',
                borderRadius: '8px',
                color: '#fff',
              }}
            />

            <Bar
              dataKey="count"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
              name="Calls"
            />

          </BarChart>

        </ResponsiveContainer>
      </CardContent>

    </Card>
  );
}