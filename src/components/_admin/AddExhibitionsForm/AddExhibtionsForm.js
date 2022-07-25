import React from "react";
import "./AddExhibitionsForm.css"
import { useState } from "react";
import Firebase from "../../../service/Firebase/FirebaseService";

function AddExhibtionsForm() {
    const firebase = new Firebase()

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [address, setAddress] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [file, setFile] = useState([])

    const handleOnClick = async (e) => {
        e.preventDefault()
        firebase.uploadFilesToStorage(file[0].name, file[0], file[0].type)
        .then(firebase.saveExhiptionToDB(title, description, address, startDate, endDate, await firebase.getFilesURLFromStorage(file[0].name)))
        setTimeout(() => window.location.reload(), 500);
    }

    return (
        <div className="exhibition-form-container">
            <form>
                <div className="exhibition-flex-container">
                    <label>titel</label>
                    <input minLength="1" maxLength="40" value={title} onChange={e => setTitle(e.target.value)}></input>
                    <br></br>
                    <label>beskrivelse</label>
                    <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" minLength="1" maxLength="400"></textarea>
                    <br></br>
                    <label minLength="1" maxLength="50">adresse</label>
                    <input value={address} onChange={e => setAddress(e.target.value)}></input>
                    <br></br>
                    <label>start tidspunkt</label>
                    <input type="datetime-local" value={startDate} onChange={e => setStartDate(e.target.value)}></input>
                    <br></br>
                    <label>slut tidspunkt</label>
                    <input type="datetime-local" value={endDate} onChange={e => setEndDate(e.target.value)}></input>
                    <br></br>
                    <label>billede</label>
                    <input type="file" file={file} onChange={e => setFile(e.target.files)}></input>
                    <br></br>
                    <button onClick={handleOnClick}>OK</button>
                </div>
            </form>
        </div>
    )
}

export default AddExhibtionsForm