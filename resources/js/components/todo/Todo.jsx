import TaskCard from "./TaskCard.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { FcLowPriority } from "react-icons/fc";

export default function Todo() {
    const [tasks, setTasks] = useState([]);
    const [formData, setFormData] = useState({
        task: "",
        priority: 0,
    });
    const getTasks = async () => {
        const response = await axios.get("/api/todo/get", {
            headers: {
                "X-CSRF-TOKEN": window.csrfToken,
            },
        });
        setTasks(response.data?.data);
    };

    const editTask = async (id, task) => {
        try {
            const response = await axios.put(
                "/api/todo/edit",
                {
                    id,
                    task,
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": window.csrfToken,
                    },
                }
            );

            if (response?.data?.status === "error") {
                return toast.error(
                    response.data?.message ?? "An unknown error occurred."
                );
            }

            return getTasks().then((r) =>
                toast.success(response?.data?.message)
            );
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    };

    useEffect(() => {
        getTasks()
            .then((r) => console.log("Tasks fetched successfully.", r))
            .catch((e) => console.error(`Task fetch error! \n${e}`));
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/todo/create", formData, {
                headers: {
                    "X-CSRF-TOKEN": window.csrfToken,
                },
            });

            if (response?.data?.status === "error") {
                if (response?.data?.fields) {
                    return toast.error(response.data.fields);
                }
                return toast.error(
                    response.data?.message ?? "An unknown error occurred."
                );
            }
            return getTasks().then((r) =>
                toast.success(response?.data?.message)
            );
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    };

    const finishTask = async (id, is_completed) => {
        if (!id || null === is_completed) {
            return false;
        }

        try {
            const response = await axios.put(
                "/api/todo/update",
                {
                    id,
                    is_completed,
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": window.csrfToken,
                    },
                }
            );

            if (response?.data?.status === "error") {
                if (response?.data?.fields) {
                    return toast.error(response.data.fields);
                }
                return toast.error(
                    response.data?.message ?? "An unknown error occurred."
                );
            }

            return getTasks().then((r) =>
                toast.success(response?.data?.message)
            );
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    };

    const destroyTask = async (id) => {
        if (!id) {
            return false;
        }

        try {
            const response = await axios.put(
                "/api/todo/destroy",
                {
                    id,
                },
                {
                    headers: {
                        "X-CSRF-TOKEN": window.csrfToken,
                    },
                }
            );

            if (response?.data?.status === "error") {
                return toast.error(
                    response.data?.message ?? "An unknown error occurred."
                );
            }

            return getTasks().then((r) =>
                toast.success(response?.data?.message)
            );
        } catch (error) {
            return toast.error(error.response.data.message);
        }
    };

    return (
        <div className="w-full bg-white flex flex-col gap-y-6 pb-12">
            <div className="w-full flex flex-col py-12 px-8">
                <p className="font-bold text-3xl text-center mb-6">Todo App</p>
                <form action="" onSubmit={handleSubmit}>
                    <div className="flex items-center justify-center w-3/5 mx-auto gap-4">
                        <div className="relative w-2/3">
                            <input
                                type="text"
                                id="task"
                                name="task"
                                className="block px-2.5 pb-1.5 pt-3 w-full text-gray-900 bg-transparent rounded-lg border border-blue-400 appearance-none focus:ring-0 focus:border-blue-600 peer"
                                placeholder=" "
                                value={formData.task}
                                onChange={handleChange}
                            />
                            <label
                                htmlFor="small_outlined"
                                className="absolute text-gray-500 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 left-1"
                            >
                                What do you want today?
                            </label>
                        </div>

                        <div className="w-1/4">
                            <select
                                id="priority"
                                name="priority"
                                className="bg-gray-50 border border-blue-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full px-2.5 py-3"
                                onChange={handleChange}
                                defaultValue={-1}
                            >
                                <option value={-1}>Select a Priority</option>
                                <option value={1}>Low</option>
                                <option value={2}>Medium</option>
                                <option value={3}>High</option>
                            </select>
                        </div>

                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 w-1/5 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-3 focus:outline-none"
                        >
                            Add Task
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full px-12 mx-auto flex flex-col gap-y-4">
                <div
                    className="p-4 mb-4 text-lg text-blue-800 rounded-lg bg-blue-50"
                    role="alert"
                >
                    <p className="font-semibold">Info!</p> You can edit the task
                    by double clicking the task name. <br />
                    You can update the editing process by "Enter", you can
                    cancel it by "Esc"
                </div>
            </div>
            <div className="w-full h-[1px] bg-gray-300"></div>
            <div className="grid w-full px-10 grid-cols-3 gap-12">
                {tasks.length > 0 ? (
                    tasks.map((_, key) => (
                        <TaskCard
                            key={key}
                            data={_}
                            finishTask={finishTask}
                            destroyTask={destroyTask}
                            editTask={editTask}
                        />
                    ))
                ) : (
                    <div
                        className="p-4 mb-4 text-xl text-center text-gray-800 rounded-lg bg-gray-100 col-span-12"
                        role="alert"
                    >
                        <p className="font-bold text-2xl">No task found.</p>{" "}
                        Let's add a new one.
                    </div>
                )}
            </div>
        </div>
    );
}
