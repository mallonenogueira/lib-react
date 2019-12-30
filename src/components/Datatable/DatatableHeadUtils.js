export function getItemStyle({ isDragging, isDropAnimating }, draggableStyle) {
  return {
    color: isDragging ? '#FFF' : undefined,
    userSelect: 'none',

    ...draggableStyle,
    ...(!isDragging && { transform: 'translate(0,0)' }),
    ...(isDropAnimating && { transitionDuration: '0.01s' }),
  };
}

export function isValidDrag(sIndex, dIndex, datatableState) {
  return (
    typeof sIndex === 'number' &&
    typeof dIndex === 'number' &&
    sIndex !== dIndex &&
    isTheSameGroupByIndex(datatableState, sIndex, dIndex)
  );
}

export function isTheSameGroupByIndex(
  datatableState,
  columnIndex1,
  columnIndex2
) {
  const leftIndex = datatableState.leftColumns.length;
  const middleIndex = datatableState.middleColumns.length;

  console.log(columnIndex1, columnIndex2, leftIndex, middleIndex);

  return (
    (columnIndex1 < leftIndex && columnIndex2 < leftIndex) ||
    (columnIndex1 <= middleIndex && columnIndex2 <= middleIndex) ||
    (columnIndex1 > middleIndex && columnIndex2 > middleIndex)
  );
}

export function isDragDisabled(column, isReorderable) {
  return (
    !isReorderable ||
    !!column.columns ||
    (column && column.isReorderable === false)
  );
}
