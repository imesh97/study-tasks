import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-indigo-800 text-nord6">
      <Sidebar />
      <main className="w-5/6 flex flex-col flex-grow md:ml-0 transition-all duration-200 ease-in">
        <div className="flex flex-col flex-grow py-5 px-8">{children}</div>
      </main>
    </div>
  );
}
