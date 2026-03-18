
import '../index.css'


function Budget(props) {
  const user = props.user;

  if (!user) return <h3>Loading...</h3>;
  const budgets = user.budget || 0;
  const expense = 1000;
  const remainingBudget = budgets - expense
  return (
    <div className="budget-container">

      <div className="budget-card">
        <p className="budget-title">Total Budget</p>
        <h3>{budgets}</h3>
      </div>

      <div className="budget-card">
        <p className="budget-title">Total Expense</p>
        <h3>{expense}</h3>
      </div>

      <div className="budget-card">
        <p className="budget-title">Remaining Budget</p>
        <h3>{remainingBudget}</h3>
      </div>

    </div>
  )
}
export default Budget