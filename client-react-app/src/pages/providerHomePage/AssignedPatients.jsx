import React, { useState, useEffect } from "react";

import { Switch, Route, useRouteMatch } from "react-router-dom";
import ProtectedRoute from "../../components/Protected.route";

import PatientInfoCard from "../../components/PatientInfoCard";
import PatientRecordPage from "./patientRecordPage/PatientRecordPage";

export default function AssignedPatients() {
  let match = useRouteMatch();
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    let usrs = [
      {
        firstname: "Mohammed",
        lastname: "Fajer",
        address: "0x897Fd668E8adfF344D52104A699187096aD17645",
        id: 1,
      },
      {
        firstname: "Mohammed",
        lastname: "Fajer",
        address: "0x897Fd668E8adfF344D52104A699187096aD17645",
        id: 7,
      },
      {
        firstname: "Sam",
        lastname: "Jaray",
        address: "0x897Fd63...96aD17645",
        id: 2,
      },
      {
        firstname: "Whilter",
        lastname: "White",
        address: "0x897Fd63...93aD17645",
        id: 3,
      },
      {
        firstname: "Norki",
        lastname: "Morkov",
        address: "0x81Fd66...96aD17645",
        id: 4,
      },
      {
        firstname: "Mia",
        lastname: "Watson",
        address: "0x892Fd63...96aD17645",
        id: 5,
      },
      {
        firstname: "Kolim",
        lastname: "Marlo",
        address: "0x897ed63...93aD17645",
        id: 6,
      },
    ];
    setAllUsers(usrs);
    setUsers(usrs);
  }, []);

  function filterCards(event) {
    const value = event.target.value.toLowerCase();
    const filteredUsers = allUsers.filter((user) =>
      `${user.firstname} ${user.lastname}`.toLowerCase().includes(value)
    );

    setUsers(filteredUsers);
  }
  return (
    <Switch>
      <Route exact path={match.path}>
        <h1>Assigned Patients</h1>
        <input
          placeholder="Search by patient name"
          onInput={filterCards}
          style={{
            outline: "none",
            width: "100%",
            border: "1px solid grey",
            fontSize: "0.9rem",
            padding: "1rem",
            borderRadius: ".5rem",
          }}
        />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {users.map((user, index) => (
            <PatientInfoCard
              firstname={user.firstname}
              lastname={user.lastname}
              address={user.address}
              id={user.id}
              key={user.id}
            />
          ))}
        </div>
      </Route>

      {users.map((user, index) => (
        <ProtectedRoute
          path={`${match.path}/${user.firstname + user.lastname + user.id}`}
        >
          <PatientRecordPage user={user} />
        </ProtectedRoute>
      ))}
    </Switch>
  );
}
