import React, { forwardRef, useRef, useEffect } from 'react';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return <input type="checkbox" ref={resolvedRef} {...rest} />;
});

export default {
  id: 'selection',
  width: 50,
  minWidth: 50,
  maxWidth: 50,
  isReorderable: false,
  isFixed: 'left',

  Header: ({ getToggleAllRowsSelectedProps }) => {
    const props = getToggleAllRowsSelectedProps();
    // const onChangeOriginal = props.onChange;
    // const onChange = column.onChangeAll || props.onChange;
    // props.onChange = undefined;
    // onChange={event => onChange(event, column, onChangeOriginal)}

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IndeterminateCheckbox
          {...getToggleAllRowsSelectedProps()}
          style={{ transform: 'translateX(5px)' }}
        />
      </div>
    );
  },

  Cell: ({ row, column }) => {
    const props = row.getToggleRowSelectedProps();
    const onChange = column.onChange || props.onChange;
    props.onChange = undefined;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IndeterminateCheckbox
          {...props}
          onChange={event => onChange(event, row, column)}
        />
      </div>
    );
  },
};
