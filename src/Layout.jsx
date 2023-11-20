import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseApp from "./Config";

function Layout() {
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
