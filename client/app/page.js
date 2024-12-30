'use client';

import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import VideoGrid from './components/VideoGrid';

const socket = io('http://localhost:3001');

export default function Home() {
  const [selectedBox, setSelectedBox] = useState(0);

  const videos = [
    { id: 1, title: 'Video 1', url: 'https://www.youtube.com/embed/1' },
    { id: 2, title: 'Video 2', url: 'https://www.youtube.com/embed/2' },
    { id: 3, title: 'Video 3', url: 'https://www.youtube.com/embed/3' },
  ];

  useEffect(() => {
    socket.on('update', (boxIndex) => {
      setSelectedBox(boxIndex);
    });

    return () => socket.off('update');
  }, []);

  return (
    <VideoGrid videos={videos} selectedBox={selectedBox} />
  );
}
