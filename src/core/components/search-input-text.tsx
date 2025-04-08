import { MagnifyingGlass } from "@phosphor-icons/react";
import { ComponentProps } from "react";

interface SearchInputTextProps extends ComponentProps<"input"> {}

export function SearchInputText({ ...props }: SearchInputTextProps) {
  return (
    <label className="bg-gray-700 items-center justify-between px-5 flex rounded-sm border border-gray-500 relative min-w-[280px] h-[48px] w-full ">
      <input
        type="text"
        className={`focus:outline-0 placeholder:text-gray-400 ${
          props.disabled && "cursor-not-allowed opacity-30"
        }`}
        {...props}
      />
      <MagnifyingGlass size={20} color="#303F73" />
    </label>
  );
}
