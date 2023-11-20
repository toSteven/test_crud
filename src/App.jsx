import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import Layout from "./Layout";
import Dashboard from "./Dashboard";
import About from "./About";
import Logout from "./Logout.";
import NotFound404 from "./NotFound404";
import LogIn from "./LogIn";
import Register from "./Register";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="about" element={<About />}></Route>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<LogIn />}></Route>
          </Route>
          <Route path="*" element={<NotFound404 />}></Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
