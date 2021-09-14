import styled from "styled-components";
import { Swiper } from "swiper/react";

export const SlidesContainer = styled.div`
  width: 100%;
  height: 25vh;
  margin: 20px auto;
  /* border: 3px dashed purple; */
`;

export const MySwiper = styled(Swiper)`
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */

  border-radius: 20px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`;

export const SolutionSectionContainer = styled.div`
  background-color: #e8f6ef;
  @media screen and (max-width: 768px) {
    padding: 100px 0;
  }
`;

export const SolutionSectionWrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  height: 860px;
  width: 100%;
  max-width: 1100px;
  z-index: 1;

  margin-right: auto;
  margin-left: auto;
  padding: 0 24px;

  justify-content: center;
  align-items: center;

  /* border: 1px solid red; */
  @media screen and (max-width: 768px) {
    max-width: 100%;
    padding: 100px 0;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  width: 100%;
  flex-flow: row wrap;
  /* border: 1px solid red; */
  box-sizing: border-box;

  @media screen and (max-width: 1016px) {
    justify-content: center;
    width: 70%;
  }
`;

export const LeftFlexContainer = styled.div`
  display: flex;
  flex-direction: column;

  /* border: 1px solid green; */
  margin: 20px;

  @media screen and (max-width: 768px) {
    text-align: center;
    justify-content: center;
    width: 100%;
  }
  @media screen and (max-width: 1089px) {
    width: 100%;
    align-items: center;

    /* border: 1px solid red; */
  }
`;

export const RightFlexContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* width: 200px;
height: 400px; */
  /* border: 1px solid blue; */
  margin: 20px;
  flex-grow: 2;
`;

export const FeaturesImage = styled.img`
  width: 510px;

  @media screen and (max-width: 768px) {
    width: 50%;
    align-self: center;
    text-align: center;
  }

  @media screen and (max-width: 1089px) {
    width: 40%;
  }
`;

export const Title = styled.h1`
  font-size: 35px;
  font-weight: bold;
  color: #16c79a;

  @media screen and (max-width: 768px) {
    font-size: 25px;
  }
`;

export const SubTitle = styled.p`
  font-size: 20px;
  @media screen and (max-width: 768px) {
    font-size: 16px;
  }
`;

export const SliderContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-flow: column wrap;
  width: 130px;
  /* border: 1px solid green; */
  box-sizing: border-box;

  @media screen and (max-width: 768px) {
    width: 35%;
  }
`;

export const FeatureImg = styled.img`
  /* border: 1px solid red; */
`;

export const FeatureTxt = styled.p`
  font-size: 16px;
  font-weight: bolder;
  padding: 10px;

  @media screen and (max-width: 768px) {
    font-size: 12px;
    font-weight: normal;
    padding: 0;
    width: 100%;
  }
`;
