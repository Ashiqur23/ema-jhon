import React, { useContext, useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
const SignUp = () => {
  const [error, setError] = useState("");
  const { createUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ok");
    const from = e.target;
    const email = from.email.value;
    const password = from.password.value;
    const confirm = from.confirm.value;
    console.log(email, password, confirm);
    setError("");
    if (password !== confirm) {
      setError("Your password did not match");
      return;
    } else if (password.length < 6) {
      setError("password must be 6 characters or large");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);
        from.reset()
      })
      .catch((err) => {
        console.log(err.message);
        setError(err.message);
      });
  };
  return (
    <div className="from-container">
      <h2 className="from-title">Sign up</h2>

      <form onSubmit={handleSubmit}>
        <div className="from-control">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" id="email" required />
        </div>
        <div className="from-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <div className="from-control">
          <label htmlFor="confirm">Confirm Password</label>
          <input type="password" name="confirm" id="confirm" required />
        </div>
        <input type="submit" className="btn-submit" value="Sign up" />
      </form>
      <p>
        <small>
          Already have an account? <Link to="/login">Login</Link>
        </small>
      </p>
      <p className="text-error">{error}</p>
    </div>
  );
};

export default SignUp;
