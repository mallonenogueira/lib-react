import React from 'react';
import classnames from 'classnames';
import { Spinner } from '../../components';

function Button(props) {
  const classNames = classnames('button', {
    'button--primary': props.primary,
    'button--small': props.small,
    'button--risky': props.risky,
    'button--sneaky': props.sneaky,
    'button--transparent': props.transparent,
    'button--block': props.block,
    'button--loading': props.loading,
    'button--has-icon': props.icon,
  });

  return (
    <button
      className={classNames}
      disabled={props.disabled}
      type={props.type}
      style={props.style}
      onChange={props.onChange}
    >
      {props.loading ? getLoadingContent(props) : getDefaultContent(props)}
    </button>
  );
}

function getLoadingContent({ loadingLabel, label, children }) {
  return (
    <>
      <Spinner />
      {loadingLabel
        ? getLabelContent(loadingLabel)
        : getLabelContent(label, children)}
    </>
  );
}

function getDefaultContent({ icon, label, children }) {
  return (
    <>
      {icon && <i className={`fa ${icon}`}></i>}
      {getLabelContent(label, children)}
    </>
  );
}

function getLabelContent(label, children) {
  return (
    <>
      {(label || children) && (
        <span className="button__label">{label || children}</span>
      )}
    </>
  );
}

export default Button;
