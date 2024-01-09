import { FC, Key, MouseEventHandler, ReactNode } from "react";

interface ThProps {

    children: ReactNode,
    onClick?: MouseEventHandler | undefined
    key: Key
}


export const Th: FC<ThProps> = ({ children, onClick, ...props }) => {
    return (
        <th onClick={onClick} {...props}>
            {children}
        </th>
    );
};