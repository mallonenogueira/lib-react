import React, { useState } from 'react';
import { handleCallback } from '../../utils/function';

export default function Radio(props) {
  const { name, disabled = false, value = false, label, onChange } = props;

  const [checked, setChecked] = useState(value);

  return (
    <label className="radio">
      <input
        type="radio"
        name={name}
        disabled={disabled}
        tabIndex="-1"
        checked={checked}
        value={checked}
        onChange={() => {}}
      />

      <span
        className="radio__layout"
        onClick={() => {
          if (!disabled) {
            setChecked(!checked);
            handleCallback(onChange, { value: checked });
          }
        }}
      >
        <i
          className={`radio__icon fa fa-circle ${
            label ? 'radio__icon--with-label' : ''
          }`}
        />

        {label}
      </span>
    </label>
  );
}
