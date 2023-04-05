import { FiTrash } from "react-icons/fi";
import { HiOutlinePencil } from "react-icons/hi";
import { deleteSubject } from "../lib/admin";

export default function SubjectCard({ subject, mutate, updateHandler }) {
  const handleDelete = async (id) => {
    await deleteSubject(id);
    await mutate();
  };

  return (
    <>
      <div className="w-72 max-w-sm p-6 border border-gray-200 rounded-lg shadow-md bg-indigo-900 border-none">
        <h5 className="mb-3 text-2xl font-bold tracking-tight text-nord6 break-all">
          {subject.name}
        </h5>
        <div className="flex justify-end">
          <button
            onClick={() => updateHandler(subject, true)}
            className="text-indigo-400 background-transparent font-bold uppercase mr-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button">
            <HiOutlinePencil className="w-6 h-6" />
            <span className="sr-only">Edit subject</span>
          </button>
          <button
            onClick={() => handleDelete(subject.id)}
            className="text-nord11 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150"
            type="button">
            <FiTrash className="w-6 h-6" />
            <span className="sr-only">Delete subject</span>
          </button>
        </div>
      </div>
    </>
  );
}
