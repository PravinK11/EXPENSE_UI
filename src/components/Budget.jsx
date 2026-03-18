
import '../index.css'
function Budget({user,expenses}) {
  const eArray=expenses.map(item =>  Number(item.expense_amount)); 
  console.log(eArray)
 const totalExpense=eArray.reduce((acc, curr) => acc + curr , 0)


  if (!user) return <h3>Loading...</h3>;
  const budgets = user.budget || 0;
  const remainingBudget = budgets - totalExpense


  return (
    <div className="budget-container">

      <div className="budget-card">
        <p className="budget-title">Total Budget</p>
        <h3>{budgets}</h3>
      </div>

      <div className="budget-card">
        <p className="budget-title">Total Expense</p>
        <h3>{totalExpense}</h3>
      </div>

      <div className="budget-card">
        <p className="budget-title">Remaining Budget</p>
        <h3>{remainingBudget}</h3>
      </div>

    </div>
  )
}
export default Budget