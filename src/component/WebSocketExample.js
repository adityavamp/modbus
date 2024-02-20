import React, { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

const WebSocketComponent = () => {
  const socketUrl = 'ws://192.168.1.22:81';

  const [socketData, setSocketData] = useState(null);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);

  useEffect(() => {
    if (lastJsonMessage) {
      console.log('Received WebSocket data:', lastJsonMessage);
      setSocketData(lastJsonMessage);
    }
  }, [lastJsonMessage]);

  const sendMessage = () => {
    console.log("called");
    const message = {
      type: 'example',
      content: 'Hello, WebSocket!',
    };
    sendJsonMessage(message);
  };

  return (
    <div>
      <h1>WebSocket Example</h1>
      <button onClick={sendMessage}>Send Message</button>

      {socketData && (
        <div>
          <h2>Received WebSocket Data:</h2>
          <pre>{JSON.stringify(socketData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default WebSocketComponent;
