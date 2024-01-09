import { FC, MouseEventHandler, ReactNode } from "react";

interface ButtonProps {
    children?: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>,
    disabled?: boolean,
    options?: object
}

export const Button: FC<ButtonProps> = ({ onClick, children, ...props }) => {
    return (
        <button onClick={onClick} {...props}>
            {children}
        </button>
    );
};