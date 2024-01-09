import { FC, ReactNode } from "react";

interface HeadProps {
    children: ReactNode
}

export const Head: FC<HeadProps> = ({ children }) => {
    return <thead>{children}</thead>;
};