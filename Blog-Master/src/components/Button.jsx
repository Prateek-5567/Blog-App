import React from "react";

export default function Button({
    children,
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
}) {
    return (
        <button className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`} {...props}>
            {children}
        </button>
    );
}


// children is nothing but the text inside button.
// className = ``  => gives error as backticks are js syntax so you can not directly use them in .jsx (react) file 
// to use any js syntax inside react file put it inside {} 