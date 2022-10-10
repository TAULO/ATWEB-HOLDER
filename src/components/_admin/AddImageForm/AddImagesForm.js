import React, { useEffect, useState } from "react";
import Firebase from "../../../service/Firebase/FirebaseService"
import Loader from "../../SpinningLoader/SpinningLoader"
import "./AddImagesForm.css"

function AddImagesForm() {
    const firebase = new Firebase()
    const [imageFileURL, setImageFileURL] = useState([])
    const [isSelected, setIsSelected] = useState(false)
    let filesArr = []

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        async function getFilesURLFromStorage() {
            setImageFileURL(await firebase.getAllLandingFilesFromDB())
        }       
        getFilesURLFromStorage()
        setTimeout(() => setLoading(false), 1000)
    }, [])

    function getFilesAdded(e) {
        filesArr = []
        filesArr = e.target.files
    }

    async function fileAdded(e) {
        async function saveURL(i) {
            firebase.saveLandingFileToDB(filesArr[i].name, filesArr[i].type, await firebase.getLandingImagesFromStorage(filesArr[i].name))
        }
        e.preventDefault()
        if (filesArr.length <= 0) return alert('Ingen filer valgt')
        setLoading(true)
        for (let i = 0; i < filesArr.length; i++) {
            firebase.uploadImagesToLandingStorage(filesArr[i].name, filesArr[i], filesArr[i].type)
            .then(setTimeout(() => { 
                saveURL(i)
            }, 1000))
        }
        setTimeout(() => { window.location.reload(); setLoading(false)}, 2000)
    }

    function deleteImage(e) {
        firebase.deleteLandingFileFromDB(e.target.value)
        .then(
            setTimeout(() => {
                window.location.reload()
            }, 500)
        )        
    }

    function displayImages() {
        return imageFileURL.map((element, index) => {
            return (
                <div key={index} className="admin-image-container">
                    <li id="admin-image-list">
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
                {loading ? <Loader></Loader> : displayImages()}
            </ul>
        </div>
    );
}

export default AddImagesForm