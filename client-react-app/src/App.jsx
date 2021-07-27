import React, { useState } from "react";

// import "./styles.css";

// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import PageNotFound from "./components/PageNotFound";
// import ProtectedRoute from "./components/Protected.route";

// import LandingPage from "./pages/LandingPage";
// import IssueDoctorID from "./pages/issueDoctorID/IssueDoctorID";
// import HomePage from "./pages/HomePage";

import { ethers } from "ethers";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

// require("dotenv").config();

const greeterAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

{
  /* <Router>
<Switch>
  <Route exact path="/" component={LandingPage} />
  <Route exact path="/issueDoctorID" component={IssueDoctorID} />
  <ProtectedRoute path="/home" component={HomePage} />
  <Route path="*" component={PageNotFound} />
</Switch>
</Router> */
}

function App() {
  const [greeting, setGreetingValue] = useState("");

  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  async function fetchGreeting() {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log("is metamask ", await window.ethereum.isMetaMask);

      // let tx = {
      //   to: greeterAddress,
      //   from: ownerWallet.address
      // }

      // ownerWallet.call(

      // )

      const contract = new ethers.Contract(
        greeterAddress,
        Greeter.abi,
        provider
      );

      console.log("calling from address: ", provider.getSigner().getAddress());
      console.log("connected accounts: ", await provider.listAccounts());

      try {
        const data = await contract.greet();

        console.log("data : ", data);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }

  async function setGreeting() {
    if (!greeting) return;
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();

      alert(window.ethereum.isMetaMask);

      alert((await signer.getAddress()).toString());

      // let ownerWallet = new ethers.Wallet(
      //   "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
      //   provider
      // );

      // let params = [
      //   {
      //     from: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      //     to: greeterAddress,
      //   },
      // ];

      // window.ethereum
      //   .request({ method: "eth_sendTranscation", params })
      //   .then((r) => console.log(r))
      //   .catch((err) => console.log(err));

      //9999.9946

      const contract = new ethers.Contract(greeterAddress, Greeter.abi, signer);

      try {
        const transcation = await contract.setGreeting(greeting);
        setGreetingValue("");
        await transcation.wait();
        fetchGreeting();
      } catch (err) {
        alert(err.message);
      }
    }
  }

  return (
    <>
      <button onClick={fetchGreeting}>Fetch Greeting</button>
      <button onClick={setGreeting}>Set Greeting</button>
      <input
        onChange={(e) => setGreetingValue(e.target.value)}
        placeholder="Set Greeting"
        value={greeting}
      />
    </>
  );
}

export default App;
