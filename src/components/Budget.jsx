import { useState, useEffect } from "react";
import AddBudget from "./AddBudget";
import "../index.css";

function Budget({ expenses }) {
  const [budget, setBudget] = useState(0);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const savedBudget = localStorage.getItem("budget");
    if (savedBudget) {
      setBudget(Number(savedBudget));
    }
  }, []);

  const totalExpense = expenses.reduce(
    (acc, curr) => acc + Number(curr.expense_amount),
    0
  );

  const remainingBudget = budget - totalExpense;

  return (
    <div className="budget-container">

      <div className="budget-card">
        <p>Total Budget</p>
        <h3>₹ {budget}</h3>
      </div>
      {/* 🔥 OPEN MODAL */}
      <button onClick={() => setShowModal(true)} className="btn">
        Set Budget
      </button>

      <div className="budget-card">
        <p>Total Expense</p>
        <h3>₹ {totalExpense}</h3>
      </div>

      <div className="budget-card">
        <p>Remaining</p>
        <h3 style={{ color: remainingBudget < 0 ? "red" : "green" }}>
          ₹ {remainingBudget}
        </h3>
      </div>

      

      {/* 🔥 MODAL */}
      {showModal && (
        <AddBudget
          setShowModal={setShowModal}
          setBudget={setBudget}
        />
      )}
    </div>
  );
}

export default Budget;