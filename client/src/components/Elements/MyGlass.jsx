import React from 'react';
import './CSS/MyGlass.modules.css';

const MyGlass = ({ comp }) => {
  return (
    <>
      <div className="blur">{comp}</div>
    </>
  );
};

export default MyGlass;
