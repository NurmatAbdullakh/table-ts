import { ChangeEvent, ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useMemo } from "react"
import { callFns } from "../../utils/callFns";



type GetPrevButtonPropsFn = (
    options?: {
        onClick?: MouseEventHandler<HTMLButtonElement>;
        disabled?: boolean
    }
) => object;

type GetNextButtonPropsFn = (
    options?: {
        onClick?: MouseEventHandler<HTMLButtonElement>;
        disabled?: boolean
    }
) => object;


export type GetLimitPropsFn = (
    options?: {
        onChange?: ChangeEventHandler<HTMLSelectElement>;
    }
) => object;



interface UsePaginationReturn {
    getPrevButtonProps: GetPrevButtonPropsFn;
    getNextButtonProps: GetNextButtonPropsFn;
    getLimitProps: GetLimitPropsFn;
    renderingData: { name: string; age: number; address: string; id: string; }[];
    steps: number[]
}

type usePaginationParams = {
    page: number,
    limit: number,
    setPage: Dispatch<SetStateAction<number>>,
    setLimit: Dispatch<SetStateAction<number>>,
    data: { name: string; age: number; address: string; id: string; }[]
}

type UsePaginationFn = (params: usePaginationParams) => UsePaginationReturn;

export const usePagination: UsePaginationFn = ({ page, limit, setPage, setLimit, data }) => {

    const pageSize = Math.ceil(data.length / limit)

    const firstPageIndex = Math.max((page - 1) * limit, 0)
    const lastPageIndex = firstPageIndex + limit

    const renderingData = useMemo(() =>
        data.slice(firstPageIndex, lastPageIndex),
        [firstPageIndex, lastPageIndex, data]
    )

    const steps = useMemo(() =>
        [...new Array(Math.ceil(data.length / limit)).keys()],
        [data.length, limit]
    )

    const handlePrevious = () => {
        setPage(prev => prev === 1 ? prev : prev - 1)
    }

    function handleNext() {
        setPage(prev => prev >= pageSize ? prev : prev + 1)
    }

    function handleLimitChange(e: ChangeEvent<HTMLSelectElement>) {
        setPage(1)
        setLimit(+e.target.value)
    }

    const getPrevButtonProps: GetPrevButtonPropsFn = ({ onClick = () => { }, ...props } = {}) => (
        {
            type: "button",
            onClick: callFns(handlePrevious, onClick),
            ...props,
        }
    )

    const getNextButtonProps: GetNextButtonPropsFn = ({ onClick = () => { }, ...props } = {}) => (
        {
            type: "button",
            onClick: callFns(handleNext, onClick),
            ...props,
        }
    )

    const getLimitProps: GetLimitPropsFn = ({ onChange = () => { }, ...props } = {}) => (
        {
            onChange: callFns(handleLimitChange, onChange),
            ...props
        }
    )

    return {
        getPrevButtonProps,
        getNextButtonProps,
        getLimitProps,
        renderingData,
        steps,
    }
}