import { useState } from "react";
import { useAppSelector } from "./store/store";

export const useAppProps = () => {
    const users = useAppSelector(state => state.user.users)
    console.log("users", users);


    const [limit, setLimit] = useState(1);
    const [page, setPage] = useState(1);

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
            title: "NAME",
            key: "name",
            render: () => { }
        },
        {
            id: "4",
            title: "USER NAME",
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
            title: "PHONE",
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
    }

}