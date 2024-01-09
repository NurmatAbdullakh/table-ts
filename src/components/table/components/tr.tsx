import { FC, ReactNode } from "react";


interface TrProps {
    children: ReactNode
}

export const Tr: FC<TrProps> = ({
    children,
    ...props
}) => {
    return (
        <tr {...props}>
            {children}
        </tr>
    );
};