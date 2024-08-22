import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import {ContextProvider} from "./context/Context.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ContextProvider>
      <Toaster position="top-center" reverseOrder={false} />
      <App />
    </ContextProvider>
  </BrowserRouter>
);
