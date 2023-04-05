import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import {
  HiOutlineClipboardCheck,
  HiOutlineBookOpen,
  HiOutlineUser,
  HiOutlineCog,
  HiOutlineLockOpen,
  HiAcademicCap,
} from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../lib/auth";

function SidebarLink({ path, icon, text }) {
  const router = useRouter();

  return (
    <li className="my-px">
      <Link
        href={path}
        className={
          "flex flex-row items-center h-10 px-3 rounded-lg  " +
          (router.pathname == path
            ? "text-nord1 bg-nord6"
            : "text-indigo-700 hover:bg-indigo-700 hover:text-indigo-100")
        }>
        <span className="flex items-center justify-center text-lg">{icon}</span>
        <span className="ml-3 text-lg">{text}</span>
      </Link>
    </li>
  );
}

function SidebarHeader({ className }) {
  return (
    <div className={"sidebar-header flex items-center px-4 py-4 " + className}>
      <Link href="/" className="inline-flex flex-row items-center">
        <HiAcademicCap className="w-10 h-10 fill-indigo-700" />
        <span className="text-indigo-700 text-2xl font-bold ml-2 uppercase">
          Study Tasks
        </span>
      </Link>
    </div>
  );
}

export default function Sidebar() {
  const [open, setOpen] = useState(false);
  const auth = useAuth();

  return (
    <>
      <header
        className="z-40 bg-indigo-900 text-gray-100 flex justify-between items-center md:hidden"
        data-dev-hint="mobile menu bar">
        <SidebarHeader className="" />
        <input
          id="menu-open"
          type="checkbox"
          onChange={(e) => setOpen(e.target.checked)}
          className="hidden"
        />
        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className={
            "m-2 p-2 focus:outline-none hover:text-white rounded-md " +
            (open ? "hover:bg-gray-900" : "hover:bg-transparent")
          }>
          <MdMenu
            className={
              "h-8 w-8 transition duration-200 ease-in-out " +
              (open ? "hidden" : "")
            }
          />
          <MdClose
            className={
              "h-8 w-8 transition duration-200 ease-in-out " +
              (open ? "" : "hidden")
            }
          />
        </label>
      </header>
      <aside
        className={
          "z-40 sidebar w-3/4 md:w-1/5 md:min-w-fit md:shadow -translate-x-100 md:translate-x-0 bg-indigo-100 absolute inset-y-0 left-0 transform md:relative transition duration-200 ease-in-out md:flex md:flex-col " +
          (open ? "" : "hidden")
        }>
        <SidebarHeader className="" />
        <div className="sidebar-content px-4">
          <ul className="flex flex-col w-full">
            <li className="my-px">
              <span className="flex font-medium text-lg text-indigo-700 px-4 my-4 uppercase">
                Manage
              </span>
            </li>
            <SidebarLink
              path="/tasks"
              icon={<HiOutlineClipboardCheck className="h-6 w-6" />}
              text="Tasks"
            />
            <SidebarLink
              path="/subjects"
              icon={<HiOutlineBookOpen className="h-6 w-6" />}
              text="Subjects"
            />
            <li className="my-px">
              <span className="flex font-medium text-lg text-indigo-700 px-4 my-4 uppercase">
                Account
              </span>
            </li>
            <SidebarLink
              path="/profile"
              icon={<HiOutlineUser className="h-6 w-6" />}
              text="Profile"
            />
            <SidebarLink
              path="/settings"
              icon={<HiOutlineCog className="h-6 w-6" />}
              text="Settings"
            />
            <li className="my-px">
              <a
                href="#"
                onClick={() => auth.signOut()}
                className="flex flex-row items-center h-10 px-3 rounded-lg text-indigo-700 hover:bg-indigo-700 hover:text-indigo-100">
                <span className="flex items-center justify-center text-lg text-red-500 hover:text-indigo-100">
                  <HiOutlineLockOpen className="h-6 w-6" />
                </span>
                <span className="ml-3 text-lg">Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
