import React, { useContext, useState } from "react";
import "./Login.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const [show, setShow] = useState(false);
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const from = location.state?.from?.pathname || "/";

  const [error, setError] = useState("");
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        form.reset();
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message);
      });
  };
  return (
    <div className="from-container">
      <h2 className="from-title">Login</h2>
      <form onSubmit={handleLogin}>
        <div className="from-control">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" required />
        </div>
        <div className="from-control">
          <label htmlFor="password">Password</label>
          <input type={show ? "text" : "password"} name="password" id="password" required />
          <p onClick={() => setShow(!show)}>
            <small>
              {
                show ? <span>Hide Password:</span> : <span>Show Password:</span>
              }
            </small>
          </p>
        </div>
        <p className="text-error">{error}</p>
        <input type="submit" className="btn-submit" value="login" />
      </form>
      <p>
        <small>
          New to ema-john? <Link to="/signup">Create New Account</Link>
        </small>
      </p>
    </div>
  );
};

export default Login;
