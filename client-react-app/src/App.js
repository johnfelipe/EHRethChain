import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Wallet from './components/Wallet';
import Header from './components/Header';

import "./App.css";

export default function App() {
  return (
    <div className="container">
      {/* <Wallet button_name = "Connect"/> */}

      <Header />
      <div className="connect">
        <h3> 
          Welcome to the electronic health record (EHRethChain) powered by Ethereum Blockchain.
        </h3>

        <Wallet button_name = "Connect"/>

      </div>
    </div>
    );
}

