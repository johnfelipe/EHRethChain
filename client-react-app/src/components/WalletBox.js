import React, { useState } from 'react';

import "./WalletBox.css";

function WalletBox(props) {

    let account = "";
    let register = false;

    function login(){
        if(register == true){
            alert('In');
            return (<div>You are logged in!</div>);
        }
        else {
            alert('No');
        }
    }

    async function enableEth() {
        let accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
        .catch(err => console.log(err));

        account = accounts[0];
        alert(account);
        register = true;
    }

    return (
    <div className="walletBox" onClick={() => {
        enableEth().then(() => login() );

    }}>
        <img className="walletImg" src={props.walletImg} alt=""/>
        <h3 className="walletName">{props.walletName}</h3>
        <p className="walletDescription">{props.walletDescription}</p>
    </div>
    );
}

export default WalletBox;