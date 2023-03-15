import {
  SyntheticEvent,
  useState,
  type FunctionComponent,
  type ReactNode,
} from "react";
interface Props {
  dropdownButtonText: string;
  children: ReactNode;
}
const Dropdown: FunctionComponent<Props> = ({
  dropdownButtonText,
  children,
}) => {
  const handleClick = (e: SyntheticEvent) => {
    setDisplay(!display);
  };
  const [display, setDisplay] = useState(false);
  return (
    <>
      <div className="relative" onMouseLeave={(e) => setDisplay(false)}>
        <button
          className={"duration-300 ease-in-out hover:text-[#ff8200]"}
          onClick={handleClick}
        >
          {dropdownButtonText}
        </button>
        {display && (
          <div className="absolute flex w-full min-w-[250px] flex-col items-start bg-gray-50 p-1 drop-shadow-md [&>*]:w-full [&>*]:text-left [&>button:hover]:text-[#ff8200]">
            {children}
          </div>
        )}
      </div>
    </>
  );
};

export default Dropdown;
