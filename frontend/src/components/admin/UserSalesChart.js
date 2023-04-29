import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function UserSalesChart({ data }) {
  const barColors = ["#3B71CA", "#DC4C64", "#54B4D3"];
  return (
    <ResponsiveContainer width="90%" height={600}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="2 2" />
        <XAxis dataKey="userDetails.name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Bar dataKey="total" fill="green"  /> */}
        {/* <Bar dataKey="total" fill="green" stroke="#000000"
                    strokeWidth={5} />  */}
        <Bar dataKey="total" stroke="#000000" strokeWidth={1}>
          {data.map((item, index) => (
            <Cell key={`cell-${index}`} fill={barColors[index % 20]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
