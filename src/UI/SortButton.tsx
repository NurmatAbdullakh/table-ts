import { ButtonHTMLAttributes, FC, ReactNode } from "react";
import { Button } from "../components/pagination/button";
import { AZSortArrowIcon, SortArrowIcon, ZASortArrowIcon } from "../assets/icons/icons";

interface SortButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode
    sortType: string
    columnKey: string
    sortConfigColumnKey: string
}

export const SortButton: FC<SortButtonProps> = ({ onClick, sortType, columnKey, sortConfigColumnKey, ...props }) => {
    return (
        <Button
            onClick={onClick}
            style={{ background: "none" }}
            {...props}
        >
            {
                (
                    (columnKey === sortConfigColumnKey) && sortType === "ASC") ?
                    <AZSortArrowIcon />
                    : ((columnKey === sortConfigColumnKey) && sortType === "DSC") ?
                        <ZASortArrowIcon />
                        :
                        <SortArrowIcon />
            }
        </Button >
    );
};