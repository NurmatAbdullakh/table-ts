import { ChangeEvent, ChangeEventHandler, Dispatch, MouseEventHandler, SetStateAction, useMemo } from "react"
import { callFns } from "../../utils/callFns";
import { User } from "../../store/user";



type getPrevButtonPropsFn = (
    options?: {
        onClick?: MouseEventHandler<HTMLButtonElement>;
        disabled?: boolean
    }
) => object;

type getNextButtonPropsFn = (
    options?: {
        onClick?: MouseEventHandler<HTMLButtonElement>;
        disabled?: boolean
    }
) => object;


export type getLimitPropsFn = (
    options?: {
        onChange?: ChangeEventHandler<HTMLSelectElement>;
    }
) => object;



interface UsePaginationReturn {
    getPrevButtonProps: getPrevButtonPropsFn;
    getNextButtonProps: getNextButtonPropsFn;
    getLimitProps: getLimitPropsFn;
    renderingData: User[];
    steps: number[]
}

type usePaginationParams = {
    page: number,
    limit: number,
    setPage: Dispatch<SetStateAction<number>>,
    setLimit: Dispatch<SetStateAction<number>>,
    data: User[],
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

    const getPrevButtonProps: getPrevButtonPropsFn = ({ onClick = () => { }, ...props } = {}) => (
        {
            type: "button",
            onClick: callFns(handlePrevious, onClick),
            ...props,
        }
    )

    const getNextButtonProps: getNextButtonPropsFn = ({ onClick = () => { }, ...props } = {}) => (
        {
            type: "button",
            onClick: callFns(handleNext, onClick),
            ...props,
        }
    )

    const getLimitProps: getLimitPropsFn = ({ onChange = () => { }, ...props } = {}) => (
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