import React = require("react");
import ReactDOM = require("react-dom/client");
import reportWebVitals = require("./reportWebVitals");
import serviceWorkerRegistration = require("./serviceWorkerRegistration");
import App = require("./App");

if (process.env.NODE_ENV === "development") {
  import("react-error-overlay").then((m) => {
    m.stopReportingRuntimeErrors();
  });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers:
// https://create-react-app.dev/docs/making-a-progressive-web-app
serviceWorkerRegistration.register();
