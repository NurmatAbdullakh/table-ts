import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
}

export const Button: FC<ButtonProps> = ({ onClick, children, ...props }) => {
    return (
        <button className="button" onClick={onClick} {...props}>
            {children}
        </button>
    );
};