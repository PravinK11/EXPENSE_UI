import { useState } from "react";

function AddBudget({ setShowModal, setBudget }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || isNaN(amount)) {
      alert("Enter a valid budget");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8080/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify({
          budget_amount: Number(amount),
          month: new Date().toISOString().slice(0, 10) // current month
        })
      });

      const data = await res.json();

      if (res.ok) {
        setBudget(data.budget.budget_amount); // ✅ update UI instantly
        setShowModal(false);
      } else {
        alert(data.message);
      }

    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
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
            <button type="submit" className="btn" disabled={loading}>
              {loading ? "Saving..." : "Save"}
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