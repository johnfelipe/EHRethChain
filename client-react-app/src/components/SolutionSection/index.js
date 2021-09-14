import React, { useRef, useState } from "react";

import "./styles.css";
import FeaturesSvg from "../../assets/images/svg-4.svg";

import SVG1 from "../../assets/images/1.svg";
import SVG2 from "../../assets/images/2.svg";
import SVG3 from "../../assets/images/3.svg";
import SVG4 from "../../assets/images/4.svg";
import SVG5 from "../../assets/images/5.svg";
import SVG6 from "../../assets/images/6.svg";
import SVG7 from "../../assets/images/7.svg";
import SVG8 from "../../assets/images/8.svg";
import SVG9 from "../../assets/images/9.svg";
import SVG10 from "../../assets/images/10.svg";
import SVG11 from "../../assets/images/11.svg";
import SVG12 from "../../assets/images/12.svg";
import SVG13 from "../../assets/images/13.svg";
import SVG14 from "../../assets/images/14.svg";

// Import Swiper React components
import { SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

import {
  SolutionSectionContainer,
  SolutionSectionWrapper,
  FlexContainer,
  LeftFlexContainer,
  RightFlexContainer,
  FeaturesImage,
  Title,
  SubTitle,
  SliderContentContainer,
  FeatureImg,
  FeatureTxt,
  SlidesContainer,
  MySwiper,
} from "./SolutionElements";

// import Swiper core and required modules
import SwiperCore, { Mousewheel, Pagination } from "swiper/core";

// install Swiper modules
SwiperCore.use([Mousewheel, Pagination]);

function SolutionSection(props) {
  let slides = (
    <SlidesContainer>
      <MySwiper
        direction={"vertical"}
        slidesPerView={1}
        spaceBetween={10}
        mousewheel={true}
        pagination={{
          clickable: true,
        }}
      >
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG1} alt="1" />

            <FeatureTxt>Decentralisation</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG2} alt="2" />
            <FeatureTxt>Distributed</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG3} alt="3" />
            <FeatureTxt>Security</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG4} alt="4" />
            <FeatureTxt>Privacy</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG5} alt="5" />
            <FeatureTxt>Digial Ledger</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG6} alt="6" />
            <FeatureTxt>Anonymity</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG7} alt="7" />
            <FeatureTxt>Verifiable</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG8} alt="8" />
            <FeatureTxt>Transparency</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG9} alt="9" />
            <FeatureTxt>Scalability</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG10} alt="10" />
            <FeatureTxt>Non-reputable</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG11} alt="11" />
            <FeatureTxt>Trustless operations</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG12} alt="12" />
            <FeatureTxt>Cryptographically secure</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG13} alt="13" />
            <FeatureTxt>Chronological</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
        <SwiperSlide>
          <SliderContentContainer>
            <FeatureImg src={SVG14} alt="14" />
            <FeatureTxt>Immutability</FeatureTxt>
          </SliderContentContainer>
        </SwiperSlide>
      </MySwiper>
    </SlidesContainer>
  );
  return (
    <SolutionSectionContainer id="solution">
      <SolutionSectionWrapper>
        <FlexContainer>
          <LeftFlexContainer>
            <Title>Solution</Title>

            <SubTitle>some of the characteristics of this application</SubTitle>

            {slides}
          </LeftFlexContainer>
          <RightFlexContainer>
            <FeaturesImage src={FeaturesSvg} alt="features" />
          </RightFlexContainer>
        </FlexContainer>
      </SolutionSectionWrapper>
    </SolutionSectionContainer>
  );
}

export default SolutionSection;
