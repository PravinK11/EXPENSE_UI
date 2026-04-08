import { useState } from "react";

function AddBudget({ setShowModal, setBudget }) {
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) {
      alert("Enter a valid budget");
      return;
    }

    localStorage.setItem("budget", amount);

    setBudget(Number(amount));

    setShowModal(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 className="modal-head">Set Budget</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="number"
            placeholder="Enter budget amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="input"
          />

          <div className="modal-buttons">
            <button type="submit" className="btn">
              Save
            </button>

            <button
              type="button"
              className="btn cancel"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBudget;