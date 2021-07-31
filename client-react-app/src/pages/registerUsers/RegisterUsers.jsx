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

{
  /* <Row>
              <Col className="registerBtn">
                <button onClick={() => history.push("/home/registerPatient")}>
                  Patient
                </button>
              </Col>
              <Col className="registerBtn">
                <button onClick={() => history.push("/home/doctorLogin")}>
                  {" "}
                  Provider{" "}
                </button>
              </Col>
            </Row> */
}

function RegisterUsers() {
  let history = useHistory();
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
                    <span className="info-icon">
                      Patient <AiOutlineInfoCircle />
                    </span>{" "}
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
                    <span className="info-icon">
                      Admin <AiOutlineInfoCircle />
                    </span>{" "}
                  </div>
                }
                button={<button> Login </button>}
              />
              <SystemUserCard
                image={<img src={ProviderImage} alt="provider avatar" />}
                user={
                  <div>
                    {" "}
                    <span className="info-icon">
                      Provider <AiOutlineInfoCircle />
                    </span>{" "}
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
                    <span className="info-icon">
                      Entity <AiOutlineInfoCircle />
                    </span>{" "}
                  </div>
                }
                button={<button> Login </button>}
              />
            </Row>
          </Container>
        </MainContainer>
      </Layout>
    </>
  );
}

export default RegisterUsers;
