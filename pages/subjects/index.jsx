import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useAuth } from "../../lib/auth";
import SubjectCard from "../../components/SubjectCard";
import { HiPlus } from "react-icons/hi";
import AddSubjectModal from "../../components/AddSubjectModal";
import UpdateSubjectModal from "../../components/UpdateSubjectModal";
import useSWR from "swr";
import { getUserData } from "../../lib/admin";

export default function Home() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updateSubjectData, setUpdateSubjectData] = useState(null);

  const auth = useAuth();

  const [subjects, setSubjects] = useState([]);
  const { data, mutate } = useSWR(
    auth.user ? auth.user.uid : null,
    getUserData
  );

  useEffect(() => {
    if (!data) {
      setSubjects([]);
      return;
    }
    setSubjects(data.data.subjects);
  }, [data]);

  const handleUpdateModal = (data, show) => {
    setShowUpdateModal(show);
    setUpdateSubjectData(data);
  };

  return (
    <>
      <Head>
        <title>Subjects - Study Tasks</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {auth.user && (
        <>
          <div className="flex flex-col flex-grow mt-4 md:mt-4">
            <div className="flex flex-row flex-wrap gap-8">
              {subjects.length > 0 &&
                subjects.map((subject) => {
                  return (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      mutate={mutate}
                      updateHandler={handleUpdateModal}
                    />
                  );
                })}
              <div
                onClick={() => setShowAddModal(true)}
                className="p-6 w-72 h-32 max-w-sm border-dashed border-8 rounded shadow-md border-indigo-100 cursor-pointer">
                <div className="h-full flex justify-center items-center">
                  <HiPlus className="mr-2 h-12 w-12 fill-indigo-100" />
                  <h5 className="flex flex-row mb-2 text-xl md:text-2xl font-bold tracking-tight text-indigo-100 break-all">
                    Add Subject
                  </h5>
                </div>
              </div>
            </div>
          </div>

          {showAddModal && (
            <AddSubjectModal modalHandler={setShowAddModal} mutate={mutate} />
          )}
          {showUpdateModal && (
            <UpdateSubjectModal
              subjectData={updateSubjectData}
              modalHandler={handleUpdateModal}
              mutate={mutate}
            />
          )}
        </>
      )}
    </>
  );
}
