import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Layout from "../../components/Layout";
import MainContainer from "../../components/MainContainer";
import Account from "../../components/Account";
import SystemUserCard from "../../components/SystemUserCard";

import { AiOutlineInfoCircle } from "react-icons/ai";

import { useHistory } from "react-router";

import "../../styles/registerUsers.css";

import AdminImage from "../../assets/images/admin-avatar.png";
import PatientImage from "../../assets/images/patient-avatar.png";
import ProviderImage from "../../assets/images/provider-avatar.png";
import EntityImage from "../../assets/images/entity-avatar.png";

import { Popover } from "antd";

function RegisterUsers() {
  let history = useHistory();

  const patientInfo = (
    <div>
      <p>Patient Registration</p>
    </div>
  );

  const adminInfo = (
    <div>
      <p>Admin Login, to verify your credentials or issue new one.</p>
    </div>
  );

  const providerInfo = (
    <div>
      <p>Provider Login, to verify your credentials or issue new one.</p>
    </div>
  );

  const entityInfo = (
    <div>
      <p>
        Entity represent other system users, like researchers, pharmaceutical
        companies, etc...
      </p>
      <p>Entity Login, to verify your credentials or issue new one.</p>
    </div>
  );

  return (
    <>
      <Layout>
        <MainContainer>
          <Container>
            <Account />
            <Row>
              <Col className="register-text">You are not registered yet.</Col>
            </Row>
            <Row>
              <Col>
                <p className="system-users-text">System Users</p>
              </Col>
            </Row>
            <Row className="users-container">
              <SystemUserCard
                image={<img src={PatientImage} alt="patient avatar" />}
                user={
                  <div>
                    {" "}
                    <Popover content={patientInfo}>
                      <span className="info-icon">
                        Patient <AiOutlineInfoCircle />
                      </span>{" "}
                    </Popover>
                  </div>
                }
                button={
                  <button onClick={() => history.push("/home/registerPatient")}>
                    {" "}
                    Register{" "}
                  </button>
                }
              />
              <SystemUserCard
                image={<img src={AdminImage} alt="admin avatar" />}
                user={
                  <div>
                    {" "}
                    <Popover content={adminInfo}>
                      <span className="info-icon">
                        Admin <AiOutlineInfoCircle />
                      </span>{" "}
                    </Popover>
                  </div>
                }
                button={
                  <button onClick={() => history.push("/home/adminLogin")}>
                    {" "}
                    Login{" "}
                  </button>
                }
              />
              <SystemUserCard
                image={<img src={ProviderImage} alt="provider avatar" />}
                user={
                  <div>
                    {" "}
                    <Popover content={providerInfo}>
                      <span className="info-icon">
                        Provider <AiOutlineInfoCircle />
                      </span>{" "}
                    </Popover>
                  </div>
                }
                button={
                  <button onClick={() => history.push("/home/doctorLogin")}>
                    {" "}
                    Login{" "}
                  </button>
                }
              />
              <SystemUserCard
                image={<img src={EntityImage} alt="entity avatar" />}
                user={
                  <div>
                    {" "}
                    <Popover content={entityInfo}>
                      <span className="info-icon">
                        Entity <AiOutlineInfoCircle />
                      </span>{" "}
                    </Popover>
                  </div>
                }
                button={
                  <button onClick={() => history.push("/home/entityLogin")}>
                    {" "}
                    Login{" "}
                  </button>
                }
              />
            </Row>
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default RegisterUsers;
