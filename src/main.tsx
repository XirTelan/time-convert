import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles.scss";
import { StrictMode } from "react";
import { ErrorBoundary } from "./shared/errorBoundary";

const root = createRoot(document.getElementById("root")!);
root.render(
  <StrictMode>
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <App />
    </ErrorBoundary>
  </StrictMode>
);
