import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface NavigatorProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode,
}

export const Navigator: FC<NavigatorProps> = ({ onClick, children, ...props }) => {
    return (
        <button className="navigator" onClick={onClick} {...props}>
            {children}
        </button>
    );
};  