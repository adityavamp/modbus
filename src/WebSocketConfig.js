// WebSocketConfig.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WebSocketConfig.css'
import Spinner from 'react-bootstrap/Spinner';
import Loader from './Loader';

const WebSocketConfig = ({ setSocketUrl, isConnecting,setaddres }) => {
  const [ipAddress, setIpAddress] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const socketUrl = `wss://${ipAddress}:81`;
    setSocketUrl(socketUrl);
    setaddres(ipAddress);
  };

  return (
    <center>
    <Spinner animation="border" variant="primary" />
    <div className="config-container">
      <div>
      <form onSubmit={handleSubmit} id="webform">
        <div>
        <label htmlFor="ipAddress">Enter IP Address:</label>
        <div>
        <input
          type="text"
          id="ipAddress"
          value={ipAddress}
          onChange={(e) => setIpAddress(e.target.value)}
          required
        ></input>
        </div>
        <button type="submit" disabled={isConnecting}>
          {isConnecting ? <center><Loader></Loader></center>: 'Connect'}
        </button>
        </div>
      </form>
      </div>
    </div>
    </center>
  );
};

export default WebSocketConfig;
