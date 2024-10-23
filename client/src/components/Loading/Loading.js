// import React from "react";
// import Tada from "react-reveal/Tada";

// const loadingStyle = {
//     display: "block",
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     height: "300px",
//     marginTop: "-150px",
//     marginLeft: "-150px"
// }

// const Loading = () => (
//   <Tada forever>
//     <img src="/imgs/logo-symbol.svg" alt="loading logo" style={loadingStyle} />
//   </Tada>
// );

// export default Loading;

import React from "react";
import { AttentionSeeker } from "react-awesome-reveal"; // Updated import

const loadingStyle = {
  display: "block",
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "300px",
  marginTop: "-150px",
  marginLeft: "-150px",
};

const Loading = () => (
  <AttentionSeeker effect="tada" repeat={true}>
    <img src="/imgs/logo-symbol.svg" alt="loading logo" style={loadingStyle} />
  </AttentionSeeker>
);

export default Loading;
