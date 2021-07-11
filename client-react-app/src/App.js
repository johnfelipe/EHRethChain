import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import PopUpModal from "./components/Modal";

// import InstallMetaMask from "./components/InstallMetaMask";
import Wallet from './components/Wallet';


window.load = function () {
  console.log('DApp is loading');
}


export default function App() {

  // const [accounts, setAccounts] = useState("");


  // async function enableEth() {
  //   if(typeof window.ethereum !== 'undefined') {
  //     let walletAccounts = await window.ethereum.request({method: 'eth_requestAccounts'}).catch(err => console.log(err));

  //     setAccounts(walletAccounts);
  //   }
  //   else {
  //     console.log("You Dont have matamask Installed");
  //   }


  // }


  return (
    <div className="container">
      {/* <PopUpModal 
        button_name = "Connect Wallet"
        modal_heading = "Ethereum Wallet"
        modal_body = "You dont have any wallet.">
          <InstallMetaMask />
        </PopUpModal>
      <button onClick={enableEth}>Connect wallet</button> */}
      {/* {accounts} */}

      <Wallet button_name = "Connect"/>
    </div>
    );
}
