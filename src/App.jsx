import { useState, useEffect } from "react";

import LoginModal from "./components/LoginModal";
import ExpenseTable from "./components/ExpenseTable";
import Header from "./components/Header";
import Controls from "./components/Controls";
import ExpenseModal from "./components/ExpenseModal";
import EditExpenseModal from "./components/EditExpenseModal";
import ExpenseChart from "./components/ExpenseChart";
import Title from "./components/Title";



function App() {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const [user, setUser] = useState(null);

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  // ✅ CHECK LOGIN ON LOAD
useEffect(() => {
  const token = localStorage.getItem("token");
  const savedUser = localStorage.getItem("user");

  if (token && savedUser) {
    setUser(JSON.parse(savedUser));
    setIsLoggedIn(true);
  }

  setLoading(false);
}, []);

  // ✅ FETCH EXPENSES (WITH TOKEN)
  async function getExpenses() {
    const res = await fetch("http://localhost:8080/expenses", {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    const data = await res.json();
    setExpenses(data);
    setFilteredExpenses(data);
  }

  useEffect(() => {
    if (isLoggedIn) {
      getExpenses();
    }
  }, [isLoggedIn]);

  const handleFilter = (filteredData) => {
    setFilteredExpenses(filteredData);
  };

  async function deleteExpense(id) {
    await fetch(`http://localhost:8080/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    });

    getExpenses();
  }

  function handleEdit(expense) {
    setSelectedExpense(expense);
    setShowEditModal(true);
  }

// 🔐 SHOW LOGIN MODAL
if (!isLoggedIn) {
  return (
    <LoginModal
      setUser={setUser}
      setIsLoggedIn={setIsLoggedIn}
    />
  );
}

  // 🔥 MAIN APP (after login)
  return (
    <>
      
      <Title />
      <Header user={user} expenses={expenses} />

      <div className="main-layout">
        <div className="left-panel">
          <ExpenseChart expenses={filteredExpenses} />
        </div>

        <div className="right-panel">
          <Controls
            onAddExpense={() => setShowModal(true)}
            expenses={expenses}
            onFilter={handleFilter}
          />

          <ExpenseTable
            expenses={filteredExpenses}
            onDelete={deleteExpense}
            onEdit={handleEdit}
          />
        </div>
      </div>

      {showModal && (
        <ExpenseModal
          setShowModal={setShowModal}
          refreshExpenses={getExpenses}
        />
      )}

      {showEditModal && (
        <EditExpenseModal
          expense={selectedExpense}
          setShowEditModal={setShowEditModal}
          refreshExpenses={getExpenses}
        />
      )}
    </>
  );
}

export default App;