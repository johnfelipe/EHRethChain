import React, { useState } from "react";
import HomeSection from "../components/HomeSection";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import { homeObjOne } from "../components/HomeSection/data";
import AboutSection from "../components/AboutSection";
import DemoSection from "../components/DemoSection";
import SolutionSection from "../components/SolutionSection";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer/index";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <HomeSection {...homeObjOne} />
      <AboutSection />
      <SolutionSection />
      <DemoSection />
      <ContactSection />
      <Footer />
    </>
  );
};
export default Home;
