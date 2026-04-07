import '../index.css';

function Controls({ onAddExpense }) {

    return (
        <div className="controls-container">



            <div className="controls-left">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search expenses..."
                        className="search-input"
                    />
                    <button className="search-icon">
                        🔍
                    </button>
                </div>


                <button className="btn active">All Expenses</button>
                <button className="btn">Groceries</button>
                <button className="btn">Food & Drinks</button>
                <button className="btn">Travel</button>
                <button className="btn">Health</button>
            </div>

            {/* RIGHT SIDE */}
            <div className="controls-right">
                <button className="btn primary">+ Add Budget</button>
                <button className="btn success" onClick={onAddExpense}>+ Add Expense</button>
            </div>

        </div>
    );
}

export default Controls;