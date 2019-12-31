import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { getFixedStyle } from './DatatableUtils';

import {
  isDragDisabled,
  isValidDrag,
  getItemStyle,
} from './DatatableHeadUtils';

function getThClassName(column, destinationColumn, isDrag) {
  const classNames = [];

  if (column.id === destinationColumn) {
    classNames.push('is-destination-column');
  }

  if (column && column.isFixed === 'right') {
    classNames.push('is-fixed-right');
  }

  if (column && column.isFixed === 'left') {
    classNames.push('is-fixed-left');
  }

  if (isDrag) {
    classNames.push('is-dragging');
  }

  return classNames.join(' ');
}

function isResizableColumn(isResizable, column) {
  return (
    isResizable && (column.isResizable === undefined || column.isResizable)
  );
}

function getWidthStyle(column, datatableState) {
  if (false) {
    // 'eq-container';
    return {
      width: column.totalWidth,
      minWidth: column.totalminWidth,
      maxWidth: column.totalMaxWidth,
    };
  }

  // 'gt-container'
  return {
    width: column.totalWidth,
    minWidth: column.totalWidth,
    maxWidth: column.totalWidth,
  };
}

export default function DatatableHead({
  headerGroups,
  flatColumns,
  setColumnOrder,
  datatableState,
  isReorderable,
  isResizable,
}) {
  const currentColOrder = useRef();
  const [destinationColumn, setDestinationColumn] = useState(false);

  return (
    <thead>
      {headerGroups.map((headerGroup, key) => (
        <DragDropContext
          key={key}
          onDragStart={(...args) => {
            currentColOrder.current = flatColumns.map(o => o.id);
          }}
          onDragUpdate={dragUpdateObj => {
            const sIndex = dragUpdateObj.source.index;
            const dIndex =
              dragUpdateObj.destination && dragUpdateObj.destination.index;

            if (isValidDrag(sIndex, dIndex, datatableState)) {
              setDestinationColumn(currentColOrder.current[dIndex]);
            } else {
              setDestinationColumn(null);
            }
          }}
          onDragEnd={dragUpdateObj => {
            const sIndex = dragUpdateObj.source.index;
            const dIndex =
              dragUpdateObj.destination && dragUpdateObj.destination.index;

            if (isValidDrag(sIndex, dIndex, datatableState)) {
              const colOrder = [...currentColOrder.current];
              colOrder.splice(sIndex, 1);
              colOrder.splice(dIndex, 0, dragUpdateObj.draggableId);
              setColumnOrder(colOrder);
            }
            setDestinationColumn(null);
          }}
        >
          <Droppable droppableId="droppable" direction="horizontal">
            {(droppableProvided, snapshot) => (
              <tr
                {...headerGroup.getHeaderGroupProps()}
                ref={droppableProvided.innerRef}
              >
                {headerGroup.headers.map((column, index) => (
                  <Draggable
                    key={column.id}
                    draggableId={column.id}
                    index={index}
                    isDragDisabled={isDragDisabled(column, isReorderable)}
                  >
                    {(provided, snapshot) => {
                      return (
                        <th
                          {...column.getHeaderProps()}
                          className={getThClassName(
                            column,
                            destinationColumn,
                            snapshot.isDragging
                          )}
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
                              ...getItemStyle(
                                snapshot,
                                provided.draggableProps.style
                              ),
                            }}
                          >
                            {column.render('Header')}
                          </div>
                          <div
                            {...(isResizableColumn(isResizable, column) &&
                              column.getResizerProps())}
                            className={`resizer ${
                              column.isResizing ? 'isResizing' : ''
                            }`}
                          />
                        </th>
                      );
                    }}
                  </Draggable>
                ))}

                <th className="sumir">{droppableProvided.placeholder}</th>
              </tr>
            )}
          </Droppable>
        </DragDropContext>
      ))}
    </thead>
  );
}
