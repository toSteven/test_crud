import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import Layout from "./Layout";
import Dashboard from "./Dashboard";
import About from "./About";
import Logout from "./Logout.";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="logout" element={<Logout />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
