import React, { useState, useEffect } from "react";
import axios from "axios";
import download from "js-file-download";
import Dropzone from "react-dropzone";
import "./FileUpload.css";
function FileUpload() {
  const [fileNames, setFileNames] = useState([]);
  const [imageData, setImageData] = useState([]);

  const fileUpload = async (files) => {
    if (files.length > 0) {
      const formData = new FormData();

      files.forEach((file, index) => {
        formData.append(`image`, file);
      });

      // Make API call to upload files
      const response = await axios.post(
        "http://localhost:3001/upload",
        formData
      );
      const newFileNames = files;
      setFileNames((prev) => [...prev, ...newFileNames]);
    }
  };

  const fetchImageData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/getFiles");
      setImageData(response.data.data);
      setFileNames([])
    } catch (error) {
      console.error("Error fetching image data:", error.message);
    }
  };

  useEffect(() => {
    fetchImageData();
  }, []);

  const handleDownload = (fileUrl, fileName) => {
    axios({
      url: fileUrl,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      download(response.data, fileName);
    });
  };

  return (
    <div className="file-upload-container">
      <div className="upload-section">
        <Dropzone onDrop={(acceptedFiles) => fileUpload(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section className="dropzone-section" {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </section>
          )}
        </Dropzone>
        <button className="upload-button" onClick={fetchImageData}>
          Upload Images
        </button>
      </div>
      <div className="selected-files-section">
        {fileNames.map((file, index) => (
          <div key={index} className="file-preview">
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="file-image"
            />
          </div>
        ))}
      </div>
      <div className="fetched-images-section">
        {imageData.map((user) => (
          <>
            {user.files.map((file, index) => (
              <div key={index} className="file-preview">
                <img
                  src={`http://localhost:3001/${file.path}`}
                  alt={file.originalName}
                  className="file-image"
                />
                <button
                  className="download-button"
                  onClick={() =>
                    handleDownload(
                      `http://localhost:3001/${file.path}`,
                      file.originalName
                    )
                  }
                >
                  Download
                </button>
              </div>
            ))}
          </>
        ))}
      </div>
    </div>
  );
}

export default FileUpload;
