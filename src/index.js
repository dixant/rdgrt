import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

// import "./resources/css/bootstrap.min.css";
// import "./resources/css/toastr.css";
// import "./resources/css/animate.css";
// import "./resources/css/state-street-theme.css";
// import "./resources/css/cdt-app-layout.css";
// import "./resources/css/navmenu.css";
// import "./resources/style.css";
// import "./resources/sidebar.css";
// import "./resources/react-bootstrap-table-all.min.css";

if (!Object.assign) {
  Object.assign = require("object-assign");
}
ReactDOM.render(<App />, document.getElementById("root"));
