import React, { Component } from "react";
import Panels from "./pages/Panels";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <div>
      <Nav />
      <Panels />
    </div>
  );
}

export default App;
