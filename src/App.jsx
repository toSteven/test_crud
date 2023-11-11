import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import Data from "./Data";
import Layout from "./Layout";
import Dashboard from "./Dashboard";
import InputData from "./InputData";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />}></Route>
            <Route path="data" element={<Data />}></Route>
            <Route path="input" element={<InputData />}></Route>
            <Route path="#"></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
