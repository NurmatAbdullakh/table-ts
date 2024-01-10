import { ChangeEventHandler, FC, ReactNode } from "react";

interface OptionProps {
    children: ReactNode
    value: string
}

export interface LimitProps {
    children: ReactNode
    onChange?: ChangeEventHandler<HTMLSelectElement>
}

const Option: FC<OptionProps> = ({ children, value }) => {
    return <option value={value}>{children}</option>;
};

export const Limit: FC<LimitProps> & { Option: typeof Option } = ({ onChange, children, ...props }) => {
    return (
        <select
            onChange={onChange}
            defaultValue={3}
            {...props}
            name="limit"
            id="limit"
        >
            {children}
        </select>
    );
};

Limit.Option = Option;