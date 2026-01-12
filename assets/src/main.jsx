import React from "react";
import { createRoot } from "react-dom/client";

function App() {
  return (
    <div style={{ padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
      <h3>Doitarts React OK</h3>
      <p>Componente cargado correctamente.</p>
    </div>
  );
}

const el = document.getElementById("doitarts-react-root");
if (el) createRoot(el).render(<App />);
