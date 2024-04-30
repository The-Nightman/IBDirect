import { GitHub } from "@mui/icons-material";
import { Modal } from "flowbite-react";
import { useState } from "react";
import { Outlet } from "react-router-dom";

const Root = () => {
  const [introModalState, setIntroModalState] = useState<boolean>(true);

  return (
    <>
      <Modal
        show={introModalState}
        aria-label={`Welcome to the Portal intro modal`}
      >
        <div className="flex flex-col items-center m-4 p-4">
          <strong className="mb-6 text-xl underline">
            Welcome to IBDirect, please read this before continuing
          </strong>
          <p className="mb-6">
            This is a demo portal for IBDirect, a fictional healthcare service
            targeted at Inflammatory Bowel Disease patients and the healthcare
            professionals responsible for their care.
            <br />
            This project is intended to demonstrate the functionality of a
            healthcare portal, including appointment scheduling, prescription
            management, patient IBD control surveys and most importantly a real
            time chat.
          </p>
          <a
            className="mb-6 text-blue-600 underline text-center"
            href="https://github.com/The-Nightman/IBDirect"
            target="_blank"
          >
            Click here to view the list of test accounts and the source code on
            GitHub or click the <GitHub /> icon in the top right corner at any time.
          </a>
          <strong className="mb-12">
            This portal is intended for demonstration purposes only, and is not
            a genuine service. Please do not enter genuine personal information.
          </strong>
          <button
            className="rounded-sm py-2 px-4 bg-blue-400 hover:bg-sky-700 active:bg-sky-500 hover:text-white"
            onClick={() => setIntroModalState(false)}
          >
            Continue
          </button>
        </div>
      </Modal>
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
