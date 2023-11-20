"use client"
import React, { useRef, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import SpectrogramPlugin from 'wavesurfer.js/dist/plugins/spectrogram.js';
import TimelinePlugin from "wavesurfer.js/dist/plugins/timeline.js";
import Hover from "wavesurfer.js/dist/plugins/hover.js"
// import NavBar from './header';
import ImportCard from './card';

// '#9dc3b1',
export  default function IndexPage() {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const audioRef = useRef(null);
  const [fileInfo, setFileInfo] = useState("");
  const [sampleRate, setSampleRate] = useState(32050);

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: 'violet',
      progressColor: 'violet',
      sampleRate: sampleRate,
      plugins: [
        TimelinePlugin.create(),
        Hover.create({
          lineColor: '#ff0000',
          lineWidth: 2,
          labelBackground: '#555',
          labelColor: '#fff',
          labelSize: '11px',
        }),
        SpectrogramPlugin.create({
          wavesurfer: wavesurfer.current,
          container:  "spectrogram",
          labels: true,
          splitChannels:true,
          labelsColor: "black",
          labelsHzColor:"green",
        }),
        
      ]
    });

    // Event listener for the waveform interaction
    wavesurfer.current.on('ready', () => {
      const playButton = document.getElementById('playButton');
      playButton.addEventListener('click', () => {
        wavesurfer.current.playPause(); // This will play or pause the audio
      });

      // This will play the audio when the waveform is clicked for the first time
      waveformRef.current.addEventListener('click', () => {
        wavesurfer.current.play();
      });})
    return () => wavesurfer.current.destroy();
  }, [sampleRate]);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if(file){
      setFileInfo(file);
        localStorage.setItem("sample-audio", file)
      const url = URL.createObjectURL(file);
        wavesurfer.current.load(url);
    }
  };

  return (
    <div className='flex justify-between bg-slate-200 min-h-screen'>
      <div className='my-10 px-4'>
      <ImportCard fileInfo ={fileInfo} handleFileSelect={handleFileSelect} sampleRate={sampleRate}/>
      {fileInfo &&  <button id="playButton" className="btn btn-active bg-[#F9B572] ml-4 w-[90%] mt-4 ">Play/Pause</button>}
      </div>

      <div className='mx-4 px-4 w-[90%] h-[80%] my-10'>
      <div className=''>
      <div id="waveform" ref={waveformRef} className='rounded-md'></div>
      <div id="spectrogram" className="bg-red-500"></div>
      </div>
     

    </div>
  </div>
  );
}
