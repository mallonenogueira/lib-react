export function handleFixedColumns(flatColumns) {
  let rightColumns = [];
  let leftColumns = [];
  let middleColumns = [];
  let hiddenColumns = [];

  flatColumns.forEach(column => {
    if (column.isVisibleColumn !== undefined && !column.isVisibleColumn) {
      hiddenColumns.push(column);
    }
    if (column.meta && column.meta.fixed) {
      if (column.meta.fixed === 'left') {
        leftColumns.push(column);
        return;
      } else if (column.meta.fixed === 'right') {
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
  if (column && column.meta && column.meta.fixed === 'right') {
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

  if (column && column.meta && column.meta.fixed === 'left') {
    return {
      left: column.totalLeft,
    };
  }

  return {};
}
