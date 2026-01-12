import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return <div>Doitarts React OK</div>;
}

const el = document.getElementById("doitarts-react-root");
if (el) createRoot(el).render(<App />);
