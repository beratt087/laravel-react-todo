import "../css/app.css";

import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoginForm from "./components/forms/LoginForm.jsx";

ReactDOM.createRoot(document.getElementById("app")).render(
    <>
        <LoginForm />
        <ToastContainer />
    </>
);
