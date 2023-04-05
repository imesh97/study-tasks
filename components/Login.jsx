import { useEffect, useRef } from "react";
import { FaGoogle } from "react-icons/fa";
import Typed from "typed.js";

export default function Login({ handler }) {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ["tasks.", "subjects.", "life."],
      typeSpeed: 100,
      backSpeed: 120,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div className="bg-indigo-800 w-full min-h-screen">
      <div className="flex flex-col items-center justify-center text-center px-6 py-8 mx-auto h-screen lg:py-0">
        <h1 className="mb-4 text-4xl font-bold leading-none text-nord6 md:text-5xl lg:text-6xl">
          Welcome to Study Tasks!
        </h1>
        <div className="flex">
          <p className="mb-6 text-lg font-normal text-indigo-200 lg:text-2xl mr-2">
            Use the menu to manage your academic
          </p>
          <p className="text-lg font-normal text-indigo-200 lg:text-2xl">
            <span ref={typedElement} />
          </p>
        </div>
        <button
          className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-xl font-medium rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800"
          onClick={() => handler()}>
          <span className="flex items-center px-5 py-2.5 transition-all ease-in duration-75 bg-indigo-800 text-nord6 rounded-md group-hover:bg-opacity-0">
            <FaGoogle className="mr-2" />
            Login with Google
          </span>
        </button>
      </div>
    </div>
  );
}
