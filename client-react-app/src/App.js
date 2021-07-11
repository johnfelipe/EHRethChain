import react, { useState } from "react";

import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

import 'bootstrap/dist/css/bootstrap.min.css';

import "./App.css";


import {addToIPFS, getFromIPFS} from "./ipfs";

import Blockie from "./components/Blockie";



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
    <div>


        <Blockie address="0x2134kladjkjase" />

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
