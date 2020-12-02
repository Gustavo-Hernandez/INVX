import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as AuthProvider } from "./context/AuthContext";
import { Provider as ItemsProvider } from "./context/ItemsContext";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

ReactDOM.render(
    <AuthProvider>
      <ItemsProvider>
        <ReactNotification/>
        <App />
      </ItemsProvider>
    </AuthProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
