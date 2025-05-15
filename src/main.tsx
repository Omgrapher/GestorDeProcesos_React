import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { GestorApp } from "./GestorApp";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <GestorApp />
    </BrowserRouter>
  </StrictMode>
);
