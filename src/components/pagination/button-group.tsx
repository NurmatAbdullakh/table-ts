import { FC, HtmlHTMLAttributes, ReactNode } from "react"

interface ButtongroupProps extends HtmlHTMLAttributes<HTMLDivElement> {
    children: ReactNode
}

export const Buttongroup: FC<ButtongroupProps> = ({ children, ...props }) => {
    return (
        <div
            style={{ display: "flex", alignItems: "center", gap: "4px" }}
            {...props}
        >
            {children}
        </div>
    )
}
