import { useMemo, useState } from "react";
import { useAppSelector } from "./store/store";
import { User } from "./store/user";

type getInputValue = (columnKey: string, filterValues: [string, unknown][]) => string

export const useAppProps = () => {
    const users = useAppSelector(state => state.user.users)
    const [filter, setFilter] = useState({})
    const [sortConfig, setSortConfig] = useState({ type: "", columnKey: "" })

    const [limit, setLimit] = useState(3);
    const [page, setPage] = useState(1);



    // FILTER ////////////////////////////////////////////////////////////
    const filterValues = useMemo(
        () => Object.entries(filter)
            .filter(([, value]) => value)
        ,
        [filter]
    )

    const filterDataByFilterValue = (data: User[], filterValues: [string, unknown][]) =>
        data
            ?.filter(element =>
                filterValues?.every(([columnKey, filterValue]) => {
                    const formatElementValue =
                        String(element[columnKey as keyof User])?.toLowerCase()?.replace(" ", "")
                    const formatFilterValue =
                        String(filterValue)?.toLowerCase()?.replace(" ", "")

                    return formatElementValue?.includes(formatFilterValue)
                })
            )

    const clearFilter = () => {
        setFilter({})
    }

    const isClearButtonDisabled = useMemo(() => !Object.values(filter)?.length, [filter])


    // SORT /////////////////////////////////////////////////////////////////////////////////////////

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sortData = (data: any) => {
        if (+data[0][sortConfig?.columnKey]) {
            return data?.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
                switch (sortConfig?.type) {
                    case "ASC": return a[sortConfig.columnKey] - b[sortConfig.columnKey]
                    case "DSC": return b[sortConfig.columnKey] - a[sortConfig.columnKey]
                    default: return
                }
            })
        }
        return data?.sort((a: { [x: string]: number; }, b: { [x: string]: number; }) => {
            switch (sortConfig?.type) {
                case "ASC": return a[sortConfig.columnKey] > b[sortConfig.columnKey] ? 1 : -1
                case "DSC": return a[sortConfig.columnKey] > b[sortConfig.columnKey] ? -1 : 1
                default: return
            }
        })
    }

    const onSortBtnClick = (columnKey: string) => {
        setSortConfig(old => {
            const newConf = {
                type: "",
                columnKey: columnKey
            }

            switch (old?.type || "") {
                case "ASC":
                    newConf.type = "DSC"
                    break
                case "DSC":
                    newConf.type = ""
                    break
                default:
                    newConf.type = "ASC"
                    break
            }

            return newConf
        })
    }

    const getInputValue: getInputValue = (columnKey, filterValues) => {
        const value = filterValues?.find(([valueKey]) => columnKey === valueKey)?.[1] || ""
        return value as string
    }


    const data = [
        ...users
    ];

    const columns = [
        {
            id: "1",
            title: "ID",
            key: "id",
            render: () => { }
        },
        {
            id: "2",
            title: "Name",
            key: "name",
            render: () => { }
        },
        {
            id: "4",
            title: "User Name",
            key: "username",
            render: () => { }
        },
        {
            id: "5",
            title: "Email ",
            key: "email",
            render: () => { }
        },
        {
            id: "6",
            title: "Phone",
            key: "phone",
            render: () => { }
        },
        {
            id: "7",
            title: "Web Site",
            key: "website",
            render: () => { }
        },
    ];

    return {
        limit,
        setLimit,
        page,
        setPage,
        data,
        columns,
        setFilter,
        filterValues,
        clearFilter,
        getInputValue,
        filterDataByFilterValue,
        isClearButtonDisabled,
        setSortConfig,
        sortConfig,
        sortData,
        onSortBtnClick
    }

}


// const filterDataByFilterValue = (data: User[], searchTerm: string) =>
//   data.filter(element =>
//     Object.values(element)
//       .some(value => {
//         const formatValue = String(value)?.toLowerCase()?.replace(" ", "")
//         const formatSearchTerm = searchTerm?.toLowerCase()?.replace(" ", "")

//         return formatValue?.includes(formatSearchTerm)
//       })
//   )