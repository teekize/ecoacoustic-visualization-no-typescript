const FileUpload = ({ onFileSelect }) => {
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        onFileSelect(file);
      }
    };
  
    return (
      <input type="file" onChange={handleFileChange} accept="audio/*"  className="file-input file-input-bordered file-input-secondary w-full max-w-xs"/>
    );
  };
  
  export default FileUpload;
  