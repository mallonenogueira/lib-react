import React, { useState, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { isDragDisabled, isValidDrag } from './DatatableHeadUtils';
import DatatableHeadCell from './DatatableHeadCell';

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
                    {(provided, snapshot) => (
                      <DatatableHeadCell
                        provided={provided}
                        snapshot={snapshot}
                        column={column}
                        destinationColumn={destinationColumn}
                        datatableState={datatableState}
                        isResizable={isResizable}
                      />
                    )}
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
