import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { MonthlyData } from '@/types/finance';

interface TrendChartProps {
  data: MonthlyData[];
}

export function TrendChart({ data }: TrendChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      notation: 'compact',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card rounded-lg p-3 border border-border/50">
          <p className="font-medium mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {formatCurrency(entry.value)}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="glass-card rounded-xl p-5 h-[350px]">
      <h3 className="text-lg font-semibold mb-4">Tendencia Financiera</h3>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(160 84% 39%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(160 84% 39%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorExpenses" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(0 72% 51%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(0 72% 51%)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(217 91% 60%)" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="hsl(217 91% 60%)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 47% 16%)" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(215 20% 55%)" 
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="hsl(215 20% 55%)" 
            fontSize={12}
            tickFormatter={formatCurrency}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ paddingTop: '10px' }}
            formatter={(value) => <span className="text-sm text-muted-foreground">{value}</span>}
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            name="Ingresos"
            stroke="hsl(160 84% 39%)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorIncome)" 
          />
          <Area 
            type="monotone" 
            dataKey="expenses" 
            name="Gastos"
            stroke="hsl(0 72% 51%)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorExpenses)" 
          />
          <Area 
            type="monotone" 
            dataKey="profit" 
            name="Utilidad"
            stroke="hsl(217 91% 60%)" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorProfit)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
