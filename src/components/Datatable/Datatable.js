import React, { useEffect, useState } from 'react';
import {
  useTable,
  useColumnOrder,
  useResizeColumns,
  useRowSelect,
} from 'react-table';
import DatatableHead from './DatatableHead';
import DatatableBody from './DatatableBody';
import { handleFixedColumns } from './DatatableUtils';
import DatatableSelectionColumn from './DatatableSelectionColumn';

function Datatable({
  columns,
  data,
  isReorderable,
  isResizable,
  stateReducer = () => {},
}) {
  const [datatableState, setState] = useState({});

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    flatColumns,
    setColumnOrder,
  } = useTable(
    {
      columns,
      data,
      stateReducer,
    },
    useColumnOrder,
    useResizeColumns,
    useRowSelect
  );

  useEffect(() => {
    var fixedState = handleFixedColumns(flatColumns);

    if (fixedState.lastSortedColumns !== datatableState.lastSortedColumns) {
      setState({
        ...datatableState,
        ...fixedState,
      });
      setColumnOrder(fixedState.sortedColumns);
    }
  }, [flatColumns, setColumnOrder, setState, datatableState]);

  return (
    <div className="datatable">
      <table {...getTableProps()}>
        <DatatableHead
          headerGroups={headerGroups}
          flatColumns={flatColumns}
          setColumnOrder={setColumnOrder}
          datatableState={datatableState}
          isReorderable={isReorderable}
          isResizable={isResizable}
        />

        <DatatableBody
          getTableBodyProps={getTableBodyProps}
          rows={rows}
          prepareRow={prepareRow}
          datatableState={datatableState}
        />
      </table>
    </div>
  );
}

Datatable.getSelectionColumn = () => ({
  ...DatatableSelectionColumn,
});

export default Datatable;
