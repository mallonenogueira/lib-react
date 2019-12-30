import React from 'react';
import DatatableRow from './DatatableRow';

export default function DatatableBody({
  getTableBodyProps,
  rows,
  prepareRow,
  datatableState,
}) {
  return (
    <tbody {...getTableBodyProps()}>
      {rows.map((row, i) => {
        prepareRow(row);
        return (
          <DatatableRow
            row={row}
            datatableState={datatableState}
            {...row.getRowProps()}
          />
        );
      })}
    </tbody>
  );
}
