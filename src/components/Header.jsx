import Budget from './Budget'

function Header({ expenses, user }) {
    return (
        <>
            {/* 🔥 FLEX CONTAINER */}
            <div className="header-top">
                <h2>Hello {user?.name}</h2>

                <button
                    className="logout-btn"
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}
                >
                    Logout
                </button>
            </div>

            <Budget user={user} expenses={expenses} />
        </>
    )
}

export default Header;