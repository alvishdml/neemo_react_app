import { useEffect, useRef } from 'react';
import { segmentBackground, applyBlur, applyVideoBackground } from'virtual-bg';
import './App.css';


function App() {

  const canvasRef = useRef(null);
  const videoRef = useRef(null);
   

  async function setBackgroundVideo() {

    const videoElement = document.createElement('video');

    videoElement.src = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

    applyVideoBackground(videoElement);
  }

  useEffect(() => {

    applyBlur(0);

    const videoFilter = async() => {

      try {
        const inputVideoElement = await  videoRef.current
        const outputCanvasElement = await  canvasRef.current
        
        let myStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
          });

      inputVideoElement.srcObject = myStream;

      if(inputVideoElement.srcObject && outputCanvasElement)
      {
        // console.log(inputVideoElement,"inputVideoElement")
        // console.log(outputCanvasElement,"outputCanvasElement")
        segmentBackground(inputVideoElement, outputCanvasElement)
      }

        setBackgroundVideo();
        
      } catch (error) {
        console.log(error,"error: ")
      }
    }

    videoFilter() 

  }, [])
  
  return (
    <div className="App">
       <video autoPlay={true} ref={videoRef} id="inputVideoElement" style={{display:'none'}}></video>
       <div>
        <canvas id='output_canvas' ref={canvasRef} className="output_canvas" style={{width:'1280px',height:'720px',
         margin: '10px',
    }}> </canvas>
       </div>
    </div>
  );
}

export default App;
