import { ButtonHTMLAttributes, FC, ReactNode } from "react";

interface StepProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode,
    isActive?: boolean
}

export const Step: FC<StepProps> = ({ isActive, onClick, children, ...props }) => {
    return (
        <button className={isActive ? "step active" : "step"} onClick={onClick} {...props}>
            {children}
        </button>
    );
};  