import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import Wallet from "./components/Wallet";
import Header from "./components/Header";

import "./App.css";

// !hey this code is not work
// ? is this still working
// TODO this function is not finished

function App() {
  return (
    <div className="container">
      <Header />
      <div className="connect">
        <h3>
          {" "}
          Welcome to the electronic health record (EHRethChain) DApp powered by
          Ethereum Blockchain.{" "}
        </h3>
        <Wallet button_name="Connect" />
      </div>
    </div>
  );
}

export default App;
