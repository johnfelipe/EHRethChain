import React, { useState, useEffect } from "react";

import "./App.css";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PageNotFound from "./components/PageNotFound";
import ProtectedRoute from "./components/Protected.route";

import LandingPage from "./pages/LandingPage";
import IssueUserID from "./pages/issueUserID/IssueUserID";
import HomePage from "./pages/HomePage";

import Home from "./pages";

// import { ethers } from "ethers";
// import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

require("dotenv").config();

// const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

// {
//   /* <Router>
// <Switch>
//   <Route exact path="/" component={LandingPage} />
//   <Route exact path="/issueDoctorID" component={IssueDoctorID} />
//   <ProtectedRoute path="/home" component={HomePage} />
//   <Route path="*" component={PageNotFound} />
// </Switch>
// </Router> */
// }

function App() {
  const [items, setItems] = useState([]);
  // const [reload, setReload] = useState(false);
  // const [greeting, setGreetingValue] = useState("");

  // async function requestAccount() {
  //   await window.ethereum.request({ method: "eth_requestAccounts" });
  // }

  // async function fetchGreeting() {
  //   if (typeof window.ethereum !== "undefined") {
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     // console.log("is metamask ", await window.ethereum.isMetaMask);

  //     // let tx = {
  //     //   to: greeterAddress,
  //     //   from: ownerWallet.address
  //     // }

  //     // ownerWallet.call(

  //     // )

  //     const contract = new ethers.Contract(
  //       greeterAddress,
  //       Greeter.abi,
  //       provider
  //     );

  //     console.log("calling from address: ", provider.getSigner().getAddress());
  //     console.log("connected accounts: ", await provider.listAccounts());

  //     try {
  //       const data = await contract.greet();

  //       console.log("data : ", data);
  //     } catch (err) {
  //       console.log("Error: ", err);
  //     }
  //   }
  // }

  // async function setGreeting() {
  //   if (!greeting) return;
  //   if (typeof window.ethereum !== "undefined") {
  //     await requestAccount();
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);

  //     const signer = provider.getSigner();

  //     alert(window.ethereum.isMetaMask);

  //     alert((await signer.getAddress()).toString());

  //     // let ownerWallet = new ethers.Wallet(
  //     //   "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
  //     //   provider
  //     // );

  //     // let params = [
  //     //   {
  //     //     from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
  //     //     to: greeterAddress,
  //     //   },
  //     // ];

  //     // window.ethereum
  //     //   .request({ method: "eth_sendTranscation", params })
  //     //   .then((r) => console.log(r))
  //     //   .catch((err) => console.log(err));

  //     //9999.9946

  //     const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

  //     try {
  //       const transcation = await contract.setGreeting(greeting);
  //       setGreetingValue("");
  //       await transcation.wait();
  //       fetchGreeting();
  //     } catch (err) {
  //       alert(err.message);
  //     }
  //   }
  // }

 // useEffect(() => {
    // let request = new XMLHttpRequest();
    // request.open("GET", "http://localhost:8000/inventory");
    // request.responseType = "text";

    // request.onload = () => {
    //   console.log(request.response);
    // };
    // getItems();

    // fetch("http://localhost:8000/inventory", { method: "GET", mode: "cors" })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data));
    // request.send();
 // }, []);

  // async function getItems() {
  //   let options = {
  //     method: "GET",
  //     mode: "cors",
  //   };
  //   try {
  //     const res = await fetch("http://localhost:8000/inventory", options);
  //     const data = await res.json();
  //     console.log(data);
  //     setItems(data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  return (
    <>
      {/* <h1>hi</h1>
      <h1>Items</h1>

      {items.map((item, index) => (
        <div key={index}>
          <p> {item.UID} </p>
          <p> {item.Name} </p>
          <p> {item.Desc} </p>
          <p> {item.Price} </p>
        </div>
      ))} */}

      /* <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/issueUserID" component={IssueUserID} />
          <ProtectedRoute path="/home" component={HomePage} />
          <Route path="*" component={PageNotFound} />
       
        </Switch>
      </Router> 
    </>
  );
}

export default App;
