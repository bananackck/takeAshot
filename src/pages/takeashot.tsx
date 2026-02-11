import { useEffect } from "react";
import styled from "styled-components";
import { useCameraStore } from "../store/camera";
import { useCamera } from "../hooks/camera";

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
const VideoPlaceholder = styled.div`
  width: 400px;
  height: 300px;
  background-color: gray;
`;

function TakeAShot() {
  const { camera, assignVideoRef } = useCameraStore();

  const { cameraOn, cameraHandle, changeCameraHandle } = useCamera();
  useEffect(() => {
    cameraOn();
    console.log(camera);
  }, []);

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
                ref={(el) => assignVideoRef(i, el)}
                autoPlay
                playsInline
                muted
                style={{ width: "200px" }}
              />
            ))}
          </>
        ) : (
          <VideoPlaceholder></VideoPlaceholder>
        )}
      </div>
      <Button onClick={cameraHandle}>Camera</Button>
      <Button onClick={changeCameraHandle}>Change Camera</Button>
    </>
  );
}

export default TakeAShot;
