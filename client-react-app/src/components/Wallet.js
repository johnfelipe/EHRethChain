import React, {useState} from 'react';


import WalletBox from "./WalletBox";
import InstallMetaMask from './InstallMetaMask';
import { Button, Modal } from 'react-bootstrap';

import ReactTooltip from 'react-tooltip';


import "./Wallet.css";

function Wallet(props) {
    const [isMetaMaskFound, setIsMetaMaskFound] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    async function checkForWallet() {
        if(typeof window.ethereum !== 'undefined') {
          setIsMetaMaskFound(true);
        }
        else {
          console.log("You Dont have matamask Installed");
          setIsMetaMaskFound(false);
        }
    }

    return (
        <div className="wallet">
            <div className="connectButton" data-tip="Connect to a wallet in order to use this DApp" data-for="button-connect">
                <Button variant="primary" size="lg" onClick={() => {
                    handleShow();
                    checkForWallet();
                }}>
                   {props.button_name}
                    <ReactTooltip
                        id="button-connect"
                        multiline={true}
                    />
                </Button>
            </div>

            <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
                <Modal.Body>
                    {isMetaMaskFound ? <WalletBox
                                    walletImg="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
                                    walletName="MetaMask"
                                    walletDescription="Connect to your MetaMask Wallet"
                                /> : <InstallMetaMask />}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>  
      </div> 
    );
}

export default Wallet;

