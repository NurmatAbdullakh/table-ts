import { FC, ReactNode } from "react";
import { Button } from "./button";
import { Limit } from "./limit";

interface PaginationProps {
    children: ReactNode
}

export const Pagination: FC<PaginationProps> & {
    Button: typeof Button,
    Limit: typeof Limit
} = ({ children }) => {
    return <div>{children}</div>;
};

Pagination.Button = Button;
Pagination.Limit = Limit;