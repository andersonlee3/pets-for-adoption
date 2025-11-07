import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { Pet } from "../types/Pet";

interface Props {
  pets: Pet[];
}

export default function GenderAgeChart({ pets }: Props) {
  // Count by age and gender
  const ageGenderData: { [key: string]: { Male: number; Female: number; Unknown: number } } = {};

  pets.forEach((pet) => {
    const age = pet.age || "Unknown";
    if (!ageGenderData[age]) {
      ageGenderData[age] = { Male: 0, Female: 0, Unknown: 0 };
    }

    if (pet.gender === "Male") {
      ageGenderData[age].Male += 1;
    } else if (pet.gender === "Female") {
      ageGenderData[age].Female += 1;
    } else {
      ageGenderData[age].Unknown += 1;
    }
  });

  // Convert to array format for recharts
  const data = Object.entries(ageGenderData).map(([age, counts]) => ({
    age,
    ...counts,
  }));

  return (
    <div className="chart-container">
      <h3>Age & Gender Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="age" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Male" fill="#0088FE" />
          <Bar dataKey="Female" fill="#FF8042" />
          <Bar dataKey="Unknown" fill="#CCCCCC" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
