import React from "react";
import Blockies from 'react-blockies';

function Blockie(props) {

  return (
    <div>
      <Blockies seed={props.address.toLowerCase()} size={8} scale={4} /> 
    </div>
  );

}

export default Blockie;
