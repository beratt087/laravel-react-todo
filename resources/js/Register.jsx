import "../css/app.css";

import ReactDOM from "react-dom/client";
import RegisterForm from "./components/forms/RegisterForm.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("app")).render(
    <>
        <RegisterForm />
        <ToastContainer />
    </>
);
