import { FC, ReactNode, ThHTMLAttributes } from "react";

interface ThProps extends ThHTMLAttributes<HTMLTableHeaderCellElement> {
    children: ReactNode,
}

export const Th: FC<ThProps> = ({ children, onClick, ...props }) => {
    return (
        <th onClick={onClick} {...props}>
            {children}
        </th>
    );
};