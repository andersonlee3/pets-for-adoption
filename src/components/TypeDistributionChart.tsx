import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { Pet } from "../types/Pet";

interface Props {
  pets: Pet[];
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"];

export default function TypeDistributionChart({ pets }: Props) {
  // Count pets by type
  const typeCounts: { [key: string]: number } = {};
  pets.forEach((pet) => {
    if (pet.type) {
      typeCounts[pet.type] = (typeCounts[pet.type] || 0) + 1;
    }
  });

  // Convert to array format for recharts
  const data = Object.entries(typeCounts).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <div className="chart-container">
      <h3>Pet Type Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={(props: any) =>
              `${props.name}: ${((props.percent || 0) * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
