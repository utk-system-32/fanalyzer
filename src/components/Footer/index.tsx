import { type FunctionComponent } from "react";
const Footer: FunctionComponent = () => {
  return (
    <footer className="mt-auto flex w-full flex-col bg-[#7d244f] text-white">
      <div className="w-full max-w-[1280px] self-center">
        <p className="self-end text-right">
          Made by{" "}
          <a
            className="text-[#ff8200] underline"
            href="https://github.com/utk-system-32"
          >
            System32
          </a>
        </p>
      </div>
    </footer>
  );
};
export default Footer;
