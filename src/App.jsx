import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import ExpenseTable from './components/ExpenseTable'
import Header from './components/Header'
import Controls from './components/Controls'
import ExpenseModal from './components/ExpenseModal';
import EditExpenseModal from './components/EditExpenseModal';



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
  async function getExpenses() {
    const res = await fetch('http://localhost:8080/expenses')
    const data = await res.json();
    setExpenses(data);
  };
  useEffect(() => {
    getExpenses();
  }, []);


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
      <Header user={user} expenses={expenses} />
      <Controls onAddExpense={() => setShowModal(true)} />
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

      <ExpenseTable expenses={expenses} onDelete={deleteExpense} onEdit={handleEdit} />
    </>
  )
}

export default App
