export function handleFixedColumns(flatColumns) {
  let rightColumns = [];
  let leftColumns = [];
  let middleColumns = [];
  let hiddenColumns = [];

  flatColumns.forEach(column => {
    if (column.isVisibleColumn !== undefined && !column.isVisibleColumn) {
      hiddenColumns.push(column);
    }
    if (column.isFixed) {
      if (column.isFixed === 'left') {
        leftColumns.push(column);
        return;
      } else if (column.isFixed === 'right') {
        rightColumns.push(column);
        return;
      }
    }
    middleColumns.push(column);
  });

  const sortedColumns = [...leftColumns, ...middleColumns, ...rightColumns].map(
    o => o.id
  );

  const lastSortedColumns = JSON.stringify(sortedColumns);

  return {
    lastSortedColumns,
    leftColumns,
    middleColumns,
    rightColumns,
    sortedColumns,
    hiddenColumns,
  };
}

export function getFixedStyle(column, datatableState) {
  if (column && column.isFixed === 'right') {
    const rightColumns = datatableState.rightColumns || [];
    const indexOf = rightColumns.indexOf(column);

    const right = rightColumns.reduce((acc, col, index) => {
      if (index > indexOf) {
        return col.width + acc;
      }

      return acc;
    }, 0);

    return {
      right,
    };
  }

  if (column && column.isFixed === 'left') {
    return {
      left: column.totalLeft,
    };
  }

  return {};
}
