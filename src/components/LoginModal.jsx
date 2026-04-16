
import { useState } from "react";

function LoginModal({ setUser, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const BASE_URL = import.meta.env.VITE_API_URL;
    const url = isRegister
      ? `${BASE_URL}/auth/register`
  : `${BASE_URL}/auth/login`;

    const body = isRegister
      ? { name, email }
      : { email };

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ store everything
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setUser(data.user);
      setIsLoggedIn(true);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">

        <h2 className="modal-head">
          {isRegister ? "Register" : "Login"}
        </h2>

        <form onSubmit={handleSubmit}>
          
          {isRegister && (
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input"
            />
          )}

          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <button type="submit" className="btn">
            {isRegister ? "Register" : "Login"}
          </button>
        </form>

        <p
          className="toggle-text"
          style={{ color: "black" }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister
            ? "Already have account? Login"
            : "New user? Register"}
        </p>

      </div>
    </div>
  );
}

export default LoginModal;