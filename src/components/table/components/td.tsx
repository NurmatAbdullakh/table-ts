import { FC, ReactNode } from "react";

interface TdProps {
    children: ReactNode
}



export const Td: FC<TdProps> = ({ children, ...props }) => {
    return <td {...props}>{children}</td>;
};