import "../css/app.css";

import ReactDOM from "react-dom/client";
import Todo from "./components/todo/Todo.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("app")).render(
    <>
        <Todo />
        <ToastContainer />
    </>
);
