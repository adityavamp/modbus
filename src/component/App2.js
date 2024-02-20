import React, { useEffect, useState } from 'react';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
const App2 = ({title,temperature}) => {

  return (
      <div style={{ width: '150px', height: '150px',margin:"50px" }}>
      <CircularProgressbar
        value={temperature}
        text={`${temperature}°C`}
        maxValue={100}
        styles={buildStyles({
          strokeLinecap: 'butt', // Use "butt" to make it semi-circular
          textSize: '20px',
          textColor: '#000',
          pathTransitionDuration: 1,
          pathColor: `rgba(255, 0, 0, ${temperature / 100})`,
          textColor: '#f88',
          trailColor: '#d6d6d6',
          backgroundColor: '#3e98c7',
        })}
      /><div style={{fontWeight:"bold",marginLeft:"20px"}}>{title}</div>
      </div>
  );
  };
  
  export default App2;