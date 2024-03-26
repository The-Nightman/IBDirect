import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.js";
import { UserDetailsProvider } from "./context/userStaffDetails.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <UserDetailsProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserDetailsProvider>
  </AuthProvider>
);
