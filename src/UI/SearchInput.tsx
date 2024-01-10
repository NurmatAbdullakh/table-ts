import { FC, InputHTMLAttributes, ReactNode } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode
}

export const SearchInput: FC<SearchInputProps> = ({ onChange, value, ...props }) => {
    return (
        <input
            placeholder="Search"
            value={value}
            onChange={onChange}
            // onChange={(e) =>
            //     setFilter(old => ({
            //         ...old,
            //         [column.key]: e.target.value
            //     }))
            // }
            {...props}
        />
    );
};