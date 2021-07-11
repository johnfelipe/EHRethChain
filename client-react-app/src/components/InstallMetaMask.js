import React from 'react';
import { Alert } from 'react-bootstrap';


function InstallMetaMask(props) {

    

    return (
        <div>
            <Alert variant="warning">
                  
                  <p>You dont have MetaMask browser extension to use this app.</p> 
                  <Alert.Link href="https://metamask.io/" target="_blank">Here</Alert.Link> you can install the chrome/firefox browser extension.
            </Alert>
        </div>
    );
}

export default InstallMetaMask;