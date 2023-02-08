import { useEffect, useState } from "react"


export const ImageHandler = () => {
    const [file, setFile] = useState()

    const onFileChange = event => {
        setFile({ file: event.target.files[0] })
    }
    
    const onFileUpload = async () => {
        // Client ID
        const clientId = "fd2e1e3d3d12ce1",
          auth = "Client-ID " + clientId;
      
        // Creating an object of formData
        const formData = new FormData();
      
        // Adding our image to formData
        formData.append("file", file);
      
        // Making the post request
        await fetch("https://api.imgur.com/3/image/", {
          // API Endpoint
          method: "POST", // HTTP Method
          body: formData, // Data to be sent
          headers: {
            // Setting header
            Authorization: auth,
            Accept: "application/json",
          },
        })
          .then((res) => alert("image uploaded") && console.log(res)) // Handling success
          .catch((err) => alert("Failed") && console.log(err)); // Handling error
      };


    



    return <>
        <fieldset>
            <div className="imgWrapper">
                <label htmlFor="img">Upload Image </label>
                <input
                    type="file"
                    accept="image/*"
                    name="img"
                    className="imageInput"
                    onChange={onFileChange}
                ></input>
        <button onClick={onFileUpload}>Upload</button>

            </div>
        </fieldset>
    </>
}