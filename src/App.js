// App.js
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Home from './component/Home';
import Form from './component/Form';
import Register from './component/Register';
import Login from './component/Login';
import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';
import WebSocketConfig from './WebSocketConfig';

function App() {
  const [socketUrl, setSocketUrl] = useState(null);
  const [ipaddres,setaddres]=useState(null);
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(socketUrl);

  const [socketData, setSocketData] = useState({ temperature: 0, humidity: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (lastJsonMessage) {
      const { temperature, humidity } = lastJsonMessage;
      setSocketData({ temperature, humidity });
    }
  }, [lastJsonMessage]);

  useEffect(() => {
    if (readyState === 0) {
      setIsLoading(true);
    } else if (readyState === 1) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setSocketUrl(null);
      navigate('/');
    }
  }, [readyState, setSocketUrl]);
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const message = 'You have unsaved changes. Are you sure you want to leave?';
      event.returnValue = message;
      return message;
    };
  
    window.addEventListener('beforeunload', handleBeforeUnload);
  
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  if (!socketUrl || isLoading) {
    return <WebSocketConfig setSocketUrl={setSocketUrl} isConnecting={isLoading} setaddres={setaddres} />;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={<Home temprealvalue={socketData.temperature} humrealvalue={socketData.humidity} ipaddres={ipaddres} />}
        />
        <Route path="/update" element={<Form  ipaddres={ipaddres} />} />
        <Route path="/login" element={<Register />} />
        <Route path="/register" element={<Login />} />
      </Routes>
      {readyState !== 1 && <Navigate to="/" />}
    </>
  );
}

export default App;
