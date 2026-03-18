import { useEffect, useState } from 'react';
import '../index.css'
function ExpenseTable({expenses}) {
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