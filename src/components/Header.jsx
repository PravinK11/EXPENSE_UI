
import Budget from './Budget'


function Header({expenses,user}) {
    return (
        <>
        <h2>Hello {user?.name}</h2>
        <Budget user={user}  expenses={expenses}/>
        </>
    )
}
export default Header;