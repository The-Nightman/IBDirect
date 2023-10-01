import { ChangeEvent, useState } from "react";

const DOBForm = () => {
  interface dobData {
    day: string;
    month: string;
    year: string;
  }
  interface dobValidData {
    day: boolean;
    month: boolean;
    year: boolean;
  }

  const [dobValid, setDobValid] = useState<dobValidData>({
    day: true,
    month: true,
    year: true,
  });
  const [dobFormData, setDobFormData] = useState<dobData>({
    day: "",
    month: "",
    year: "",
  });

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target;
    if (!/^\d{4}$/.test(value)) {
      setDobValid({
        ...dobValid,
        year: false,
      });
    } else {
      setDobValid({
        ...dobValid,
        year: true,
      });
    }
    setDobFormData({
      ...dobFormData,
      year: value,
    });
  };
  const handleMonthChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target;
    if (Number(value) < 1 || Number(value) > 12) {
      setDobValid({
        ...dobValid,
        month: false,
      });
    } else {
      setDobValid({
        ...dobValid,
        month: true,
      });
    }
    setDobFormData({
      ...dobFormData,
      month: value,
    });
  };
  const handleDayChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value }: { value: string } = e.target;
    if (Number(value) < 1 || Number(value) > 31) {
      setDobValid({
        ...dobValid,
        day: false,
      });
    } else {
      setDobValid({
        ...dobValid,
        day: true,
      });
    }
    setDobFormData({
      ...dobFormData,
      day: value,
    });
  };

  return (
    <>
      <legend className="text-xs text-gray-900 mb-5">Date of Birth</legend>
      <div className="flex flex-row w-full justify-between">
        <div className="relative z-0 w-10 group">
          <input
            type="number"
            name="Day"
            id="Day"
            className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 ${
              dobValid.day ? "border-gray-300" : "border-red-500"
            } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            required
            min="1"
            max="31"
            aria-required="true"
            aria-labelledby="DayLabel"
            aria-describedby="DayDesc"
            aria-invalid={!dobValid.day}
            value={dobFormData.day}
            onChange={handleDayChange}
          />
          <label
            id="DayLabel"
            htmlFor="Day"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Day
          </label>
          <p id="DayDesc" className="sr-only">
            Day of birth
          </p>
        </div>
        <div className="relative z-0 w-10 group">
          <input
            type="number"
            name="Month"
            id="Month"
            className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 ${
              dobValid.month ? "border-gray-300" : "border-red-500"
            } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            required
            min="1"
            max="12"
            aria-required="true"
            aria-labelledby="MonthLabel"
            aria-describedby="MonthDesc"
            aria-invalid={!dobValid.month}
            value={dobFormData.month}
            onChange={handleMonthChange}
          />
          <label
            id="MonthLabel"
            htmlFor="Month"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Month
          </label>
          <p id="MonthDesc" className="sr-only">
            Month of birth
          </p>
        </div>
        <div className="relative z-0 w-20 group">
          <input
            type="number"
            name="Year"
            id="Year"
            className={`block py-2.5 px-0 w-full text-base text-gray-900 bg-transparent border-0 border-b-2 ${
              dobValid.year ? "border-gray-300" : "border-red-500"
            } appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
            required
            min="0"
            max="31"
            aria-required="true"
            aria-labelledby="YearLabel"
            aria-describedby="YearDesc"
            aria-invalid={!dobValid.year}
            value={dobFormData.year}
            onChange={handleYearChange}
          />
          <label
            id="YearLabel"
            htmlFor="Year"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Year
          </label>
          <p id="YearDesc" className="sr-only">
            Year of birth
          </p>
        </div>
      </div>
    </>
  );
};

export default DOBForm;
