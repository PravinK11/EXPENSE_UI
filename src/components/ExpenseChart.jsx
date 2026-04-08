import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

function ExpenseChart({ expenses }) {

  const data = Object.values(
    expenses.reduce((acc, curr) => {
      const category = curr.category;

      if (!acc[category]) {
        acc[category] = { name: category, value: 0 };
      }

      acc[category].value += Number(curr.expense_amount);

      return acc;
    }, {})
  );

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

  return (
    <div className="chart-container">
      <h2>Expense Breakdown</h2>

      <PieChart width={400} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
}

export default ExpenseChart;