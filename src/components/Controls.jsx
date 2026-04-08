import { useState } from "react";

function Controls({ onAddExpense, onFilter, expenses }) {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 Search
  const handleSearch = (value) => {
    setSearchTerm(value);
    applyFilters(activeCategory, value);
  };

  // 🏷️ Category Filter
  const handleCategory = (category) => {
    setActiveCategory(category);
    applyFilters(category, searchTerm);
  };

  // 🔥 Common Filter Function
  const applyFilters = (category, search) => {
    let filtered = [...expenses];

    // ✅ Filter by category NAME
    if (category !== "ALL") {
      filtered = filtered.filter(
        (item) =>
          item.category.toLowerCase() === category.toLowerCase()
      );
    }

    // ✅ Search filter
    if (search) {
      filtered = filtered.filter((item) =>
        item.expense.toLowerCase().includes(search.toLowerCase())
      );
    }

    onFilter(filtered);
  };

  return (
    <div className="controls-left">
      
      {/* 🔍 Search Box */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search expenses..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button className="search-icon">🔍</button>
      </div>

      {/* 🏷️ Filter Buttons */}
      <button
        className={`btn ${activeCategory === "ALL" ? "active" : ""}`}
        onClick={() => handleCategory("ALL")}
      >
        All Expenses
      </button>

      <button
        className={`btn ${activeCategory === "Groceries" ? "active" : ""}`}
        onClick={() => handleCategory("Groceries")}
      >
        Groceries
      </button>

      <button
        className={`btn ${activeCategory === "Food & Drinks" ? "active" : ""}`}
        onClick={() => handleCategory("Food & Drinks")}
      >
        Food & Drinks
      </button>

      <button
        className={`btn ${activeCategory === "Travel" ? "active" : ""}`}
        onClick={() => handleCategory("Travel")}
      >
        Travel
      </button>

      <button
        className={`btn ${activeCategory === "Health" ? "active" : ""}`}
        onClick={() => handleCategory("Health")}
      >
        Health
      </button>

      {/* ➕ Add Button */}
      <button onClick={onAddExpense} className="btn add-btn">
        + Add Expense
      </button>
    </div>
  );
}

export default Controls;