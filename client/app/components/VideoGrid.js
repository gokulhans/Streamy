'use client';

export default function VideoGrid({ videos, selectedBox }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 200px)', gap: '20px', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      {videos.map((video, index) => (
        <div
          key={video.id}
          style={{
            padding: '10px',
            border: selectedBox === index ? '5px solid yellow' : '2px solid white',
            color: 'white',
            textAlign: 'center',
          }}
        >
          {video.title}
        </div>
      ))}
    </div>
  );
}
