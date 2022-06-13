import Cookies from "js-cookie";
import { counterActions, selectCounter } from "store/feature/CounterSlice";
import { wrapper } from "store/store";
import { useSelector } from "react-redux";
import { useAppDispatch } from "hooks/hook";
import { SunIcon, MoonIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";

export default function Home() {
  const counter = useSelector(selectCounter);
  const dispatch = useAppDispatch();
  const ServerSideRender = typeof window === "undefined";
  const [theme, setTheme] = useState(
    !ServerSideRender ? localStorage.theme : "dark"
  );
  let root = "";
  if (!ServerSideRender) {
    root = window.document.documentElement;
    root?.classList?.add("dark:bg-grey-800");
    root?.classList?.add("dark:text-white");
  }
  useEffect(() => {
    if (!ServerSideRender) {
      root.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [ServerSideRender, root.classList, theme]);
  return (
    <div className="bg-gray-50 dark:bg-slate-800 dark:text-white flex min-h-screen p-[25px] justify-center text-center   ">
      <div className="   m-auto ">
        <div>
          <h1 className="text-4xl  font-semibold  ">
            Counter Value: {counter.counterValue}
          </h1>
        </div>
        <div className="  p-[25px]  ">
          <div className="grid grid-cols-2 ">
            <div className="bg-blue-400 dark:bg-blue-900 ">
              <button
                className="p-2"
                onClick={() => {
                  dispatch(counterActions.incrementCounter());
                }}
              >
                Increment By 1
              </button>
            </div>
            <div className="bg-red-400 dark:bg-red-900 ">
              <button
                className="p-2"
                onClick={() => {
                  dispatch(counterActions.decrementCounter());
                }}
              >
                Decrement By 1
              </button>
            </div>
          </div>{" "}
          <div>
            <div className=" mt-2 p-2  text-center rounded-full">
              <button
                type="button"
                onClick={() => {
                  root.classList.remove(theme);
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
                className=" p-1 rounded-full  hover:bg-slate-800 hover:text-white dark:hover:bg-gray-200 dark:hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <MoonIcon
                  className="h-6 w-6 block dark:hidden"
                  aria-hidden="true"
                />
                <SunIcon
                  className="h-6 w-6 hidden  dark:block"
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const counterValue = req.cookies.counterValue;
      store.dispatch(
        counterActions.setCounterValue(
          counterValue ? parseInt(counterValue) : 0
        )
      );
      return {};
    }
);
