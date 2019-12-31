export function getItemStyle({ isDragging, isDropAnimating }, draggableStyle) {
  return {
    color: isDragging ? '#FFF' : undefined,
    userSelect: 'none',

    ...draggableStyle,
    ...(!isDragging && { transform: 'translate(0,0)' }),
    ...(isDropAnimating && { transitionDuration: '0.01s' }),
  };
}

export function getThClassName(column, destinationColumn, { isDragging } = {}) {
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

  if (isDragging) {
    classNames.push('is-dragging');
  }

  return classNames.join(' ');
}

export function isResizableColumn(isResizable, column) {
  return (
    isResizable && (column.isResizable === undefined || column.isResizable)
  );
}

export function getWidthStyle(column, datatableState) {
  // 'eq-container';
  // return {
  //   width: column.totalWidth,
  //   minWidth: column.totalminWidth,
  //   maxWidth: column.totalMaxWidth,
  // };

  // // 'gt-container'
  return {
    width: column.totalWidth,
    minWidth: column.totalWidth,
    maxWidth: column.totalWidth,
  };
}
