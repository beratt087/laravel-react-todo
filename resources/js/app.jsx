import './bootstrap';
import '../css/app.css';

import ReactDOM from 'react-dom/client';
import Todo from "./components/Todo.jsx";

ReactDOM.createRoot(document.getElementById('app')).render(
    <Todo />
);
