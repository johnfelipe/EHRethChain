import React, {useState} from 'react';
import { Button, Modal, Alert } from 'react-bootstrap';
import WalletBox from './WalletBox';
import InstallMetaMask from './InstallMetaMask';

import "./Modal.css";

function PopUpModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    
  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          {props.button_name}
        </Button>
  
        <Modal size="lg" show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter">
          {/* <Modal.Header closeButton>
            <Modal.Title>{props.modal_heading}</Modal.Title>
          </Modal.Header> */}

          <Modal.Body>
              {/* <WalletBox
                    walletImg="https://cdn.iconscout.com/icon/free/png-512/metamask-2728406-2261817.png"
                    walletName="MetaMask"
                    walletDescription="Connect to your MetaMask Wallet"
                />  */}

              {/* <Alert variant="warning">
                  You dont jave MetaMask installed. 
                  <Alert.Link href="#">Here</Alert.Link> you can install chrome/firefox browser extension.
                  
              </Alert> */}

              {/* <InstallMetaMask /> */}
                {/* <hr className="modal-hr"/> */}
                {/* <WalletBox
                    walletImg="https://gblobscdn.gitbook.com/spaces%2F-LJJeCjcLrr53DcT1Ml7%2Favatar.png?alt=media"
                    walletName="WalletConnect"
                    walletDescription="Scan with WalletConnect to conenct"
                />     */}
           </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default PopUpModal;