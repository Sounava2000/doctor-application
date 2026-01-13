import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// ✅ CSS import directly
import "./index.css"; // or your custom style.css

import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { DoctorContextProvider } from "./context/DoctorContext.jsx";
import { AdminContextProvider } from "./context/AdminContext.jsx";
import { AppContextProvider } from "./context/AppContext.jsx";

 
const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AppContextProvider>
        <AdminContextProvider>
          <DoctorContextProvider>
            <App />
          </DoctorContextProvider>
        </AdminContextProvider>
      </AppContextProvider>
    </BrowserRouter>
  </StrictMode>
);
