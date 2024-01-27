import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { staffLoginAPI } from "../../api/staffLogin.js";
import { useAuth } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import SpinnerStatus from "../UX/Spinner.js";
import Toast from "../UX/Toast.js";
import { ErrorState } from "../../interfaces/ErrorState.js";

interface LoginForm {
  Name: string;
  Password: string;
}

const StaffLogin = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorState>({ state: false, message: "" });
  const [valid, setValid] = useState<boolean>(true);
  const [formData, setFormData] = useState<LoginForm>({
    Name: "",
    Password: "",
  });

  const closeErrorState = () => {
    setError({ state: false, message: "" });
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidate = (e: FocusEvent<HTMLInputElement>): void => {
    if (
      !/^223[A-Z]{2}[a-z]{0,5}\d{3}$/.test(e.target.value) &&
      e.target.value != ""
    ) {
      e.target.setCustomValidity("Invalid username format");
      setValid(false);
    } else {
      e.target.setCustomValidity("");
      setValid(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    closeErrorState();
    setLoading(true);
    staffLoginAPI(formData)
      .then((res) => {
        login(res.data.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setError({ state: true, message: err.response.data });
      });
  };

  return (
    <>
      {loading && <SpinnerStatus />}
      <section className="w-72 mt-8 shadow-xl">
        <div className="flex justify-center h-20 rounded-t bg-gradient-to-br from-sky-700 to-blue-400">
          <h2 className="text-4xl self-center text-white">Sign In</h2>
        </div>
        <div className="px-8 py-7 rounded-b bg-white">
          <form onSubmit={handleSubmit}>
            <fieldset className="flex flex-col h-full">
              <legend className="sr-only">Staff login form</legend>
              <div className="relative z-0 w-full group">
                <input
                  type="text"
                  name="Name"
                  id="Username"
                  className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 ${
                    valid ? "border-gray-300" : "border-red-500"
                  } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=""
                  required
                  aria-required="true"
                  aria-labelledby="UsernameLabel"
                  aria-describedby="UsernameDesc"
                  aria-invalid={!valid}
                  value={formData.Name}
                  onChange={handleChange}
                  onBlur={handleValidate}
                />
                <label
                  id="UsernameLabel"
                  htmlFor="Username"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Username
                </label>
                <p id="UsernameDesc" className="text-[0.6rem] mt-1">
                  Accepted format: 223 followed by capitalised first initial and
                  surname up to the first 6 characters and unique 3 digit ID
                  e.g. 223JDoe123
                </p>
              </div>
              <br />
              <div className="relative z-0 w-full mt-8  group">
                <input
                  type="Password"
                  name="Password"
                  id="Password"
                  className="block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=""
                  required
                  aria-required="true"
                  aria-labelledby="PasswordLabel"
                  aria-describedby="PasswordLabel"
                  value={formData.Password}
                  onChange={handleChange}
                />
                <label
                  id="PasswordLabel"
                  htmlFor="Password"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
              </div>
              <button
                className="self-center decoration-2 mt-6 p-2 w-fit text-base underline text-blue-600 hover:text-blue-400 disabled:text-zinc-500"
                aria-label="Sign In Button"
                disabled={!valid}
              >
                SIGN IN
              </button>
            </fieldset>
            {error.state && (
              <Toast
                color={"failure"}
                message={error.message}
                handleErrorState={closeErrorState}
              />
            )}
            <p className="text-[0.5rem] mt-3">
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
