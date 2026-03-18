import { useEffect, useState } from 'react';
import '../index.css'
function ExpenseTable() {
    const [expenses, setExpenses] = useState([]);
    async function getExpenses() {
        const res = await fetch('http://localhost:8080/expenses')
        const data = await res.json();
        setExpenses(data);
    };
    useEffect(() => {
        getExpenses();
    }, []);

    return (
        <div className="table-container">
            <table className="expense-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Expense</th>
                        <th>Amount (₹)</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {expenses.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.expense}</td>
                            <td>₹{item.expense_amount}</td>
                            <td>{item.category}</td>
                            <td>{new Date(item.expense_date).toLocaleDateString()}</td>
                            <td>
                                <button className="edit-btn">Edit</button>
                                <button className="delete-btn">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ExpenseTable;