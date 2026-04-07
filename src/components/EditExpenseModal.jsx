import { useState, useEffect } from "react";

function EditExpenseModal({ expense, setShowEditModal, refreshExpenses }) {
  const [form, setForm] = useState({
    expense: "",
    expense_amount: "",
    category_id: "",
    expense_date: ""
  });

  // ✅ Pre-fill data
  useEffect(() => {
    if (expense) {
      setForm({
        expense: expense.expense,
        expense_amount: expense.expense_amount,
        category_id: expense.category_id,
        expense_date: expense.expense_date
      });
    }
  }, [expense]);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm({
      ...form,
      
      [name]: name === "category_id" ? Number(value) : value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await fetch(`http://localhost:8080/expenses/${expense.id}`, {
        method: "PUT", // ✅ update API
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      refreshExpenses();      // refresh table
      setShowEditModal(false); // close modal

    } catch (err) {
      console.error("Error updating expense:", err);
    }
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Expense</h3>

        <form onSubmit={handleSubmit}>

          <input
            name="expense"
            value={form.expense}
            onChange={handleChange}
            required
          />

          <input
            name="expense_amount"
            type="number"
            value={form.expense_amount}
            onChange={handleChange}
            required
          />

          <select
            name="category_id"
            value={form.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="1">Groceries</option>
            <option value="2">Food & Drinks</option>
            <option value="3">Health</option>
            <option value="4">Travel</option>
          </select>

          <input
            name="expense_date"
            type="date"
            value={form.expense_date}
            onChange={handleChange}
            required
          />

          <button type="submit">Update</button>

          <button type="button" onClick={() => setShowEditModal(false)}>
            Cancel
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;