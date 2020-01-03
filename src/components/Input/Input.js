import React from 'react';
import classnames from 'classnames';

const defaultChange = () => {};

function getInputClassNames(props) {
  return classnames('input__element', {
    'input__element--actionable': props.onClick,
    'input__element--transparent': props.transparent,
    'input__element--processing': props.isLoading,
    'text-right': props.align === 'right',
  });
}

function Input({ onRef, onChange = defaultChange, ...props }) {
  const classNames = classnames('input', {
    'input--primary': props.primary,
  });

  let labelComponent;
  let buttonComponent;
  let captionComponent;

  if (props.label && !props.inline) {
    labelComponent = <Label {...props} />;
  }

  if (props.onClick) {
    buttonComponent = <Button {...props} />;
  }

  if (props.caption) {
    captionComponent = <Caption />;
  }

  return (
    <div className={classNames}>
      {labelComponent}

      <div className="input__container">
        <label class="input__label">
          <input
            autoComplete="off"
            className={getInputClassNames(props)}
            {...props}
            ref={onRef}
            onChange={onChange}
          />

          <span class="input__feedback">{props.isLoading && <></>}</span>
        </label>

        {buttonComponent}
      </div>

      {captionComponent}
    </div>
  );
}

function Caption() {
  return <span class="input__caption"></span>;
}

function Button({ name, onClick, actionIcon }) {
  return (
    <button
      class="input__btn {{if transparent 'input__btn--transparent' ''}}"
      name={`${name}}-button}`}
      onClick={onClick}
      tabindex="-1"
    >
      <i class={`input__btn__icon fa ${actionIcon}`}></i>
    </button>
  );
}

function Label({ id, label }) {
  return (
    <span className="input__label__text">
      <label htmlFor={id}>{label}</label>
    </span>
  );
}

export default Input;
