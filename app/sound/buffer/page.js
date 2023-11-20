"use client"
import React, { useRef, useState } from 'react';
import * as d3 from 'd3';
import FFT from 'fft.js';
import FileUpload from './fileUploader';

export default function IndexPage() {
  const canvasRef = useRef(null);
  const audioRef = useRef(null);
  const[isFile, setIsFile] =useState(false);
  const [isReading, setIsReading] = useState(false);
  const [spectrogram, setSpectogram] = useState([]);
  const [maxiValue, setMaxValue] = useState([]);
  const [miniValue, setMinValue] = useState([]);


  const handleFileSelect = async (file) => {
    setIsFile(!isFile);
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const buffer = await file.arrayBuffer();
    audioContext.decodeAudioData(buffer, (audioBuffer) => {
      createSpectrogram(audioBuffer);
    });
  };

  const createSpectrogram = (audioBuffer) => {
    const channelData = audioBuffer.getChannelData(0); // Get data from the first channel
    const fftSize = 1024; // Size of each segment for FFT
    const fft = new FFT(fftSize);
    const frequencyBins = Math.floor(fftSize / 2) + 1;
    const spectrogramData = [];

    for (let i = 0; i < channelData.length; i += fftSize) {
      const segment = channelData.slice(i, i + fftSize);
      const spectrum = fft.createComplexArray();
      fft.realTransform(spectrum, segment);
      fft.completeSpectrum(spectrum);

      const magnitudes = [];
      for (let j = 0; j < frequencyBins; j++) {
        const magnitude = Math.sqrt(spectrum[2 * j] ** 2 + spectrum[2 * j + 1] ** 2);
        magnitudes.push(magnitude);
      }
      spectrogramData.push(magnitudes);
    }
    setSpectogram(spectrogram);
    let maxValue = 0;
    let minValue = 0;
    for (let i = 0; i < spectrogramData.length; i++) {
      for (let j = 0; j < spectrogramData[i].length; j++) {
        if (spectrogramData[i][j] > maxValue) {
          maxValue = spectrogramData[i][j];
        }
        if (spectrogramData[i][j] < minValue) {
            minValue = spectrogramData[i][j];
          }
      }
    }
    setMaxValue(maxValue);
    setMinValue(minValue);

    drawSpectrogram(spectrogramData, maxValue);
  };
//   c
  const drawSpectrogram = (data, maxValue) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const colorScale = d3.scaleSequential(d3.interpolateInferno).domain([0, maxValue]);

    context.clearRect(0, 0, width, height);

    data.forEach((row, x) => {
      row.forEach((value, y) => {
        context.fillStyle = colorScale(value);
        context.fillRect(x, height - y, 1, 1);
      });
    });
  };

  return (
    <div>
      <p>{maxiValue&& maxiValue}</p>
      <p>{miniValue&& miniValue}</p>

      <FileUpload onFileSelect={handleFileSelect} />

      <audio ref={audioRef} controls></audio>
      {isFile === true? <canvas ref={canvasRef} width="1024" height="512" className='bg-white'></canvas> :<span className="loading loading-bars loading-lg"></span>
      
}
      
    </div>
  );
}