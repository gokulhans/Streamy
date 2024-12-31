'use client';

import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');

export default function RemoteControl() {
  const handleMove = (direction) => {
    socket.emit('move', direction);
  };

  const handlePlay = () => {
    socket.emit('control', 'play'); // Emit play event
  };

  const handleStop = () => {
    socket.emit('control', 'stop'); // Emit stop event
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <button onClick={() => handleMove('left')} style={{ margin: '10px', padding: '10px 20px' }}>Move Left</button>
      <button onClick={() => handleMove('right')} style={{ margin: '10px', padding: '10px 20px' }}>Move Right</button>
      <button onClick={handlePlay} style={{ margin: '10px', padding: '10px 20px' }}>Play</button>
      <button onClick={handleStop} style={{ margin: '10px', padding: '10px 20px' }}>Stop</button>
    </div>
  );
}
