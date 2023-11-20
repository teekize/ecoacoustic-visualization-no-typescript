"use client"
import React, { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import FFT from 'fft.js';
import ImportCard from '../main/card';

export default function IndexPage() {
  const [fileInfo, setIsFile] =useState("");
  const audioRef = useRef(null);
  const canvasRef = useRef(null);
  const analyserRef = useRef(null);
  const animationRef = useRef(null);
  const fft = new FFT(2048);
  const axisMargin =1

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if(file){
      setIsFile(file);
      const url = URL.createObjectURL(file);
      audioRef.current.src = url;
      setupAnalyser();
    }
  };

  const setupAnalyser = () => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(audioRef.current);
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    analyserRef.current = analyser;
  };

  const drawSpectrogram = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);


    context.clearRect(0, 0, width, height);
const draw = () => {
  analyserRef.current.getByteFrequencyData(dataArray);
  const colorScale = d3.scaleSequential(d3.interpolateRainbow).domain([0, d3.max(dataArray)]);

  // Draw the spectrogram
  dataArray.forEach((value, i) => {
    const y = (i / bufferLength) * height;
    context.fillStyle = colorScale(value);
    context.fillRect(0, y, width, 1);
  });

  // Draw Axes
  context.strokeStyle = 'black';
  context.lineWidth = 2;

  // Y-axis
  context.beginPath();
  context.moveTo(axisMargin, 0);
  context.lineTo(axisMargin, height);
  context.stroke();

  // X-axis
  context.beginPath();
  context.moveTo(axisMargin, height - axisMargin);
  context.lineTo(width, height - axisMargin);
  context.stroke();

  // Axis labels
  context.fillStyle = 'black';
  context.font = '16px Arial';

  // Y-axis label
  context.save();
  context.translate(15, height / 2);
  context.rotate(-Math.PI / 2);
  context.textAlign = 'center';
  context.fillText('Frequency', 0, 0);
  context.restore();

  // X-axis label
  context.fillText('Time', width / 2, height - 5);

  // Axis values (example)
  context.font = '12px Arial';
  context.fillText('0s', axisMargin + 10, height - 10);
  context.fillText('Max', axisMargin + 10, 20);
;


      animationRef.current = requestAnimationFrame(draw);
    };

    draw();
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className='bg-slate-200 flex justify-between mt-10 mx-4 '>
      <div className='mt-4'>
      <ImportCard handleFileSelect={handleFileSelect} fileInfo={fileInfo} accept="audio/*" />
     <audio ref={audioRef} controls onPlay={drawSpectrogram}  className='mt-4 w-full'></audio>
      </div>
     
      <canvas ref={canvasRef} width="1024" height="512" className='w-[50%] mr-10'></canvas>
    </div>
  );
}
