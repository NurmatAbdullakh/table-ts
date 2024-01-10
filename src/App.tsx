import { ReactNode } from "react";
import { SortButton } from "./UI/SortButton";
import { LeftArrowIcon, RightArrowIcon } from "./assets/icons/icons";
import { Button } from "./components/pagination/button";
import { Pagination, usePagination } from "./components/pagination/index.d";
import { Table, TableContainer } from "./components/table/index.d";
import { useTableHook } from "./components/table/use-table-hook";
import { User } from "./store/user";
import { useAppProps } from "./use-app-props";
import { SearchInput } from "./UI/SearchInput";


export const App = () => {
  const {
    limit,
    setLimit,
    page,
    setPage,
    data,
    columns,
    filterValues,
    clearFilter,
    getInputValue,
    filterDataByFilterValue,
    isClearButtonDisabled,
    onSortBtnClick,
    sortConfig,
    sortData,
    onSearchInputChange
  } = useAppProps()

  const {
    getLimitProps,
    getNextButtonProps,
    getPrevButtonProps,
    renderingData,
    steps
  } = usePagination({
    data,
    limit,
    setLimit,
    page,
    setPage,
  })

  return (
    <div className="wrapper">

      <TableContainer>
        <Button disabled={isClearButtonDisabled} onClick={clearFilter} style={{ marginBottom: "10px", minWidth: "100px", display: "flex" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" ><path fill="white" d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm4 12H8v-9h2v9zm6 0h-2v-9h2v9zm.618-15L15 2H9L7.382 4H3v2h18V4z"></path></svg>
          clear filter
        </Button>
        <Table>
          <Table.Head>
            <Table.Tr>
              {columns.map((column, index) => {
                return (
                  <Table.Th
                    key={column?.id || index}>
                    <div>
                      {column.title}
                      <SearchInput
                        value={getInputValue(column.key, filterValues)}
                        onChange={(e) => onSearchInputChange(e, column.key)}
                      />
                      <SortButton
                        onClick={() => onSortBtnClick(column.key)}
                        sortType={sortConfig.type}
                        columnKey={column.key}
                        sortConfigColumnKey={sortConfig.columnKey}
                      />
                    </div>
                  </Table.Th>
                );
              })}
            </Table.Tr>
          </Table.Head>
          <Table.Body>
            {!!data?.length &&
              filterDataByFilterValue(sortData(renderingData), filterValues)
                ?.map((row, index) => {
                  return (
                    <Table.Tr
                      key={row.id || index}
                    >
                      {columns.map((column, index) => {
                        return (
                          <Table.Td key={index}>
                            {row[column.key as keyof User] as ReactNode}
                          </Table.Td>
                        );
                      })}
                    </Table.Tr>
                  );
                })}
          </Table.Body>
        </Table>
        <Pagination>
          <Pagination.Buttongroup>
            <Pagination.Limit {...getLimitProps()}>
              <Pagination.Limit.Option value="5">5</Pagination.Limit.Option>
              <Pagination.Limit.Option value="10">10</Pagination.Limit.Option>
            </Pagination.Limit>
            <Pagination.Navigator {...getPrevButtonProps({ disabled: page === 1 })}>
              <LeftArrowIcon />
            </Pagination.Navigator>
            {steps?.map((step) => (
              <Pagination.Step isActive={page === step + 1} onClick={() => setPage(step + 1)}>{step + 1}</Pagination.Step>
            ))}
            <Pagination.Navigator {...getNextButtonProps({ disabled: page >= Math.ceil(data.length / limit) })}>
              <RightArrowIcon />
            </Pagination.Navigator>
          </Pagination.Buttongroup>
        </Pagination>
      </TableContainer>
    </div >
  );
}

export default App;


