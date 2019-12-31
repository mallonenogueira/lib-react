import React from 'react';
import classnames from 'classnames';

import { Spinner } from '../';

import { getDefaultThumbnail } from '../../defaults/values';

function getClassNames({ small, editable }) {
  return classnames('thumbnail', {
    'thumbnail--small': small,
    'thumbnail--editable': editable,
  });
}

const Thumbnail = ({ loading, small, ...props }) => (
  <div className={getClassNames({ loading, small, ...props })}>
    {loading ? getDefaultContent() : getLoadingContent()}
  </div>
);

function getDefaultContent() {
  return <img src={getDefaultThumbnail()}></img>;
}

function getLoadingContent() {
  return <Spinner />;
}

export default Thumbnail;
