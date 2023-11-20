import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "./Config";
import { useState } from "react";

function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = () => {
    if (email !== "" && password !== "") {
      const auth = getAuth(firebaseApp);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          alert("Sign in successful");
          // Redirect or perform other actions on successful login
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert(`Error: ${errorMessage}`);
        });
    } else {
      alert("Please enter both email and password");
    }
  };

  return (
    <>
      <section className="container mt-5">
        <div className="card">
          <div className="card-body">
            <h1 className="fw-bold text-center">Login</h1>

            <div className="form-floating my-3">
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label htmlFor="password">Password</label>
            </div>

            <button className="btn btn-dark" onClick={() => handleLogin()}>
              Log In
            </button>
            <hr />
            <Link to="/register">Register here.</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default LogIn;
