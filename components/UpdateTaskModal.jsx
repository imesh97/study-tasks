import React, { useState } from "react"
import { updateTask } from "../lib/admin"
import useAuth from "../hooks/useAuth"

export default function UpdateTaskModal({ taskData, modalHandler, mutate }) {
    const [task, setTask] = useState("")
    const [subject, setSubject] = useState(taskData.subject)
    const [date, setDate] = useState(taskData.date) // initialize with current date
    const { user } = useAuth()

    const subjectType = {
        name: subject,
        userId: user?.uid
    }

    const updatedTask = {
        title: task,
        subject: subjectType,
        date: date,
        status: taskData.status,
        userId: user?.uid
    }

    const isFilled = () => {
        return (subject.length > 0 && subject.length > 0 && date.length > 0)
    }

    const handleUpdate = async (id, updatedTask) => {
        await updateTask(id, updatedTask)
        await mutate()
        modalHandler(null, false)
    }
    
    return (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-nord1 text-nord6 outline-none focus:outline-none">
                <div className="relative p-6">
                    <div className="">
                        <p className="text-lg font-semibold leading-relaxed">Task:</p>
                        <div className="my-2">
                            <input value={task} onChange={(e) => setTask(e.target.value)} type="text" placeholder={taskData.title} className="px-3 py-3 placeholder-nord4 text-nord1 relative bg-nord6 rounded-lg text-sm border border-nord2 outline-none focus:outline-none focus:ring w-full"/>
                        </div>
                    </div>
                
                    <div className="flex">
                            <div className="">
                                <p className="text-lg font-semibold leading-relaxed">Subject:</p>
                                <div className="my-2">
                                    <select defaultValue="" onChange={(e) => setSubject(e.target.value)} id="task-subject" className="bg-nord6 border border-nord2 text-nord1 text-sm rounded-lg focus:ring-none block w-full p-2.5">
                                        <option value="" disabled>Select</option>
                                        <option value="cs3331">CS3331</option>
                                        <option value="cs3319">CS3319</option>
                                    </select>
                                </div>
                            </div>
                            <div className="ml-4">
                                <p className="text-lg font-semibold leading-relaxed">Deadline:</p>
                                <div className="my-2">
                                    <input min="2016-01-01" value={date} onChange={(e) => setDate(e.target.value)} type="date" className="bg-nord6 border border-nord2 text-nord1 text-sm rounded-lg block pl-4 p-2.5"></input>
                                </div>
                            </div>
                        </div>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-nord2 rounded-b">
                  <button className="text-nord11 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => modalHandler(null, false)}>Close</button>
                  <button type="button" onClick={() => handleUpdate(taskData.id, updatedTask)} className={"bg-nord8 text-nord1 active:bg-nord8 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " + (!isFilled() ? "cursor-not-allowed" : "")} disabled={!isFilled()}>Update task</button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}