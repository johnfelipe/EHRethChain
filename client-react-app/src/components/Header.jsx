import React from 'react';
import { Navbar } from 'react-bootstrap';

import ReactTooltip from 'react-tooltip';

import "./Header.css"

function Header() {

    return (
    <div data-tip="Clicking either the logo/title or the name will direct you to the github repository hosting the source code" data-for="github">
        <Navbar>
            <Navbar.Brand href="https://github.com/mohammedfajer/EHRethChain" target="_blank"> 
                <i className="fas fa-laptop-medical"></i>
                EHRethChain
                <ReactTooltip
                        id="github"
                        multiline={true}
                    />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                Created by : <a href="https://github.com/mohammedfajer/EHRethChain" rel="noreferrer" target="_blank">Mohammed Fajer</a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    </div>
    );

    
}

export default Header;