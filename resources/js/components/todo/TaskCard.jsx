import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import {
    FcHighPriority,
    FcLowPriority,
    FcMediumPriority,
} from "react-icons/fc";
import { BiTrash } from "react-icons/bi";

export default function TaskCard(props) {
    const { data, finishTask, destroyTask } = props;
    const date = new Date(data?.created_at);
    const formattedDate = `${date.getDate().toString().padStart(2, "0")}-${(
        date.getMonth() + 1
    )
        .toString()
        .padStart(2, "0")}-${date.getFullYear()}
        ${date.getHours().toString().padStart(2, "0")}:${date
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

    return (
        <div className="max-w-sm pr-4 pt-12 pb-4 bg-white border border-gray-200 rounded-lg shadow relative">
            <h5 className="mb-2 text-xl px-6 font-bold tracking-tight text-gray-900 break-words">
                {data?.task ?? "??"}
            </h5>
            <p className="mb-3 font-normal text-sm text-gray-700 absolute top-2 right-10">
                {formattedDate ?? "??"}
            </p>
            <button
                className="absolute top-2 right-2 text-xl text-red-500"
                onClick={() => destroyTask(data?.id)}
            >
                <BiTrash />
            </button>
            {data?.is_completed ? (
                <div className="flex items-center gap-1 absolute top-2 left-2 text-green-500">
                    <AiOutlineCheckCircle className="text-lg" />
                    <p className="text-sm font-bold">Completed!</p>
                </div>
            ) : (
                <>
                    <div className="flex items-center gap-1 absolute top-2 left-2 text-red-500">
                        <AiOutlineCloseCircle className="text-lg" />
                        <p className="text-sm font-bold">Not Completed.</p>
                    </div>
                </>
            )}

            <div className="absolute bottom-4 left-4 text-xl">
                {data?.priority === 1 ? (
                    <div className="flex items-center gap-2">
                        <FcLowPriority />
                        <span className="text-base">Low Priority</span>
                    </div>
                ) : data?.priority === 2 ? (
                    <div className="flex items-center gap-2">
                        <FcMediumPriority />
                        <p className="text-base">Medium Priority</p>
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <FcHighPriority />
                        <span className="text-base">High Priority</span>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-end mt-5">
                {data?.is_completed ? (
                    <button
                        type="submit"
                        className="text-white bg-transparent border border-red-500 text-red-500 hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-1.5 focus:outline-none transition-all duration-500ms hover:scale-110"
                        onClick={() =>
                            finishTask(data?.id, !data?.is_completed)
                        }
                    >
                        Undo
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="text-white bg-transparent border border-green-700 text-green-700 hover:bg-green-700 hover:text-white focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-1.5 focus:outline-none transition-all duration-500ms hover:scale-110"
                        onClick={() =>
                            finishTask(data?.id, !data?.is_completed)
                        }
                    >
                        Finish
                    </button>
                )}
            </div>
        </div>
    );
}
