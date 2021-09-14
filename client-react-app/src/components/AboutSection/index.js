import React from "react";

// import {
//   AboutSectionContainer,
//   AboutSectionWrapper,
//   AboutSectionTitle,
//   Divider,
//   AboutSectionSubtitle
// } from "./AboutElements";

import SVG1 from "../../assets/images/network.svg";
import SVG2 from "../../assets/images/svg-2.svg";
import SVG3 from "../../assets/images/svg-3.svg";
import styled from "styled-components";

import { FcInfo } from "react-icons/fc";
import { FiExternalLink } from "react-icons/fi";

const AboutSectionContainer = styled.div`
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

const AboutSectionWrapper = styled.div`
  display: flex;
  z-index: 1;
  height: 860px;
  width: 100%;
  max-width: 1100px;
  margin-right: auto;

  margin-left: auto;
  padding: 0 24px;
  justify-content: center;

  @media screen and (max-width: 1089px) {
    height: auto;
    z-index: 0;
  }

  /* border: 1px solid green; */
`;

const GridContainer = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 50px 1fr;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 30px;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    font-size: 25px;
  }

  &::before {
    content: "";
    flex: 1;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  &::after {
    content: "";
    flex: 1;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
  }

  &:not(:empty)::before {
    margin-right: 0.25rem;
  }

  &:not(:empty)::after {
    margin-right: 0.25rem;
  }
`;

const SubTitle = styled.div`
  text-align: center;
  font-size: 20px;
  /* font-weight: bold; */

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
  /* border: 1px solid red; */
`;

const CardContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  justify-content: center;
  margin: 10px;
`;

const Card = styled.div`
  padding: 20px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  margin: 10px;
  width: 320px;
  border-radius: 10px;
  padding: 0;
  transition: transform 0.3s ease;

  @media screen and (max-width: 768px) {
    margin: 20px 0;
    width: 90%;
  }

  &:hover {
    transform: scale(1.025);
    filter: drop-shadow(0 0 0.75rem lightgrey);
  }
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 40px;
`;

const CardContentContainer = styled.div`
  grid-row-start: 1;
  grid-row-end: 1;

  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const CardLinkWrapper = styled.div`
  grid-row-start: 2;
  border-top: 2px solid rgba(0, 0, 0, 0.1);
  padding: 10px 20px;
  display: flex;
`;

const Icon = styled.div`
  align-self: flex-start;
  font-size: 20px;
  padding-right: 5px;

  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

const CardBody = styled.div`
  align-self: center;
`;

const CardPartWrap = styled.div`
  padding: 10px;
  text-align: center;
`;

const CardImage = styled.img`
  width: 210px;
  height: 210px;

  @media screen and (max-width: 768px) {
    width: 80%;
  }
`;

const LearnMoreTxt = styled.a`
  padding-left: 5px;
  font-size: 14px;
  font-weight: bold;
  color: #1890ff;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const CardTitle = styled.p`
  font-size: 16px;
  font-weight: bold;
  text-transform: uppercase;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const CardDescription = styled.p`
  font-size: 15px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

function AboutSection() {
  return (
    <AboutSectionContainer id="about">
      <AboutSectionWrapper>
        <GridContainer>
          <Title>About</Title>
          <SubTitle>some of the main technologies of this application</SubTitle>
          <CardContainer>
            <Card>
              <CardGrid>
                <CardContentContainer>
                  <Icon>
                    <FcInfo />
                  </Icon>
                  <CardBody>
                    <CardPartWrap>
                      <CardImage src={SVG1} alt="network" />
                    </CardPartWrap>
                    <CardPartWrap>
                      <CardTitle>blockchain technology (bct)</CardTitle>
                    </CardPartWrap>
                    <CardPartWrap>
                      <CardDescription>
                        {" "}
                        Providing a public distributed and decentralised ledger
                        governed by smart contracts for assets management and
                        security.{" "}
                      </CardDescription>
                    </CardPartWrap>
                  </CardBody>
                </CardContentContainer>
                <CardLinkWrapper>
                  {" "}
                  <Icon>
                    <FiExternalLink />{" "}
                  </Icon>
                  <LearnMoreTxt href="https://ethereum.org/en/" target="_blank">
                    {" "}
                    Learn More{" "}
                  </LearnMoreTxt>
                </CardLinkWrapper>
              </CardGrid>
            </Card>
            <Card>
              {" "}
              <CardGrid>
                <CardContentContainer>
                  <Icon>
                    <FcInfo />
                  </Icon>
                  <CardBody>
                    <CardPartWrap>
                      <CardImage src={SVG2} alt="file" />
                    </CardPartWrap>
                    <CardPartWrap>
                      <CardTitle>INTERPLANETART FILE SYSTEM (IFPS)</CardTitle>
                    </CardPartWrap>
                    <CardPartWrap>
                      <CardDescription>
                        Distributed and dencetralised peer-to-peer file system
                        relies on cryptography and content-addressing for data
                        storage.
                      </CardDescription>
                    </CardPartWrap>
                  </CardBody>
                </CardContentContainer>
                <CardLinkWrapper>
                  {" "}
                  <Icon>
                    <FiExternalLink />{" "}
                  </Icon>
                  <LearnMoreTxt href="https://ipfs.io/" target="_blank">
                    {" "}
                    Learn More{" "}
                  </LearnMoreTxt>
                </CardLinkWrapper>
              </CardGrid>
            </Card>
            <Card>
              <CardGrid>
                <CardContentContainer>
                  <Icon>
                    <FcInfo />
                  </Icon>
                  <CardBody>
                    <CardPartWrap>
                      <CardImage src={SVG3} alt="card" />
                    </CardPartWrap>
                    <CardPartWrap>
                      <CardTitle>
                        SELF-SOVEREIGN IDENTIY (SSI) exchange
                      </CardTitle>
                    </CardPartWrap>
                    <CardPartWrap>
                      <CardDescription>
                        Trinsic is a digital blockchain based verifiable data
                        exchange platform between issuers, holders and verifiers
                        of credentials.
                      </CardDescription>
                    </CardPartWrap>
                  </CardBody>
                </CardContentContainer>
                <CardLinkWrapper>
                  {" "}
                  <Icon>
                    <FiExternalLink />{" "}
                  </Icon>
                  <LearnMoreTxt href="https://trinsic.id/" target="_blank">
                    {" "}
                    Learn More{" "}
                  </LearnMoreTxt>
                </CardLinkWrapper>
              </CardGrid>
            </Card>
          </CardContainer>
        </GridContainer>
      </AboutSectionWrapper>
    </AboutSectionContainer>
  );
}

export default AboutSection;
