import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Site } from "containers";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(<Site />, document.getElementById("root"));
serviceWorker.unregister();
