import { ChangeEvent, FocusEvent, FormEvent, useState } from "react";
import { DOBForm } from ".";

const PatientLogin = () => {
  interface LoginForm {
    Name: string;
    Password: string;
  }
  interface dobData {
    day: string;
    month: string;
    year: string;
  }
  const [valid, setValid] = useState<boolean>(true);
  const [dobData, setDobData] = useState<dobData>({
    day: "",
    month: "",
    year: "",
  });
  const [formData, setFormData] = useState<LoginForm>({
    Name: "",
    Password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleValidate = (e: FocusEvent<HTMLInputElement>): void => {
    if (!/^[A-Z]{2}[a-z]+\D/.test(e.target.value) && e.target.value != "") {
      e.target.setCustomValidity("Invalid username format");
      setValid(false);
    } else {
      e.target.setCustomValidity("");
      setValid(true);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (Number(dobData.day) < 10) {
      setDobData({
        ...dobData,
        day: `0${dobData.day}`,
      });
    }
    if (Number(dobData.month) < 10) {
      setDobData({
        ...dobData,
        month: `0${dobData.month}`,
      });
    }
    const patientName = `${formData.Name}${dobData.day}${dobData.month}${dobData.year}`;
    setFormData({
      ...formData,
      Name: patientName,
    });
  };

  return (
    <>
      <section className="w-72 mt-8 shadow-xl">
        <div className="flex justify-center h-20 rounded-t bg-gradient-to-br from-sky-700 to-blue-400">
          <h2 className="text-4xl self-center text-white">Sign In</h2>
        </div>
        <div className="px-8 py-7 rounded-b bg-white">
          <form onSubmit={handleSubmit}>
            <fieldset className="flex flex-col h-full">
              <legend className="sr-only">Patient login form</legend>
              <DOBForm setDobData={setDobData} />
              <div className="relative z-0 w-full mt-8 group">
                <input
                  type="text"
                  name="Name"
                  id="Name"
                  className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 ${
                    valid ? "border-gray-300" : "border-red-500"
                  } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
                  placeholder=""
                  required
                  aria-required="true"
                  aria-labelledby="NameLabel"
                  aria-describedby="NameDesc"
                  aria-invalid={!valid}
                  value={formData.Name}
                  onChange={handleChange}
                  onBlur={handleValidate}
                />
                <label
                  id="NameLabel"
                  htmlFor="Name"
                  className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Name
                </label>
                <p id="NameDesc" className="text-[0.6rem] mt-1">
                  Accepted format: capitalised first followed by surname e.g.
                  JDoe
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
            <p className="text-[0.5rem] mt-3">
              By proceeding, you confirm that you are the intended recipient or
              the parent/legal guardian of the recipient. Please be advised that
              it is an offence to access information not intended for you
              without the explicit consent of the recipient.
            </p>
          </form>
        </div>
      </section>
    </>
  );
};

export default PatientLogin;
