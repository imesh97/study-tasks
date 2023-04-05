import React, { useState } from "react";
import { addSubject } from "../lib/admin";
import useAuth from "../hooks/useAuth";

export default function AddSubjectModal({ modalHandler, mutate }) {
  const [subject, setSubject] = useState("");
  const { user } = useAuth();

  const newSubject = {
    name: subject,
    userId: user?.uid,
  };

  const isFilled = () => {
    return subject.length > 0;
  };

  const handleAdd = async (newSubject) => {
    await addSubject(newSubject);
    await mutate();
    modalHandler(false);
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-indigo-900 text-nord6 outline-none focus:outline-none">
            <div className="relative p-6">
              <div className="">
                <p className="text-lg font-semibold leading-relaxed">
                  New Subject:
                </p>
                <div className="my-2">
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    placeholder="Enter subject name..."
                    className="px-3 py-3 placeholder-nord4 text-indigo-900 relative bg-nord6 rounded-lg text-sm border border-nord2 outline-none focus:outline-none focus:ring w-full"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end p-6 border-t border-solid border-nord2 rounded-b">
              <button
                className="text-indigo-9001 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => modalHandler(false)}>
                Close
              </button>
              <button
                type="button"
                onClick={() => handleAdd(newSubject)}
                className={
                  "bg-indigo-400 text-indigo-900 active:bg-indigo-400 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                  (!isFilled() ? "cursor-not-allowed" : "")
                }
                disabled={!isFilled()}>
                Add subject
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
}
