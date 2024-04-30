import { GitHub } from "@mui/icons-material";

const Header = () => {
  return (
    <>
      <header className="flex shrink-0 justify-center h-24 bg-sky-600">
        <h1 className="text-5xl mb-3 self-end text-white">IBDirect</h1>
        <a
          className="absolute top-2 right-2 text-white"
          href="https://github.com/The-Nightman/IBDirect"
          target="_blank"
          title="GitHub Repository"
          aria-label="Visit the GitHub Repository for this project."
        >
          <GitHub fontSize="large" />
        </a>
      </header>
    </>
  );
};

export default Header;
