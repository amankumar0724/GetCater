import React from 'react';

const MyComponent = ({ message }) => {
  return <div>{message}</div>;
};

MyComponent.defaultProps = {
  message: 'Default Message'
};

export default MyComponent;
