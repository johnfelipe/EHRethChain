import React, {useState} from "react";
import Web3 from 'web3';
import Web3Connect from "web3connect";
import WalletConnectProvider from "@walletconnect/web3-provider";

function ConnectMetaMask(props) {

  const [account, setAccount] = useState("");

  async function getAccount() {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      setAccount(accounts[0]);
    }


  }


  return (
    <div>
      <Web3Connect.Button
        network="mainnet" // optional
        providerOptions={{
          walletconnect: {
            package: WalletConnectProvider, // required
            options: {
              infuraId: "INFURA_ID" // required
            }
          },
        }}
        onConnect={(provider: any) => {
          const web3 = new Web3(provider); // add provider to web3
          getAccount()
          .catch(err => console.log(err));

        }}
        onClose={() => {
          console.log("Web3Connect Modal Closed"); // modal has closed
          
        }}
      />

      <h2> Account : {account} </h2>

    </div>
  );

}

export default ConnectMetaMask;
