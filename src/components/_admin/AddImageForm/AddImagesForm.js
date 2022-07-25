import React, { useEffect, useState } from "react";
import Firebase from "../../../service/Firebase/FirebaseService"
import "./AddImagesForm.css"

function AddImagesForm() {
    const firebase = new Firebase()
    const [imageFileURL, setImageFileURL] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    let filesArr = []

    useEffect(() => {
        async function getFilesURLFromStorage() {
            setImageFileURL(await firebase.getAllFilesFromDB())
        }       
        getFilesURLFromStorage()
    }, [])

    function getFilesAdded(e) {
        filesArr = []
        filesArr = e.target.files
    }

    async function fileAdded(e) {
        e.preventDefault()
        if (filesArr.length <= 0) return alert('Ingen filer valgt')
        for (let i = 0; i < filesArr.length; i++) {
            firebase.uploadFilesToStorage(filesArr[i].name, filesArr[i], filesArr[i].type)
            .then(firebase.saveFilesURLToDB(filesArr[i].name, filesArr[i].type, await firebase.getFilesURLFromStorage(filesArr[i].name)))
        }
        setTimeout(() => window.location.reload(), 500)
    }

    function deleteImage(e) {
        firebase.deleteFileFromDB(e.target.value)
        .then(
            setTimeout(() => {
                window.location.reload()
            }, 500)
        )        
    }

    function selectItem(e) {
        if (isSelected) {
            return e.target.style.opacity = "0.7"
        } else {
            return e.target.style.opacity = "1"
        }
        // isSelected ? e.target.style.opacity = "0.7" : e.target.style.opacity = "1"
    //  style={isSelected ? {opacity:"0.7"} : {opacity:"1"}}
    }

    function displayImages() {
        return imageFileURL.map((element, index) => {
            return (
                <div key={index} className="admin-image-container">
                    <li>
                        <img id="admin-image" src={element.url} alt={element.name} onClick={() => setIsSelected(!isSelected)}></img>
                        <button onClick={deleteImage} value={element.name}>delete</button>
                    </li>
                </div>
            )
        })
    }
    
    return (
        <div className="admin-container">
            <form>
                <input type="file" multiple={true} onChange={getFilesAdded}></input>
                <input type="submit" value="upload" onClick={fileAdded}></input>
            </form>
            <ul>
                {displayImages()}
            </ul>
        </div>
    );
}

export default AddImagesForm