import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const COLORS = [
  '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6',
  '#ec4899', '#06b6d4', '#84cc16', '#f97316', '#6366f1',
];

export function CallsByCityPieChart({ data }) {
  // Take top 8 cities, group rest as "Other"
const sortedData = [...data].sort((a, b) => b.count - a.count);

const topCities = sortedData.slice(0, 8);

const otherCount = sortedData
  .slice(8)
  .reduce((sum, item) => sum + item.count, 0);
  
  const chartData = otherCount > 0 
    ? [...topCities, { city: 'Other', count: otherCount }]
    : topCities;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Calls by City</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="count"
              nameKey="city"
              label={({ city, percent }) => 
                `${city} (${(percent * 100).toFixed(0)}%)`
              }
              labelLine={{ stroke: '#64748b', strokeWidth: 1 }}
            >
              {chartData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [value, 'Calls']}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
