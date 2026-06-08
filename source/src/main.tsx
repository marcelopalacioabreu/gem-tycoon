import { createRoot } from "react-dom/client";
import { Router } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import App from "./App";
import "./index.css";

function Main() {
  return (
    <Router hook={useHashLocation}>
      <App />
    </Router>
  );
}

createRoot(document.getElementById("root")!).render(<Main />);
