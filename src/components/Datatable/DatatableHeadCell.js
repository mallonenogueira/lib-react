import React from 'react';
import { getFixedStyle } from './DatatableUtils';
import {
  getItemStyle,
  getThClassName,
  getWidthStyle,
  isResizableColumn,
} from './DatatableHeadCellUtils';

export default function DatatableHeadCell({
  provided,
  snapshot,
  column,
  destinationColumn,
  datatableState,
  isResizable,
}) {
  return (
    <th
      {...column.getHeaderProps()}
      className={getThClassName(column, destinationColumn, snapshot)}
      style={{
        ...getWidthStyle(column),
        ...getFixedStyle(column, datatableState),
      }}
    >
      {snapshot.isDragging ? (
        <div className="th">{column.render('Header')}</div>
      ) : null}
      <div
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        className={'th th__drag'}
        style={{
          ...getItemStyle(snapshot, provided.draggableProps.style),
        }}
      >
        {column.render('Header')}
      </div>
      <div
        {...(isResizableColumn(isResizable, column) &&
          column.getResizerProps())}
        className={`resizer ${column.isResizing ? 'isResizing' : ''}`}
      />
    </th>
  );
}
