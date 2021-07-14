import React from "react";

// ? This page is protected, users can access once signed in with Metamask.
// ? the app starts here
// ? This is the Home page

import auth from "../auth";

function Home(props) {
  return (
    <div>
      <h1>Home Page protected page</h1>
      <button
        onClick={() => {
          auth.logout(() => {
            props.history.push("/");
          });
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default Home;
