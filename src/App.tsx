import { useEffect, useState, useRef } from "react";
import "./App.css";
import styled from "styled-components";

const Button = styled.button`
  background-color: pink;
`;

const Video = styled.video`
  width: 400px;
  height: 300px;
  background-color: black;
  transform: rotateY(180deg);
  -webkit-transform: rotateY(180deg); /* Safari and Chrome */
  -moz-transform: rotateY(180deg); /* Firefox */
`;
const VideoPlacholder = styled.div`
  width: 400px;
  height: 300px;
  background-color: gray;
`;

function App() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [camera, setCamera] = useState<boolean>(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [cameraId, setCameraId] = useState(0); // 0, 1, 2 중 하나

  function cameraOn() {
    cameraOff();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("사용할 수 있는 카메라가 없습니다.");
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          const video = videoRefs.current[cameraId];
          if (video) {
            video.srcObject = mediaStream;
            video.play();
          }
        })
        .catch((err) => console.error(err));
    }
  }
  useEffect(() => {
    cameraOn();
    console.log(camera);
  }, []);

  function cameraOff() {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      const video: HTMLVideoElement | null =
        document.querySelector("#cameraview");
      if (video) {
        video.srcObject = null;
      }
    }
  }

  function cameraHandle() {
    setCamera((prev) => {
      const next = !prev;
      if (next) {
        cameraOn();
      } else {
        cameraOff();
      }
      return next;
    });
  }

  function changeCameraHandle() {
    if (!camera) return;
    setCameraId((prev) => {
      const next = (prev + 1) % 3; // 0, 1, 2 순환
      cameraOn();
      return next;
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          height: "320px",
          width: "420px",
        }}
      >
        {camera ? (
          <>
            {[0, 1, 2].map((i) => (
              <Video
                key={i}
                id={`cameraview_${i + 1}`}
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                autoPlay
                playsInline
                muted
                style={{ width: "200px" }}
              />
            ))}
          </>
        ) : (
          <VideoPlacholder></VideoPlacholder>
        )}
      </div>
      <Button onClick={cameraHandle}>Camera</Button>
      <Button onClick={changeCameraHandle}>Change Camera</Button>
    </>
  );
}

export default App;
