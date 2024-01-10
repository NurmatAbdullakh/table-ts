import { FC, ReactNode } from "react";
import { Button } from "./button";
import { Limit } from "./limit";
import { Buttongroup } from "./button-group";
import { Step } from "./step";
import { Navigator } from "./Navigator";

interface PaginationProps {
    children: ReactNode
}

export const Pagination: FC<PaginationProps> & {
    Button: typeof Button,
    Limit: typeof Limit
    Buttongroup: typeof Buttongroup
    Step: typeof Step
    Navigator: typeof Navigator
} = ({ children }) => {
    return <div>{children}</div>;
};

Pagination.Button = Button;
Pagination.Limit = Limit;
Pagination.Buttongroup = Buttongroup
Pagination.Step = Step
Pagination.Navigator = Navigator
