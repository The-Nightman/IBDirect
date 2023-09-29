const StaffLogin = () => {
  return (
    <>
      <section className="w-72 mt-8 shadow-xl">
        <div className="flex justify-center h-20 rounded-t bg-gradient-to-br from-sky-700 to-blue-400">
          <h2 className="text-4xl self-center text-white">Sign In</h2>
        </div>
        <div className="px-8 py-7 rounded-b bg-white">
          <form className="flex flex-col h-full">
            <label className="text-sm" htmlFor="username">
              Username
              <input
                type="text"
                id="username"
                name="Name"
                v-model="username"
                required
                placeholder="223JDoe123"
                className="h-9 w-full px-1 rounded-t border-b-2 border-zinc-400 bg-zinc-300"
              />
              <p className="text-xs w-56 text-red-500">
                Invalid format: Use 223 followed by first initial up to 6
                letters of surname and unique 3 num ID
              </p>
            </label>
            <br />
            <label className="text-sm mt-8" htmlFor="pass">
              Password
              <input
                type="password"
                id="pass"
                name="Password"
                v-model="password"
                required
                placeholder="Password"
                className="h-9 w-full px-1 rounded-t border-b-2 border-zinc-400 bg-zinc-300"
              />
            </label>
            <input
              type="submit"
              value="SIGN IN"
              className="text-base underline decoration-2 mt-8 text-blue-600"
            />
            <p className="text-[0.5rem] mt-5">
              By proceeding, you confirm that you are the intended member of
              staff or administrator. Please be advised that it is an offence to
              access information not intended for you without the explicit
              consent of the recipient.
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default StaffLogin;
