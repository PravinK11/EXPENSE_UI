import { useState } from 'react'
import { useEffect } from 'react'


import Budget from './Budget'


function Header() {
    const [user, setUser] = useState([])
    
    useEffect(() => {
        async function getUser() {
            const res = await fetch('http://localhost:8080/users')
            const data = await res.json();
            setUser(data[0]);
        }
        getUser();
        
    },[])
    return (
        <>
        {/* {users.map((user)=>(
            <h1 key={id}>Hello {user.name}</h1>
        ))} */}
        {/* <h1>Hello {users[0]?.name}</h1> */}
        <h2>Hello {user?.name}</h2>
        <Budget user={user}/>
        </>
    )
}
export default Header;