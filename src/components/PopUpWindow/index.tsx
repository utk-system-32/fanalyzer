import {
  type ReactNode,
  type FunctionComponent,
  type SyntheticEvent,
} from "react";

interface Props {
  children?: ReactNode;
  submitButtonText?: string;
  closeWindowHandler(): void;
  submitHandler(e: SyntheticEvent): void;
}

const PopUpForm: FunctionComponent<Props> = ({
  children,
  submitButtonText,
  closeWindowHandler,
  submitHandler,
}) => {
  return (
    <div className="absolute z-50 flex h-screen w-screen flex-col items-center justify-center bg-[rgba(0,0,0,0.2)]">
      <form
        onSubmit={submitHandler}
        className="z-[51] flex min-h-[600px] min-w-[400px] flex-col rounded bg-white p-5 opacity-100"
      >
        <button
          onClick={closeWindowHandler}
          type="button"
          className="cursor-pointer self-end rounded bg-gray-200 px-2 py-1 text-3xl font-semibold text-gray-500"
        >
          X
        </button>
        {children}
        <button
          type="submit"
          className="mt-auto rounded-md bg-[#ff8200] p-4 font-semibold text-white duration-300 ease-in-out hover:brightness-75"
        >
          {submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default PopUpForm;
