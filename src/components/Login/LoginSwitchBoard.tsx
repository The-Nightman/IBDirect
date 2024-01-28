import { Link } from "react-router-dom";

const LoginSwitchBoard = () => {
  return (
    <>
      <section className="w-72 mt-8 shadow-xl">
        <div className="flex justify-center h-20 rounded-t bg-gradient-to-br from-sky-700 to-blue-400">
          <h2 className="text-4xl self-center text-white">Sign In</h2>
        </div>
        <div className="h-80 px-8 py-14 rounded-b bg-white">
          <div className="flex flex-col justify-between h-full">
            <Link
              to="/Portal/Patient/Login"
              className="flex items-center justify-center w-full h-16 rounded text-2xl bg-zinc-300 select-none"
              draggable="false"
              aria-label="Patient Login Button"
            >
              Patient Login
            </Link>
            <Link
              to="/Portal/Staff/Login"
              className="flex items-center justify-center w-full h-16 rounded text-2xl bg-zinc-300 select-none"
              draggable="false"
              aria-label="Staff Login Button"
            >
              Staff Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginSwitchBoard;
