import { useState } from "react";

function ExpenseModal({ setShowModal, refreshExpenses, user }) {
  const [form, setForm] = useState({
    user_id: user?.id || "",
    expense: "",
    expense_amount: "",
    category: "",
    expense_date: ""
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch("http://localhost:8080/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    refreshExpenses();
    setShowModal(false);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h3>Add Expense</h3>

        <form onSubmit={handleSubmit}>
          <input
            name="expense"
            placeholder="Expense name"
            onChange={handleChange}
            required
          />

          <input
            name="expense_amount"
            placeholder="Amount"
            type="number"
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
            onChange={handleChange}
            required
          />

          <button type="submit">Add</button>
          <button type="button" onClick={() => setShowModal(false)}>
            Cancel
          </button>
        </form>

      </div>
    </div>
  );
}

export default ExpenseModal;