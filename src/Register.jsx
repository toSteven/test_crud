import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "./Config";
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = () => {
    if (
      email !== "" &&
      password !== "" &&
      confirmPassword !== "" &&
      password === confirmPassword
    ) {
      const auth = getAuth(firebaseApp);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // User registered successfully
          const user = userCredential.user;
          alert("Registration successful");
          // Redirect or perform other actions on successful registration
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
            <h1 className="fw-bold text-center">Register</h1>

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

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="confirmpassword"
                placeholder="Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <label htmlFor="confirmpassword">Confirm Password</label>
            </div>

            <button className="btn btn-dark" onClick={() => handleRegister()}>
              Register
            </button>
            <hr />
            <Link to="/login" className="">
              Already have an account? Log in here.
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
