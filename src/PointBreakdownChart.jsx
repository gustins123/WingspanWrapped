import React from "react";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AA00FF', '#FF0044'];

const PointBreakdownChart = ({ breakdown, customLabels, width }) => {
  const data = Object.keys(breakdown).map((key, index) => ({
    name: key,
    value: parseFloat(breakdown[key]),
  }));

  const renderCustomLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 20;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Fetch label from customLabels array if available, otherwise use default
    const labelText = customLabels[index]
      ? `${customLabels[index]} (${(percent * 100).toFixed(2)}%)`
      : `${data[index].name} (${(percent * 100).toFixed(2)}%)`;

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        style={{ fontSize: "12px" }}
      >
        {labelText}
      </text>
    );
  };

  return (
    <PieChart width={width} height={500}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={Math.min(width * 0.2, 200)}
        fill="#8884d8"
        label={renderCustomLabel} // Use custom label
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
    </PieChart>
  );
};

export default PointBreakdownChart;
