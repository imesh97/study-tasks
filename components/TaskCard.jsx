import { FiTrash } from "react-icons/fi"
import { HiOutlineBookOpen, HiOutlineClock, HiOutlinePencil } from "react-icons/hi"
import { deleteTask, toggleTaskStatus } from "../lib/admin"

export default function TaskCard({ task, mutate, updateHandler }) {
    const handleToggle = async (id, status) => {
        await toggleTaskStatus(id, status)
    }
    
    const handleDelete = async (id) => {
        await deleteTask(id)
        await mutate()
    }

    const taskDate = () => {
        if (!task.date) return
        const dateString = task.date.replace(/-/g, "/")
        const dateObj = new Date(dateString)
        const todayObj = new Date()
        const tmrwObj = new Date(todayObj.getFullYear(), todayObj.getMonth(), todayObj.getDate() + 1)

        if (dateObj.toDateString() === todayObj.toDateString()) return "today"
        if (dateObj.toDateString() == tmrwObj.toDateString()) return "tomorrow"

        const timeDiff = dateObj.getTime() - todayObj.getTime()
        const daysDiff = Math.round(timeDiff / (1000 * 3600 * 24))

        if (daysDiff < 0) return "expired (" + dateString + ")"
        else if (Math.abs(daysDiff) < 7) return "in " + daysDiff + " days (" + dateString + ")"
        return dateString
    }

    return (
        <>
            <div className="w-72 max-w-sm p-6 border border-gray-200 rounded-lg shadow-md bg-nord1 border-nord0">
                <h5 className="mb-3 text-2xl font-bold tracking-tight text-nord6 break-all">{ task.title }</h5>
                <p className="flex items-center mb-2 font-normal text-nord4 break-all"><HiOutlineClock className="h-6 w-6 mr-2"/>{ taskDate() }</p>
                <p className="flex items-center mb-2 font-normal text-nord4 break-all"><HiOutlineBookOpen className="h-6 w-6 mr-2"/>{ task.subject.name }</p>
                <div className="flex justify-end">
                    <label className="inline-flex relative items-center mr-2 cursor-pointer">
                        <input onChange={(e) => handleToggle(task.id, e.target.checked)} type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-500 rounded-full peer peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-nord10"></div>
                    </label>
                    <button onClick={() => updateHandler(task, true)} className="text-nord8 background-transparent font-bold uppercase mr-2 text-sm outline-none focus:outline-none ease-linear transition-all duration-150" type="button" >
                        <HiOutlinePencil className="w-6 h-6"/>
                        <span className="sr-only">Edit task</span>
                    </button>
                    <button onClick={() => handleDelete(task.id)} className="text-nord11 background-transparent font-bold uppercase text-sm outline-none focus:outline-none ease-linear transition-all duration-150" type="button" >
                        <FiTrash className="w-6 h-6"/>
                        <span className="sr-only">Delete task</span>
                    </button>
                </div>
            </div>

        </>
    )
}