import { FC, ReactNode } from "react";

interface FootProps {
    children: ReactNode
}

export const Foot: FC<FootProps> = ({ children }) => {
    return <tfoot>{children}</tfoot>;
};