'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import VideoGrid from './components/VideoGrid';

const socket = io('http://localhost:3001');

export default function Home() {
  const [selectedBox, setSelectedBox] = useState(0);
  const [playing, setPlaying] = useState(false);

  const videos = [
    { id: 1, title: 'Video 1', url: 'https://www.youtube.com/embed/1' },
    { id: 2, title: 'Video 2', url: 'https://www.youtube.com/embed/2' },
    { id: 3, title: 'Video 3', url: 'https://www.youtube.com/embed/3' },
  ];

  useEffect(() => {
    // Handle box movement
    socket.on('update', (boxIndex) => {
      setSelectedBox(boxIndex);
    });

    // Handle play and stop actions
    socket.on('control', (action) => {
      if (action === 'play') setPlaying(true);
      if (action === 'stop') setPlaying(false);
    });

    return () => {
      socket.off('update');
      socket.off('control');
    };
  }, []);

  return (
    <VideoGrid videos={videos} selectedBox={selectedBox} playing={playing} setPlaying={setPlaying} />
  );
}
