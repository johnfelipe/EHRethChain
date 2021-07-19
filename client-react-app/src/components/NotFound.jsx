import React from "react";

import { useHistory } from "react-router-dom";
import { Result, Button } from "antd";

function PageNotFound() {
  let history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => history.push("/")}>
          Back Home
        </Button>
      }
    />
  );
}

export default PageNotFound;
