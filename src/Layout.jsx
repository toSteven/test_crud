import { useState, useEffect } from "react";
import { Route, Outlet } from "react-router-dom";
import Navbar from "./NavBar";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import firebaseApp from "./Config";

function Layout() {
  // credentials
  const [credentials, setCredentials] = useState(false);
  // credentials config
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCredentials(true);
        const uid = user.uid;
      } else {
        setCredentials(false);
        // user is signout
      }
    });
  }, []);

  // logout
  const logout = () => {
    const auth = getAuth(firebaseApp);
    signOut(auth)
      .then(() => {
        alert("You have logout!");
        setCredentials(false);
      })
      .catch((error) => {});
  };

  return (
    <main>
      <Navbar auth={credentials} logout={logout} />
      <section className="container">
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;
