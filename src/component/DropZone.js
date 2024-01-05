import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

export default function Dropzone() {
  const onDrop = useCallback(acceptedFiles => {
    // Do something with the files
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div style={{display:"flex",backgroundColor:"red", height:"200px"}} {...getRootProps()}>
      <input  {...getInputProps()} />
      {
        isDragActive ?
          <p>Drop the files here ...</p> :
          <p style={{backgroundColor:"green",height:"200px", width:"80%"}}>Drag 'n' drop some files here, or click to select files</p>
      }
    </div>
  )
}
