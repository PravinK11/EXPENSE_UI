import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'
import ExpenseTable from './components/ExpenseTable'
import Header from './components/Header'

function App() {

  const [user, setUser] = useState([])
      
      useEffect(() => {
          async function getUser() {
              const res = await fetch('http://localhost:8080/users')
              const data = await res.json();
              setUser(data[0]);
          }
          getUser();
          
      },[])

  const [expenses, setExpenses] = useState([]);
      async function getExpenses() {
          const res = await fetch('http://localhost:8080/expenses')
          const data = await res.json();
          setExpenses(data);
      };
      useEffect(() => {
          getExpenses();
      }, []);
  return (
    <>
      <Header user={user} expenses={expenses} />
      <ExpenseTable expenses={expenses}/>
    </>
  )
}

export default App
