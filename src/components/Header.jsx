
import Budget from './Budget'


function Header({expenses,user}) {
    return (
        <>
        {/* {users.map((user)=>(
            <h1 key={id}>Hello {user.name}</h1>
        ))} */}
        {/* <h1>Hello {users[0]?.name}</h1> */}
        <h2>Hello {user?.name}</h2>
        <Budget user={user}  expenses={expenses}/>
        </>
    )
}
export default Header;