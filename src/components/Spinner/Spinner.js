import React from 'react';
import classnames from 'classnames';

import DefaultValues from './utils';

function Spinner({ children, icon, ...props }) {
  if (!props.large) {
    const classNames = classnames('loader', {
      'loader--large': props.large,
      'loader--freeze': props.freeze,
    });

    return <div className={classNames}></div>;
  }

  return (
    <div className="orbit-spinner">
      <div className="orbit-spinner__item"></div>
      <div className="orbit-spinner__item"></div>
      <div className="orbit-spinner__item"></div>
      <span className="orbit-spinner__label">
        <img alt="" src={DefaultValues.getDefaultThumbnail()} />
      </span>
    </div>
  );
}

export default Spinner;
