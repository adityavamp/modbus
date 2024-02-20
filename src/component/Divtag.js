import React from 'react';
import './Divtag.css'; // Create a separate CSS file for styling

const Divtag = ({ name, value }) => {
  return (
    <div className="name-value-tag">
      <div className="name">{name}</div>
      <div className="value">{value}</div>
    </div>
  );
};

export default Divtag;
