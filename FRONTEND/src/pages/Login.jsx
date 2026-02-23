import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api.js";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // CHECK IF THIS EXISTS
  console.log("🔥 useNavigate hook:", useNavigate);
  const navigate = useNavigate();
  console.log("🔥 navigate function:", navigate);

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("🔥 handleLogin called");
    console.log("🔥 navigate inside handler:", navigate); 
    
    setError("");
    setLoading(true);

    try {
      const res = await API.post("auth/login", {
        email,
        password,
      });

      console.log("✅ Login success");
      console.log("🔥 About to navigate...");
      navigate("/chat"); // THIS IS LINE 65 in your original code
      console.log("🔥 After navigate");
      
    } catch (err) {
      console.log("❌ Login Failed:", err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <style>{`
        .login-box {
          max-width: 350px;
          margin: 80px auto;
          padding: 25px;
          border: 1px solid #ddd;
          border-radius: 8px;
          font-family: Arial, sans-serif;
        }

        .login-box h2 {
          margin-bottom: 20px;
          text-align: center;
        }

        .login-box input {
          width: 100%;
          padding: 8px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .login-box input:focus {
          outline: none;
          border-color: #2563eb;
        }

        .login-box button {
          width: 100%;
          padding: 8px;
          border: none;
          border-radius: 5px;
          background-color: #2563eb;
          color: white;
          cursor: pointer;
        }

        .login-box button:disabled {
          background-color: #999;
          cursor: not-allowed;
        }

        .error {
          color: red;
          font-size: 14px;
          margin-bottom: 10px;
          text-align: center;
        }
      `}</style>

      <div className="login-box">
        <h2>Login</h2>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
