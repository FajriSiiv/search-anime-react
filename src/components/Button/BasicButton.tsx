import React from "react";

type BasicButtonProps = React.ComponentProps<"button"> & {
  className?: string;
  name?: string;
};

const BasicButton = ({
  name = "Button",
  className,
  ...props
}: BasicButtonProps) => {
  return (
    <button
      className={`py-2 px-10 border rounded-md capitalize bg-sky-500 text-white disabled:bg-sky-500/40 ${className}`}
      {...props}
    >
      {name}
    </button>
  );
};

export default BasicButton;
