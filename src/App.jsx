import { useState } from 'react'
import { useEffect } from 'react'

import ExpenseTable from './components/ExpenseTable'
import Header from './components/Header'
import Controls from './components/Controls'
import ExpenseModal from './components/ExpenseModal';
import EditExpenseModal from './components/EditExpenseModal';
import ExpenseChart from "./components/ExpenseChart";
import Title  from './components/Title'


function App() {
  const [showModal, setShowModal] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [user, setUser] = useState([])


  useEffect(() => {
    async function getUser() {
      const res = await fetch('http://localhost:8080/users')
      const data = await res.json();
      setUser(data[0]);
    }
    getUser();

  }, [])

  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);

  async function getExpenses() {
    const res = await fetch('http://localhost:8080/expenses')
    const data = await res.json();
    setExpenses(data);

    setFilteredExpenses(data);
  };
  useEffect(() => {
    getExpenses();
  }, []);

  // const handleFilter = ()
  const handleFilter = (filteredData) => {
  setFilteredExpenses(filteredData);
};


  async function deleteExpense(id) {
    await fetch(`http://localhost:8080/expenses/${id}`, {
      method: "DELETE"
    })
    getExpenses();
  }

  function handleEdit(expense) {
    setSelectedExpense(expense);
    setShowEditModal(true);
  }


  return (
    <>
    <Title />
    <Header user={user} expenses={expenses} />

    {/* 🔥 MAIN LAYOUT */}
    <div className="main-layout">

      {/* 📊 LEFT: CHART (25%) */}
      <div className="left-panel">
        <ExpenseChart expenses={filteredExpenses} />
      </div>

      {/* 📋 RIGHT: TABLE (75%) */}
      <div className="right-panel">

        {/* 🔥 CONTROLS INSIDE TABLE SECTION */}
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

    {/* 🔥 MODALS */}
    {showModal && (
      <ExpenseModal
        setShowModal={setShowModal}
        refreshExpenses={getExpenses}
        user={user}
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
  )
}

export default App
