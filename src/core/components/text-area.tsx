import { ComponentProps } from "react";

interface SearchInputTextProps extends ComponentProps<"textarea"> {}


export function TextArea({...props}:SearchInputTextProps){

    return(
        <textarea {...props} className="p-3 scrollbar-style bg-gray-800 border border-gray-500 rounded-sm min-h-[146px] hover:border-green-200 focus:outline-none focus:border-green-100"></textarea>
    )
}