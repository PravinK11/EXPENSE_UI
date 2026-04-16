import { useState, useEffect } from "react";
import AddBudget from "./AddBudget";
import "../index.css";

function Budget({ expenses }) {
  const [budget, setBudget] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [hasBudget, setHasBudget] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL;
  // ✅ Fetch latest budget from backend
  useEffect(() => {
    async function fetchBudget() {
      try {
        const res = await fetch(`${BASE_URL}/budget/latest`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        });

        const data = await res.json();

        if (data && data.budget_amount) {
          setBudget(Number(data.budget_amount));
          setHasBudget(true);
        } else {
          setBudget(0);
          setHasBudget(false);
        }

      } catch (err) {
        console.log(err);
      }
    }

    fetchBudget();
  }, []);

  // 💰 Total expense
  const totalExpense = expenses.reduce(
    (acc, curr) => acc + Number(curr.expense_amount),
    0
  );

  const remainingBudget = budget - totalExpense;

  return (
    <div className="budget-container">

      {/* 💰 Budget */}
      <div className="budget-card budget-main">
        <p className="budget-title">Total Budget</p>

        <h3>₹ {budget}</h3>

        <button
          onClick={() => setShowModal(true)}
          className="btn budget-btn"
        >
          {hasBudget ? "Update Budget" : "Set Budget"}
        </button>
      </div>

      {/* 📊 Expense */}
      <div className="budget-card">
        <p>Total Expense</p>
        <h3>₹ {totalExpense}</h3>
      </div>

      {/* 💸 Remaining */}
      <div className="budget-card">
        <p>Remaining</p>
        <h3 style={{ color: remainingBudget < 0 ? "red" : "green" }}>
          ₹ {remainingBudget}
        </h3>
      </div>

      {/* 🪟 Modal */}
      {showModal && (
        <AddBudget
          setShowModal={setShowModal}
          setBudget={(newBudget) => {
            setBudget(newBudget);
            setHasBudget(true);
          }}
        />
      )}
    </div>
  );
}

export default Budget;