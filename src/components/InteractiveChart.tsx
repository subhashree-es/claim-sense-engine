import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis } from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ChartData {
  name: string;
  value: number;
  color: string;
}

interface InteractiveChartProps {
  title: string;
  description?: string;
  data: ChartData[];
  type?: "pie" | "bar" | "both";
}

export default function InteractiveChart({
  title,
  description,
  data,
  type = "both"
}: InteractiveChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-3 border">
          <p className="font-medium">{`${label || payload[0].name}`}</p>
          <p className="text-primary">
            {`Value: ${payload[0].value}`}
          </p>
        </div>
      );
    }
    return null;
  };

  const PieChartComponent = () => (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          onMouseEnter={onPieEnter}
          onMouseLeave={onPieLeave}
        >
          {data.map((entry, index) => (
            <Cell 
              key={`cell-${index}`} 
              fill={entry.color}
              stroke={activeIndex === index ? "#fff" : "none"}
              strokeWidth={activeIndex === index ? 2 : 0}
              style={{
                filter: activeIndex === index ? "brightness(1.1)" : "none",
                transform: activeIndex === index ? "scale(1.05)" : "scale(1)",
                transformOrigin: "center",
                transition: "all 0.2s ease-in-out"
              }}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );

  const BarChartComponent = () => (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis 
          dataKey="name" 
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis 
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip content={<CustomTooltip />} />
        <Bar 
          dataKey="value" 
          radius={[4, 4, 0, 0]}
          fill="hsl(var(--primary))"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );

  if (type === "pie") {
    return (
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <PieChartComponent />
        </CardContent>
      </Card>
    );
  }

  if (type === "bar") {
    return (
      <Card className="animate-fade-in-up">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
        <CardContent>
          <BarChartComponent />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="animate-fade-in-up">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="pie" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="pie">Pie Chart</TabsTrigger>
            <TabsTrigger value="bar">Bar Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="pie" className="mt-4">
            <PieChartComponent />
          </TabsContent>
          <TabsContent value="bar" className="mt-4">
            <BarChartComponent />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}