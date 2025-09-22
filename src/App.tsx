import { useEffect, useState } from "react";
import "./App.css";
import styled from "styled-components";

const Button = styled.button`
  background-color: pink;
`;

const Video = styled.video`
  width: 400px;
  height: 300px;
  background-color: black;
`;
const VideoPlacholder = styled.div`
  width: 400px;
  height: 300px;
  background-color: gray;
`;

function App() {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [camera, setCamera] = useState<boolean>(true);

  function cameraOn() {
    cameraOff();
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      alert("사용할 수 있는 카메라가 없습니다.");
    } else {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((mediaStream) => {
          setStream(mediaStream);
          const video: HTMLVideoElement | null =
            document.querySelector("#cameraview");
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

  return (
    <>
      <div>
        {camera ? (
          <Video id="cameraview"></Video>
        ) : (
          <VideoPlacholder></VideoPlacholder>
        )}
      </div>
      <Button onClick={cameraHandle}>Camera</Button>
    </>
  );
}

export default App;
