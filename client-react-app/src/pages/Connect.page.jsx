import React from "react";

// ? This represent the landing page or the root '/'

import auth from "../auth";

function Connect(props) {
  return (
    <div>
      <h1>Connect Page</h1>{" "}
      <button
        onClick={() => {
          auth.login(() => {
            props.history.push("/home");
          });
        }}
      >
        Login
      </button>
    </div>
  );
}

export default Connect;
