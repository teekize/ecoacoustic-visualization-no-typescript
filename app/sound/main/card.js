import React from 'react'
import { FaFileAudio } from "react-icons/fa";
import { VscDiffRenamed } from "react-icons/vsc";
import { MdStorage } from "react-icons/md";

const ImportCard = ({fileInfo,handleFileSelect}) => {
  return (
    <div className="card w-96 bg-[#9dc3b1] shadow-xl">
  {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
      <div className="card-body">
        <h2 className="card-title">Upload Your EcoAcoustics audio</h2>

     {fileInfo&& <>
        <div className="radial-progress" style={{ "--value": "100", "--size": "12rem", "--thickness": "1px" }} role="progressbar">
            <p className='flex justify-between mt-2 p-2  content-center'><FaFileAudio size={25}/>  <>{fileInfo.type.split("/")[1]}</></p>
            <p className='flex justify-between mt-2 p-2 content-center'><VscDiffRenamed size={25}/> <>{fileInfo.name.split(".")[0]}</></p>
            <p className='flex justify-between mt-2 p-2 content-center'><MdStorage size={25}/> <>{fileInfo.size}</></p>
            
            </div></>}
        <p>We can then anaylse the audio </p>
        <div className="card-actions justify-end">
        <input type="file"  onChange={handleFileSelect} accept="audio/*" className="file-input file-input-bordered file-input-primary w-full max-w-xs"/>
        </div>
      </div>
      </div>
  )
}

export default ImportCard