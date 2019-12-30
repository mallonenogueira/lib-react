import React from 'react';
import { getFixedStyle } from './DatatableUtils';

function getTdClassName(column) {
  const classNames = [];

  if (column && column.meta && column.meta.fixed === 'right') {
    classNames.push('is-fixed-right');
  }

  if (column && column.meta && column.meta.fixed === 'left') {
    classNames.push('is-fixed-left');
  }

  return classNames.join(' ');
}

export default function DatatableRow({ row, datatableState }) {
  return (
    <tr>
      {row.cells.map(cell => {
        return (
          <td
            style={{
              ...getFixedStyle(cell.column, datatableState),
            }}
            className={getTdClassName(cell.column)}
            {...cell.getCellProps()}
          >
            {cell.render('Cell')}
          </td>
        );
      })}
    </tr>
  );
}
