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

  return (
    <main>
      <Navbar />
      <section className="container">
        <Outlet />
      </section>
    </main>
  );
}

export default Layout;
