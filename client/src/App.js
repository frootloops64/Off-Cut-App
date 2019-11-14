import React, { Component } from "react";
import Panels from "./pages/Panels/Panels";
import Nav from "./components/Nav";
// import logo from "./logo.svg";
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
