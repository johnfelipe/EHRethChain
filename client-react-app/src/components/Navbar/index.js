import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import {
  Nav,
  NavbarContainer,
  NavLogo,
  MobileIcon,
  NavMenu,
  NavItem,
  NavLinks,
  NavBtn,
  NavBtnLink,
} from "./NavbarElements";

import { animateScroll as scroll } from "react-scroll";

import { IconContext } from "react-icons/lib";

function Navbar({ toggle, ...restProps }) {
  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNav);
    return () => {
      window.removeEventListener("scroll", changeNav);
    };
  }, []);

  const toggleHome = () => {
    scroll.scrollToTop();
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <Nav scrollNav={scrollNav}>
          <NavbarContainer>
            <NavLogo to="/" onClick={toggleHome}>
              EHRethChain
            </NavLogo>
            <MobileIcon onClick={toggle}>
              <FaBars />
            </MobileIcon>
            <NavMenu>
              <NavItem>
                <NavLinks
                  to="about"
                  smooth={true}
                  duration={100}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  {" "}
                  About{" "}
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="solution"
                  smooth={true}
                  duration={100}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  {" "}
                  Solution{" "}
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="demo"
                  smooth={true}
                  duration={100}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  {" "}
                  Demo{" "}
                </NavLinks>
              </NavItem>
              <NavItem>
                <NavLinks
                  to="contact"
                  smooth={true}
                  duration={100}
                  spy={true}
                  exact="true"
                  offset={-80}
                >
                  {" "}
                  Contact{" "}
                </NavLinks>
              </NavItem>
            </NavMenu>
            <NavBtn onClick={restProps.connectOnClick}>
              <NavBtnLink primary={"true"}>Connect</NavBtnLink>
            </NavBtn>
          </NavbarContainer>
        </Nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
