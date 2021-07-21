import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Layout from "../components/Layout";
import MainContainer from "../components/MainContainer";
import Account from "../components/Account";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import RegisterUsers from "./RegisterUsers";
import ProtectedRoute from "../components/Protected.route";
import PageNotFound from "../components/PageNotFound";
import RegisterPatient from "./RegisterPatient";
import PatientHome from "./patientHomePage/PatientHome";
import DoctorLogin from "./DoctorLogin";
import ProviderHome from "./providerHomePage/ProviderHome";

function HomePage() {
  let match = useRouteMatch();

  return (
    <>
      <Switch>
        <ProtectedRoute exact path={`${match.path}/registerUsers`}>
          <RegisterUsers />
        </ProtectedRoute>
        <ProtectedRoute exact path={`${match.path}/registerPatient`}>
          <RegisterPatient />
        </ProtectedRoute>
        <ProtectedRoute exact path={`${match.path}/doctorLogin`}>
          <DoctorLogin />
        </ProtectedRoute>

        <ProtectedRoute path={`${match.path}/providerHome`}>
          <ProviderHome />
        </ProtectedRoute>

        <ProtectedRoute path={`${match.path}/patientHome`}>
          <PatientHome />
        </ProtectedRoute>

        {/* <Route path={`${match.path}/:homeId`}>
                <Topic />
              </Route>
              <Route path={match.path}>
                <h3>Please select a topic.</h3>
              </Route> */}
        <Route exact path={match.path}>
          <Layout>
            <MainContainer>
              <Container>
                <Account />
              </Container>
            </MainContainer>
          </Layout>
        </Route>

        {/* <Route path="*" component={PageNotFound} /> */}
      </Switch>
    </>
  );
}

function Topic() {
  let { homeId } = useParams();
  return <h3>Requested topic ID: {homeId}</h3>;
}

export default HomePage;
