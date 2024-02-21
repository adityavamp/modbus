import React, { Children, useEffect, useRef, useState } from 'react';
import TemperatureBarGraph from './TemperatureBarGraph';
import App2 from './App2';
import Divtag from './Divtag';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import './Home.css';
import useWebSocket from 'react-use-websocket';

const Home = ({temprealvalue,humrealvalue,ipaddres}) => {
  const [socketData, setSocketData] = useState({temperature: 0, humidity: 0});

  const [formData, setFormData] = useState({
    tempLow: 0.0,
    tempHigh: 0.0,
    humidity: 0.0,
    humidityHysteresis: 0.0,
    powerOnDelay: 0.0,
    r2Delay: 0.0,
    r1OffTime: 0.0,
    setLowLimit: 0.0,
    setHighLimit: 0.0,
    offset1: 0.0,
    offset2: 0.0,
    hoursTime: 0.0,
    r1OnTime: 0.0,
    address: 0,
  });

  const [temperaturereal, setTemperaturereal] = useState();
  const [humidityreal, setHumidityreal] = useState();
  const [temperatureArray, setTemperatureArray] = useState([]);
  const [humidityArray, setHumidityArray] = useState([]);
  const [loading, setloading] = useState(false);

  const fetchData = async () => {
    console.log("called");
    try {
      const response = await fetch(`https://${ipaddres}/getMessage`, {
        method: 'GET',
        mode: 'no-cors', 
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      setFormData({
        tempLow: result.tempLow || 0.0,
        tempHigh: result.tempHigh || 0.0,
        humidity: result.humidity || 0.0,
        humidityHysteresis: result.humidityHysteresis || 0.0,
        powerOnDelay: result.powerOnDelay || 0.0,
        r2Delay: result.r2Delay || 0.0,
        r1OffTime: result.r1OffTime || 0.0,
        setLowLimit: result.setLowLimit || 0.0,
        setHighLimit: result.setHighLimit || 0.0,
        offset1: result.offset1 || 0.0,
        offset2: result.offset2 || 0.0,
        hoursTime: result.hoursTime || 0.0,
        r1OnTime: result.r1OnTime || 0.0,
        address: result.address || 0,
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const onPageLoadFunction = () => {
    console.log("called")
    setHumidityArray((prevArray) => [...prevArray, socketData.humidity]);
    setTemperatureArray((prevArray) => [...prevArray, socketData.temperature]);
    console.log(humidityArray);
  };
  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTemperatureArray((prevArray) => [...prevArray, temprealvalue]);
      setHumidityArray((prevArray) => [...prevArray, humrealvalue]);
      console.log(temprealvalue+" "+humrealvalue);
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };
  }, [socketData.temperature]);

  return (
    <div>
      {loading ? (
        <center>    <div className="loading-container">
        <div className="loading-message">Loading...</div>
      </div></center>
      ) : (
        <div id="containerhome">
          <div id="tempcontainer">
            <div id="tempcontainer1">
              <App2 title={"Temperature"} temperature={temprealvalue}></App2>
              <App2 title={"Humidity"} temperature={humrealvalue}></App2>
            </div>
            <div id="allcontainer">
              <Divtag name="tempLow" value={formData.tempLow} />
              <Divtag name="tempHigh" value={formData.tempHigh} />
              <Divtag name="humidity" value={formData.humidity} />
              <Divtag name="Hysteresis" value={formData.humidityHysteresis} />
              <Divtag name="powerOnDelay" value={formData.powerOnDelay} />
              <Divtag name="r2Delay" value={formData.r2Delay} />
              <Divtag name="r1OffTime" value={formData.r1OffTime} />
              <Divtag name="setLowLimit" value={formData.setLowLimit} />
              <Divtag name="setHighLimit" value={formData.setHighLimit} />
              <Divtag name="offset1" value={formData.offset1} />
            </div>
          </div>
          <div id="tempbarvalue">
            <div id="tempbarcontainer">
              <TemperatureBarGraph data={temperatureArray} />
              <TemperatureBarGraph data={humidityArray} />
            </div>
            <div id="allcontainer" style={{ marginTop: "70px" }}>
              <Divtag name="offset2" value={formData.offset2} />
              <Divtag name="hoursTime" value={formData.hoursTime} />
              <Divtag name="r1OnTime" value={formData.r1OnTime} />
              <Divtag name="address" value={formData.address} />
            </div>
          </div>
        </div>
      )}
      <center>
        <Link to="/update">
          <button style={{ width: "10%", margin: "20px" }}>Update Parameter</button>
        </Link>
        <Link to="/register">
          <button style={{ width: "10%" }}>History</button>
        </Link>
      </center>
    </div>
  );
  
};

export default Home;
