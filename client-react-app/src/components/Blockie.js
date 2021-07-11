import React from "react";
import Blockies from 'react-blockies';

function Blockie(props) {

  return (
    <div>
      <Blockies seed={props.address.toLowerCase()} /> {props.address}
    </div>
  );

}

export default Blockie;
