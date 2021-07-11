import react, { useState } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import {addToIPFS, getFromIPFS} from "./ipfs";
import Blockie from "./components/Blockie";


import Web3 from 'web3';


if (!ethereum || !ethereum.isMetaMask) {
  throw new Error('Please install MetaMask.')
}

import ConnectMetaMask from "./components/ConnectMetaMask";

// console.log(Web3.givenProvider);
//
//
// const ethEnabled = () => {
//   if(window.web3){
//     window.web3 = new Web3(window.web3.currentProvider);
//     window.ethereum.enable();
//     return true;
//   }
//   return false;
// }
//
//
// if(!ethEnabled()){
//   alert("Please install MetaMask to use this dApp!");
// } else{
//   alert('You are fine!');
// }


// window.addEventListener('load', () => {
//
//   if(window.ethereum) {
//     const web3 = new Web3(window.ethereum);
//     try {
//       window.ethereum.enable();
//       return web3;
//     } catch(error){
//       console.log(error);
//     }
//   }
//   else if(window.web3){
//     const web3 = window.web3;
//     console.log("Injected web3 detected.");
//     return web3;
//   }
//   else {
//     const provider = new Web3.providers.httpProvider('http://localhost:9545');
//     const web3 = new Web3(provider);
//     console.log('No web3 instance injected, using Local web3.');
//     return web3;
//   }
//
// })


function App() {

  const [data, setData] = useState("");
  const [hash, setHash] = useState("");
  const [fetchData, setFetchData] = useState("");
  const [dataBack, setDataBack] = useState("");



  function storeData(event) {
    setData(event.target.value);
  }


  async function sendData() {
      addToIPFS(data)
      .then(result => {
        setHash(result);
      })
      .catch(err => console.log(err));
  }



  async function getfetchData(){
    if(hash != ""){
      getFromIPFS(hash)
      .then(result => {
        setDataBack(result);
      })
    }
  }



  return (
    <div className="container">

      <ConnectMetaMask />



        <label for="data"> Data to store on IPFS </label>
        <textarea
          name="data"
          rows="5"
          cols="50"
          onChange={storeData} />
        <Button
          variant="outline-primary"

          onClick={sendData}
        >Send to IPFS</Button>
        <p> {hash != "" ? <p>Hash: {hash}</p> : null} </p>

        <br/>
        <label> Hash to get : </label>
        <input type="text" onChange={(e) => setFetchData(e.target.value) }/>
        <br/>
        <Button
          variant="outline-primary"

          onClick={getfetchData}
        > Fetch data from IPFS
        </Button>

        <p> {dataBack != "" ? <p>Data: {dataBack}</p> : null} </p>




    </div>
  );
}

export default App;
