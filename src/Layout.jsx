import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

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
