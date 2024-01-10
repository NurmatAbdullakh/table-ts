import { useTableHook } from "./components/table/use-table-hook";
import { Table, TableContainer } from "./components/table/index.d";
import { Pagination, usePagination } from "./components/pagination/index.d";
import { useAppProps } from "./use-app-props";
import { User } from "./store/user";
import { ReactNode } from "react";
import { Button } from "./components/pagination/button";

export const App = () => {
  const {
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
    isClearButtonDisabled
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

  const {
    getRowProps,
  } = useTableHook();

  return (
    <div className="container">
      <TableContainer>
        <Button disabled={isClearButtonDisabled} onClick={clearFilter} style={{ marginBottom: "10px" }}>
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
                      <input
                        placeholder="Search"
                        value={getInputValue(column.key, filterValues)}
                        onChange={(e) =>
                          setFilter(old => ({
                            ...old,
                            [column.key]: e.target.value
                          }))
                        }
                      />
                    </div>
                  </Table.Th>
                );
              })}
            </Table.Tr>
          </Table.Head>
          <Table.Body>
            {
              filterDataByFilterValue(renderingData, filterValues)
                .map((row, index) => {
                  return (
                    <Table.Tr
                      key={row.id || index}
                      {...getRowProps({
                        onClick: () => console.log({ row, index }),
                      })}>
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
          <Pagination.Limit {...getLimitProps()}>
            <Pagination.Limit.Option value="1">1</Pagination.Limit.Option>
            <Pagination.Limit.Option value="2">2</Pagination.Limit.Option>
            <Pagination.Limit.Option value="3">3</Pagination.Limit.Option>
          </Pagination.Limit>
          <Pagination.Button {...getPrevButtonProps({ disabled: page === 1 })}>Prev</Pagination.Button>
          {steps?.map((step) => (
            <Pagination.Button onClick={() => setPage(step + 1)}>{step + 1}</Pagination.Button>
          ))}
          <Pagination.Button {...getNextButtonProps({ disabled: page >= Math.ceil(data.length / limit) })}>Next</Pagination.Button>
        </Pagination>
      </TableContainer>
    </div >
  );
}

export default App;


