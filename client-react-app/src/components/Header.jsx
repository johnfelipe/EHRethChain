import React from "react";

import { Typography, PageHeader } from "antd";

import { FaLaptopMedical } from "react-icons/fa";

// import { Container, Row, Col } from "react-bootstrap";

import "./Header.css";

const { Text, Title } = Typography;

{
  /* <header>
      <Title level={3} className="header-title">
        <Title level={3}>
          <FaLaptopMedical className="brand-logo" />
        </Title>
        EHRethChain
      </Title>

      <Title level={5} className="header-author">
        <Text type="secondary">
          Created by: <Text underline>Mohammed Fajer</Text>
        </Text>
      </Title>
    </header> */
}

function Header() {
  return (
    <header>
      <div className="header-container">
        <PageHeader
          className="site-page-header"
          onBack={() => null}
          title="Title"
          subTitle="This is a subtitle"
        />
      </div>
    </header>
  );
}

export default Header;
