"use client";

import { useEffect } from "react";

export default function VideoGrid({
  videos,
  selectedBox,
  playing,
  setPlaying,
}) {
  useEffect(() => {
    // toggleFullScreen() ;
  }, []);
  useEffect(() => {
    // Automatically stop playing when the video selection changes
    setPlaying(false);
  }, [selectedBox, setPlaying]);

  
  useEffect(() => {
    if (playing) {
      const timer = setTimeout(() => {
        console.log("Auto Fullscreen after 2s delay");
        const iframe = document.getElementById('youtube-player');
        if (iframe && iframe.requestFullscreen) {
          iframe.requestFullscreen().catch((err) => {
            console.error("Fullscreen request failed", err);
          });
        }
      }, 2000);
  
      return () => clearTimeout(timer);
    }
  }, [playing]);

  function toggleFullScreen() {
    const iframe = document.getElementById("youtube-player");
    if (iframe.requestFullscreen) {
      iframe.requestFullscreen();
    } else if (iframe.mozRequestFullScreen) {
      /* Firefox */
      iframe.mozRequestFullScreen();
    } else if (iframe.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      iframe.webkitRequestFullscreen();
    } else if (iframe.msRequestFullscreen) {
      /* IE/Edge */
      iframe.msRequestFullscreen();
    }
  }

  return (
    <div style={{ textAlign: "center", padding: "20px", color: "white" }}>
      {!playing ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 200px)",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          {videos.map((video, index) => (
            <div
              key={video.id}
              style={{
                padding: "10px",
                border:
                  selectedBox === index
                    ? "5px solid yellow"
                    : "2px solid white",
                textAlign: "center",
                cursor: "pointer",
              }}
              onClick={() => {
                setPlaying(true);
              }} // Direct play when clicked
            >
              {video.title}
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* <iframe
            width="800"
            height="450"
            src={videos[selectedBox].url + "?autoplay=1"}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title={videos[selectedBox].title}
          ></iframe> */}
          <iframe
            id="youtube-player"
            width="560"
            height="315"
            src="https://www.youtube.com/embed/tgBTspqA5nY?si=9h9Ai8UZZBkS3684&autoplay=1"
            // https://youtu.be/vFTqO3JCtNg?si=vChYUkTii1GDp6Vu
            // https://www.youtube.com/live/tgBTspqA5nY?si=9h9Ai8UZZBkS3684
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
          <button
            onClick={() => {
              toggleFullScreen();
            }}
          >
            Fullscreen
          </button>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={() => setPlaying(false)}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Stop
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
