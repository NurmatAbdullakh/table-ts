import { FC, ReactNode } from 'react'
import { Body } from './components/body'
import { Foot } from './components/foot'
import { Head } from './components/head'
import { Td } from './components/td'
import { Th } from './components/th'
import { Tr } from './components/tr'

interface TableProps {
    children: ReactNode,
}

interface TableContainerProps {
    children: ReactNode
}

export const Table: FC<TableProps> & {
    Head: typeof Head,
    Body: typeof Body,
    Th: typeof Th,
    Tr: typeof Tr,
    Td: typeof Td,
    Foot: typeof Foot
} = ({ children }) => {
    return (
        <div className="table">{children}</div>
    )
}

export const TableContainer: FC<TableContainerProps> = ({ children }) => {
    return <div className="table-container">{children}</div>
};

Table.Head = Head
Table.Body = Body
Table.Th = Th
Table.Tr = Tr
Table.Td = Td
Table.Foot = Foot
