import { Outlet } from "react-router-dom";

const Root = () => {
  return (
    <>
      <div className="flex justify-center">
        <Outlet />
      </div>
      <footer className="mt-3 mx-4 text-base text-center text-neutral-600">
        WARNING:
        <br />
        THIS PRODUCT IS NOT A GENUINE SERVICE AND IS NOT GUARANTEED GDPR/HIPAA
        COMPLIANT, DO NOT ENTER GENUINE PERSONAL INFORMATION.
        <br />
        YOU HAVE BEEN WARNED
      </footer>
    </>
  );
};

export default Root;
