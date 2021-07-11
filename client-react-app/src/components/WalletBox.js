import React from 'react';

import "./WalletBox.css";

function WalletBox(props) {

    async function enableEth() {
        await window.ethereum.request({method: 'eth_requestAccounts'}).catch(err => console.log(err));
    }

    return (
    <div className="walletBox" onClick={enableEth}>
        <img className="walletImg" src={props.walletImg} alt=""/>
        <h3 className="walletName">{props.walletName}</h3>
        <p className="walletDescription">{props.walletDescription}</p>
    </div>
    );
}

export default WalletBox;